import { request } from 'umi';
import type { CurrentUser, UserList, UserListItem } from '@/services/user/typings';
import type { ResponseBody, PageParams } from '@/services/common/typings';

/** 获取当前的用户 GET /user/current */
export async function queryCurrentUserInfo() {
  return request<ResponseBody<CurrentUser>>('/hrs-api/user/current', {
    method: 'GET',
  });
}

/** 获取规则列表 GET /api/user */
export async function queryUserList(params: PageParams) {
  return request<UserList>('/hrs-api/user/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 新建规则 PUT /api/user */
export async function updateUser(options?: Record<string, any>) {
  return request<UserListItem>('/hrs-api/user', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/user */
export async function addUser(options?: { [key: string]: any }) {
  return request<UserListItem>('/hrs-api/user', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/user */
export async function removeUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/hrs-api/user', {
    method: 'DELETE',
    ...(options || {}),
  });
}
