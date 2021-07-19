// @ts-ignore
import { request } from 'umi';
import type { Orders, Page, PageParams, ResultBody } from '@/services/common/typings';
import type { AllowanceForm, AllowanceVO } from '@/services/allowance/typings';

/** 获取福利津贴（分页） GET /allowance/page */
export async function getAllowancePage(
  pageParams: PageParams,
  orders?: Orders | undefined | null,
  options?: Record<string, any>,
) {
  return request<ResultBody<Page<AllowanceVO>>>('/hrs-api/allowance/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取福利津贴（通过福利津贴id） GET /allowance/${allowanceId} */
export async function getAllowanceById(allowanceId: number, options?: Record<string, any>) {
  return request<ResultBody<AllowanceVO>>(`/hrs-api/allowance/${allowanceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加福利津贴接口 POST /allowance */
export async function addAllowance(body: AllowanceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/allowance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新福利津贴接口 PUT /allowance */
export async function updateAllowance(body: AllowanceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/allowance', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除福利津贴接口 DELETE /allowance/${allowanceId} */
export async function deleteAllowance(allowanceId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/allowance/${allowanceId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除福利津贴接口 DELETE /allowance */
export async function batchDeleteAllowance(
  body: (number | undefined)[],
  options?: Record<string, any>,
) {
  return request<ResultBody<number[]>>('/hrs-api/allowance', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 福利津贴导入模板生成 GET /allowance/template */
export async function generateAllowanceTemplate(options?: Record<string, any>) {
  return request('/hrs-api/allowance/template', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 导出福利津贴 GET /allowance/export */
export async function exportAllowance(pageParams: PageParams, options?: Record<string, any>) {
  return request('/hrs-api/allowance/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...pageParams,
    },
    ...(options || {}),
  });
}
