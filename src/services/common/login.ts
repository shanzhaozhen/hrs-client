import { request } from 'umi';
import type { LoginParams, LoginResult } from '@/services/common/typings';
import type { NoticeIconList } from '@/services/system/typings';

/** 登录接口 POST /api/login/outLogin */
export async function outLogin(options?: Record<string, any>) {
  return request<Record<string, any>>('/hrs-api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login */
export async function login(body: LoginParams) {
  return request<LoginResult>('/hrs-api/login', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    data: body,
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: Record<string, any>) {
  return request<NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
