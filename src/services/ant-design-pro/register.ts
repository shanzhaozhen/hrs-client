// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 用户注册接口 POST /register */
export async function register(body: API.UserLoginForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 检查用户是否已被注册 GET /register/${param0} */
export async function checkUserName(
  params: {
    // path
    /** 用户名 */
    username: string;
  },
  options?: { [key: string]: any },
) {
  const { username: param0 } = params;
  return request<API.ResultBodyBoolean>(`/register/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}
