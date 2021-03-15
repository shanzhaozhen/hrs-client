// @ts-ignore
import { request } from 'umi';
import type { PageParams, Page, Orders } from '@/services/common/typings';
import type { UserVO } from "@/services/user/typings";


/** 获取用户信息（分页） GET /user-role */
export async function getUserRolePage(pageParams: PageParams, roleId?: number, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<UserVO>>('/hrs-api/user-role', {
    method: 'GET',
    params: {
      ...pageParams,
      roleId,
      ...orders,
    },
    ...(options || {}),
  });
}


/** 添加用户角色 POST /user-role */
export async function addUserRole(body?: { userIds?: (number | undefined)[]; roleId?: number; }, options?: Record<string, any>) {
  return request<API.ResultBodyListLong>('/hrs-api/user-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户角色 DELETE /user-role */
export async function deleteUserRoles(body?: { userIds?: (number | undefined)[]; roleId?: number; }, options?: Record<string, any>,) {
  return request<number>('/hrs-api/user-role', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
