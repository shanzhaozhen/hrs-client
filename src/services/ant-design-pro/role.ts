// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 更新角色接口 PUT /role */
export async function updateRole(body: API.RoleForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 添加角色接口 POST /role */
export async function addRole(body: API.RoleForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取角色信息（分页） POST /role/page */
export async function getRolePage(body: API.BaseSearchForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyPageRoleVO>('/role/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取角色信息（通过角色id） GET /role/${param0} */
export async function getRoleByRoleId(
  params: {
    // path
    /** 角色id */
    roleId: number;
  },
  options?: { [key: string]: any },
) {
  const { roleId: param0 } = params;
  return request<API.ResultBodyRoleVO>(`/role/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 删除角色接口 DELETE /role/${param0} */
export async function deleteRole(
  params: {
    // path
    /** 角色id */
    roleId: number;
  },
  options?: { [key: string]: any },
) {
  const { roleId: param0 } = params;
  return request<API.ResultBodyLong>(`/role/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取所有角色 GET /role/all */
export async function getAllRoles(options?: { [key: string]: any }) {
  return request<API.ResultBodyListRoleVO>('/role/all', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}
