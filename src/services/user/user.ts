// @ts-ignore
import { request } from 'umi';
import type { CurrentUser, UserForm, UserVO } from '@/services/user/typings';
import type { PageParams, Page, Orders } from '@/services/common/typings';

/** 获取当前登录用户的个人和权限信息接口 GET /user/current */
export async function getCurrentUserInfo(options?: Record<string, any>) {
  return request<CurrentUser>('/hrs-api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取查询用户分页列表 GET /api/user */
export async function getUserPage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<UserVO>>('/hrs-api/user/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取用户信息（通过用户id） GET /user/${userId} */
export async function getUserById(userId: number, options?: Record<string, any>) {
  return request<UserVO>(`/hrs-api/user/${userId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加用户接口 POST /user */
export async function addUser(userForm: UserForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: userForm,
    ...(options || {}),
  });
}

/** 更新用户接口 PUT /user */
export async function updateUser(userForm: UserForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: userForm,
    ...(options || {}),
  });
}

/** 删除用户接口 DELETE /user/${userId} */
export async function deleteUser(userId: number, options?: Record<string, any>,) {
  return request<number>(`/hrs-api/user/${userId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除用户接口 DELETE /user */
export async function batchDeleteUser(body?: (number | undefined)[], options?: Record<string, any>) {
  return request<number[]>('/hrs-api/user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通过角色Id获取用户信息（分页） GET /user/role/page */
export async function getUserPageByRoleId(pageParams: PageParams, roleId?: number, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<UserVO>>('/hrs-api/user/role/page', {
    method: 'GET',
    params: {
      ...pageParams,
      roleId,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 通过角色Id获取用户信息（分页） GET /user/role/page */
export async function getUserPageByDepartmentId(pageParams: PageParams, departmentId?: number, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<UserVO>>('/hrs-api/user/department/page', {
    method: 'GET',
    params: {
      ...pageParams,
      departmentId,
      ...orders,
    },
    ...(options || {}),
  });
}


/** 批量更新用户部门接口 PUT /user/department */
export async function batchUpdateUserDepartment(body?: { userIds: (number | undefined)[]; departmentId: number | undefined }, options?: Record<string, any>) {
  return request<number[]>('/hrs-api/user/department', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
