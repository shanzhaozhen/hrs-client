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

