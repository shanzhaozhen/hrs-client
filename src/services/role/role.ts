// @ts-ignore
import { request } from 'umi';
import type { RoleForm, RoleVO } from '@/services/role/typings';
import type { Page } from '@/services/common/typings';
import type { Orders, PageParams } from "@/services/common/typings";

/** 获取角色信息（分页） POST /role/page */
export async function getRolePage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<RoleVO>>('/hrs-api/role/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取角色信息（通过角色id） GET /role/${roleId} */
export async function getRoleByRoleId(roleId: number, options?: Record<string, any>) {
  return request<RoleVO>(`/hrs-api/role/${roleId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加角色接口 POST /role */
export async function addRole(roleForm: RoleForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: roleForm,
    ...(options || {}),
  });
}

/** 更新角色接口 PUT /role */
export async function updateRole(roleForm: RoleForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: roleForm,
    ...(options || {}),
  });
}

/** 删除角色接口 DELETE /role/${param0} */
export async function deleteRoles(roleIds: (number | undefined)[], options?: Record<string, any>) {
  return request<number[]>(`/hrs-api/role/${roleIds}`, {
    method: 'DELETE',
    data: roleIds,
    ...(options || {}),
  });
}

/** 获取所有角色 GET /role/all */
export async function getAllRoles(options?: Record<string, any>) {
  return request<RoleVO[]>('/hrs-api/role/all', {
    method: 'GET',
    ...(options || {}),
  });
}
