import { request } from 'umi';
import type { ResultBody } from '@/services/common/typings';
import type { RoleVO } from '@/services/role/typings';

/** 获取所有角色 GET /role/all */
export async function getAllRoles(options?: Record<string, any>) {
  return request<ResultBody<RoleVO[]>>('/hrs-api/role/all', {
    method: 'GET',
    ...(options || {}),
  });
}
