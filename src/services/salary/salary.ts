// @ts-ignore
import { request } from 'umi';
import type { Orders, Page, PageParams, ResultBody } from '@/services/common/typings';
import type { SalaryForm, SalaryVO } from '@/services/salary/typings';

/** 获取薪资发放（分页） GET /salary/page */
export async function getSalaryPage(
  pageParams: PageParams,
  orders?: Orders | undefined | null,
  options?: Record<string, any>,
) {
  return request<ResultBody<Page<SalaryVO>>>('/hrs-api/salary/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取薪资发放（通过薪资发放id） GET /salary/${salaryId} */
export async function getSalaryById(salaryId: number, options?: Record<string, any>) {
  return request<ResultBody<SalaryVO>>(`/hrs-api/salary/${salaryId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加薪资发放接口 POST /salary */
export async function addSalary(body: SalaryForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新薪资发放接口 PUT /salary */
export async function updateSalary(body: SalaryForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salary', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除薪资发放接口 DELETE /salary/${salaryId} */
export async function deleteSalary(salaryId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/salary/${salaryId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除薪资发放接口 DELETE /salary */
export async function batchDeleteSalary(
  body: (number | undefined)[],
  options?: Record<string, any>,
) {
  return request<ResultBody<number[]>>('/hrs-api/salary', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 生成薪资发放 GET /salary/generate */
export async function generateSalaryData(
  params: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<ResultBody<string>>('/hrs-api/salary/generate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 冻结/解冻薪资编辑 GET /salary/freeze */
export async function freezeSalaryByIds(
  params: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<ResultBody<string>>('/hrs-api/salary/freeze', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 冻结/解冻薪资编辑 GET /salary/freeze/month */
export async function freezeSalaryByMonth(
  params: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<ResultBody<string>>('/hrs-api/salary/freeze/month', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 薪资发放导入模板生成 GET /salary/template */
export async function generateSalaryTemplate(options?: Record<string, any>) {
  return request('/hrs-api/salary/template', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 导出薪资发放 GET /salary/export */
export async function exportSalary(pageParams: PageParams, options?: Record<string, any>) {
  return request('/hrs-api/salary/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...pageParams,
    },
    ...(options || {}),
  });
}
