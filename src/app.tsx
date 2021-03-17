import React from 'react';
import type { Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import {Modal, notification} from 'antd';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { RequestConfig } from '@@/plugin-request/request';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { getCurrentUserInfo } from '@/services/user/user';
import type { CurrentUser, UserInfo } from '@/services/user/typings';
import type { Role } from '@/services/user/typings';
import { iconMap } from '@/components/Common/icon';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

const loopMenuItem = (menuData: MenuDataItem[]): MenuDataItem[] =>
  menuData.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && iconMap[icon as string] && React.createElement(iconMap[icon as string]),
    children: children && loopMenuItem(children),
  }));

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  // currentUser?: CurrentUser;
  userInfo?: UserInfo;
  role?: Role[];
  menuData?: MenuDataItem[];
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await getCurrentUserInfo();
    } catch (error) {
      history.push('/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/login') {
    const currentUser = await fetchUserInfo();

    return {
      fetchUserInfo,
      userInfo: currentUser?.userInfo,
      role: currentUser?.role,
      // menuData: currentUser?.menus && loopMenuItem(currentUser?.menus),
      menuData: currentUser?.menus,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.userInfo && location.pathname !== '/login') {
        history.push('/login');
      }
    },
    // menuDataRender: (menuData) => initialState?.menuData || menuData,
    // menuDataRender: () => initialState?.menuData || [],
    menuDataRender: () => (initialState?.menuData && loopMenuItem(initialState.menuData)) || [],
    links: isDev
      ? [
          <>
            <LinkOutlined />
            <span
              onClick={() => {
                window.open('/umi/plugin/openapi');
              }}
            >
              openAPI 文档
            </span>
          </>,
          <>
            <BookOutlined />
            <span
              onClick={() => {
                window.open('/~docs');
              }}
            >
              业务组件文档
            </span>
          </>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** response拦截器, 处理response */
const jwtInterceptor = (url: string, options: RequestOptionsInit) => {
  // 判断是否有 token
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    return {
      url,
      options: {
        ...options,
        interceptors: true,
        headers: {
          // ...options.headers,
          Authorization: `${token}`,
        },
      },
    };
  }
  return { url, options };
};

// 响应后拦截器
const afterResponseInterceptors = async (response: Response, options: RequestOptionsInit) => {
  if (response.status === 200) {
    const res = await response.clone().json();
    if (res.code === 2000) {
      return res;
    }
    return res.data;
  }

  const error = {
    name: response.statusText,
    response,
    request: {
      url: response.url,
      options,
    },
    type: response.type
  }

  return Promise.reject(error)
};


/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = async (error: ResponseError) => {
  const { response } = error;

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  const res = await response.clone().json();

  if (response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if (status === 401) {
      /**
       * (4010, "密码账号认证出错")
       * (4011, "token签名异常")
       * (4012, "token格式不正确")
       * (4013, "token已过期")
       * (4014, "不支持该token")
       * (4015, "token参数异常")
       * (4016, "token错误")
       */
      if (res.code >= 4011 && res.code <= 4016) {
        if (history.location.pathname !== '/login' && history.location.pathname !== '/') {
          Modal.confirm({
            title: '登陆超时',
            icon: <ExclamationCircleOutlined />,
            content: '您已被登出，可以取消继续留在该页面，或者重新登录。',
            okText: '重新登陆',
            cancelText: '取消',
            onOk() {
              history.push('/login');
            },
            // onCancel() {},
          });
        }
      } else {
        notification.error({
          description: res.message || '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
      }
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: res.message || errorText,
      });
    }
  }

  throw error;
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  requestInterceptors: [jwtInterceptor],
  errorHandler,
  responseInterceptors: [afterResponseInterceptors],
};
