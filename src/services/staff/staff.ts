// @ts-ignore
import { request } from 'umi';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import type { Orders, Page, PageParams, ResultBody } from '@/services/common/typings';

/** 获取员工信息（分页） GET /staff/page */
export async function getStaffPage(
  pageParams: PageParams & any,
  orders?: Orders | undefined | null,
  options?: Record<string, any>,
) {
  return request<ResultBody<Page<StaffVO>>>('/hrs-api/staff/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取员工信息（通过员工id） GET /staff/${staffId} */
export async function getStaffById(staffId: number, options?: Record<string, any>) {
  return request<ResultBody<StaffVO>>(`/hrs-api/staff/${staffId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加员工接口 POST /staff */
export async function addStaff(body: StaffForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/staff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新员工接口 PUT /staff */
export async function updateStaff(body: StaffForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/staff', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除员工接口 DELETE /staff/${staffId} */
export async function deleteStaff(staffId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/staff/${staffId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除员工接口 DELETE /staff */
export async function batchDeleteStaff(body: number[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/staff', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 员工导入模板生成 GET /staff/template */
export async function generateStaffTemplate(options?: Record<string, any>) {
  return request('/hrs-api/staff/template', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 导出员工信息 GET /staff/export */
export async function exportStaff(params: any, options?: Record<string, any>) {
  return request('/hrs-api/staff/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...params,
    },
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 打印员工信息 POST /staff/print */
export async function printStaff(staffId: number, options?: Record<string, any>) {
  return request('/hrs-api/staff/print', {
    method: 'GET',
    responseType: 'blob',
    params: {
      staffId,
    },
    ...(options || {}),
    skipErrorHandler: true,
  });
}
