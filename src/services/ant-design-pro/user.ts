// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 更新角色接口 PUT /user */
export async function updateUser(body: API.UserForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 添加角色接口 POST /user */
export async function addUser(body: API.UserForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取用户信息（分页） POST /user/page */
export async function getDynamicScheduledTaskPage(
  body: API.BaseSearchForm,
  options?: { [key: string]: any },
) {
  return request<API.ResultBodyPageUserVO>('/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取角色信息（通过角色id） GET /user/${param0} */
export async function getUserByUserId(
  params: {
    // path
    /** 角色id */
    userId: number;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.ResultBodyUserVO>(`/user/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 删除角色接口 DELETE /user/${param0} */
export async function deleteUser(
  params: {
    // path
    /** 角色id */
    userId: number;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.ResultBodyLong>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 登出用户接口 GET /user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.ResultBodyBoolean>('/user/logout', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取当前登录用户的个人和权限信息接口 GET /user/current */
export async function getCurrentUserInfo(options?: { [key: string]: any }) {
  return request<API.ResultBodyCurrentUser>('/user/current', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}
