// @ts-ignore
import { request } from 'umi';
import type { SalaryChangeForm, SalaryChangeVO } from '@/services/salary-change/typings';
import type { Orders, Page, PageParams, ResultBody } from '@/services/common/typings';

/** 获取薪资变动记录信息（分页） GET /salary-change/page */
export async function getSalaryChangePage(
  pageParams: PageParams,
  staffId: number | undefined | null,
  orders?: Orders | undefined | null,
  options?: Record<string, any>,
) {
  return request<ResultBody<Page<SalaryChangeVO>>>('/hrs-api/salary-change/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
      staffId,
    },
    ...(options || {}),
  });
}

/** 获取薪资变动记录（通过薪资变动记录id） GET /salary-change/${salaryChangeId} */
export async function getSalaryChangeById(salaryChangeId: number, options?: Record<string, any>) {
  return request<ResultBody<SalaryChangeVO>>(`/hrs-api/salary-change/${salaryChangeId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加薪资变动记录接口 POST /salary-change */
export async function addSalaryChange(body: SalaryChangeForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salary-change', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改薪资变动记录接口 PUT /salary-change */
export async function updateSalaryChange(body: SalaryChangeForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salary-change', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除薪资变动记录接口 DELETE /salary-change/${salaryChangeId} */
export async function deleteSalaryChange(salaryChangeId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/salary-change/${salaryChangeId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除薪资变动记录接口 DELETE /salary-change */
export async function batchDeleteSalaryChange(
  body: (number | undefined)[],
  options?: Record<string, any>,
) {
  return request<ResultBody<number[]>>('/hrs-api/salary-change', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 薪资变动导入模板生成 GET /salary-change/template */
export async function generateSalaryChangeTemplate(options?: Record<string, any>) {
  return request('/hrs-api/salary-change/template', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 导出薪资变动 GET /salary-change/export */
export async function exportSalaryChange(params: any, options?: Record<string, any>) {
  return request('/hrs-api/salary-change/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...params,
    },
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 执行薪资变动记录信息 GET /salary-change/run/${salaryChangeId} */
export async function runChange(salaryChangeId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/salary-change/run/${salaryChangeId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
