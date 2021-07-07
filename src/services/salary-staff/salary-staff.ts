// @ts-ignore
import { request } from 'umi';
import type {SalaryStaffForm, SalaryStaffVO} from "@/services/salary-staff/typings";
import type {Orders, Page, PageParams, ResultBody} from "@/services/common/typings";

/** 获取员工薪资（分页） GET /salary-staff/page */
export async function getSalaryStaffPage(pageParams: PageParams & any, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<SalaryStaffVO>>>('/hrs-api/salary-staff/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders
    },
    ...(options || {}),
  });
}

/** 获取员工薪资（通过员工id） GET /salary-staff/${salaryStaffId} */
export async function getSalaryStaffById(salaryStaffId: number, options?: Record<string, any>) {
  return request<ResultBody<SalaryStaffVO>>(`/hrs-api/salary-staff/${salaryStaffId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取员工薪资（通过员工id） GET /salary-staff/staff-id/${salaryStaffId} */
export async function getSalaryStaffByStaffId(staffId: number, options?: Record<string, any>) {
  return request<ResultBody<SalaryStaffVO>>(`/hrs-api/salary-staff/staff-id/${staffId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加员工接口 POST /salary-staff */
export async function addSalaryStaff(body: SalaryStaffForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salary-staff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新员工接口 PUT /salary-staff */
export async function updateSalaryStaff(body: SalaryStaffForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salary-staff', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除员工接口 DELETE /salary-staff/${salaryStaffId} */
export async function deleteSalaryStaff(salaryStaffId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/salary-staff/${salaryStaffId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除员工接口 DELETE /salary-staff */
export async function batchDeleteSalaryStaff(body: number[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/salary-staff', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出员工薪资 GET /salary-staff/export */
export async function exportSalaryStaff(params: any, options?: Record<string, any>) {
  return request('/hrs-api/salary-staff/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...params
    },
    ...(options || {}),
    skipErrorHandler: true
  });
}

/** 打印员工薪资 POST /salary-staff/print */
export async function printSalaryStaff(salaryStaffId: number, options?: Record<string, any>) {
  return request('/hrs-api/salary-staff/print', {
    method: 'GET',
    responseType: 'blob',
    params: {
      salaryStaffId
    },
    ...(options || {}),
    skipErrorHandler: true
  });
}

