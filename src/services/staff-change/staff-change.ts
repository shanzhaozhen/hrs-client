// @ts-ignore
import { request } from 'umi';
import type { StaffChangeForm, StaffChangeVO } from "@/services/staff-change/typings";
import type { Orders, Page, PageParams, ResultBody } from "@/services/common/typings";

/** 获取调动记录信息（分页） GET /staff-change/page */
export async function getStaffChangePage(pageParams: PageParams, staffId: number | undefined | null, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<StaffChangeVO>>>('/hrs-api/staff-change/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
      staffId
    },
    ...(options || {}),
  });
}

/** 获取调动记录（通过调动记录id） GET /staff-change/${staffChangeId} */
export async function getStaffChangeById(staffChangeId: number, options?: Record<string, any>) {
  return request<ResultBody<StaffChangeVO>>(`/hrs-api/staff-change/${staffChangeId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加调动记录接口 POST /staff-change */
export async function addStaffChange(body: StaffChangeForm, options?: Record<string, any>,) {
  return request<ResultBody<number>>('/hrs-api/staff-change', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改调动记录接口 PUT /staff-change */
export async function updateStaffChange(body: StaffChangeForm, options?: Record<string, any>,) {
  return request<ResultBody<number>>('/hrs-api/staff-change', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除调动记录接口 DELETE /staff-change/${staffChangeId} */
export async function deleteStaffChange(staffChangeId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/staff-change/${staffChangeId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除调动记录接口 DELETE /staff-change */
export async function batchDeleteStaffChange(body: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/staff-change', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 执行调动记录信息 GET /staff-change/run/${staffChangeId} */
export async function runTransfer(staffChangeId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/staff-change/run/${staffChangeId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
