import { request } from 'umi';
import type { CurrentUser, UserForm, UserVO } from '@/services/user/typings';
import type { ResultBody, PageParams, Page } from '@/services/common/typings';
import type { SortOrder } from 'antd/lib/table/interface';

/** 获取当前登录用户的个人和权限信息接口 GET /user/current */
export async function getCurrentUserInfo(options?: Record<string, any>) {
  return request<ResultBody<CurrentUser>>('/hrs-api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取查询用户分页列表 GET /api/user */
export async function queryUserList(params: PageParams, sorter: Record<string, SortOrder>) {
  return request<ResultBody<Page<UserVO>>>('/hrs-api/user/page', {
    method: 'POST',
    data: {
      ...params,
      sorter,
    },
  });
}

/** 添加角色接口 POST /user */
export async function addUser(userForm: UserForm, options?: Record<string, any>) {
  return request<API.ResultBodyLong>('/hrs-api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: userForm,
    ...(options || {}),
  });
}

/** 删除角色接口 DELETE /user/${userId} */
export async function deleteUser(userId: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/user/${userId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 更新角色接口 PUT /user */
export async function updateUser(userForm: UserForm, options?: { [key: string]: any }) {
  return request<ResultBody<number>>('/hrs-api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: userForm,
    ...(options || {}),
  });
}

/** 获取角色信息（通过角色id） GET /user/${userId} */
export async function getUserByUserId(userId: number, options?: Record<string, any>) {
  return request<ResultBody<UserVO>>(`/hrs-api/user/${userId}`, {
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
