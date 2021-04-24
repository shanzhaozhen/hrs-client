// @ts-ignore
import { request } from 'umi';
import type {LoginParams, ResultBody} from '@/services/common/typings';
import type { NoticeIconList } from '@/services/system/typings';

/** 登录接口 POST /api/login/outLogin */
export async function outLogin(options?: Record<string, any>) {
  return request<ResultBody<Record<string, any>>>('/hrs-api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login */
export async function login(body: LoginParams) {
  return request<ResultBody<string>>('/hrs-api/login', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    data: body,
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: Record<string, any>) {
  return request<ResultBody<NoticeIconList>>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登出用户接口 GET /user/logout */
export async function logout(options?: Record<string, any>) {
  return request<ResultBody<boolean>>('/hrs-api/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
