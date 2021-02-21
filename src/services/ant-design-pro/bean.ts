// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取Bean对应的方法 POST /bean/method */
export async function getBeanMethod(
  body?: {
    beanName?: string;
    methodName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ResultBodyDynamicScheduledTaskVO>('/bean/method', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取Bean列表 GET /bean/${param0} */
export async function getBeanInfoByName(
  params: {
    // path
    beanName: string;
  },
  options?: { [key: string]: any },
) {
  const { beanName: param0 } = params;
  return request<API.ResultBodyBeanInfo>(`/bean/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取Bean列表 GET /bean/list */
export async function getBeanInfoList(options?: { [key: string]: any }) {
  return request<API.ResultBodyListBeanInfo>('/bean/list', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}
