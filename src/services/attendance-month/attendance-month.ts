// @ts-ignore
import { request } from 'umi';
import type { Orders, Page, PageParams, ResultBody } from '@/services/common/typings';
import type { AttendanceMonthForm, AttendanceMonthVO } from '@/services/attendance-month/typings';

/** 获取月度考勤（分页） GET /attendance-month/page */
export async function getAttendanceMonthPage(
  pageParams: PageParams,
  orders?: Orders | undefined | null,
  options?: Record<string, any>,
) {
  return request<ResultBody<Page<AttendanceMonthVO>>>('/hrs-api/attendance-month/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取月度考勤（通过月度考勤id） GET /attendance-month/${attendanceId} */
export async function getAttendanceMonthById(attendanceId: number, options?: Record<string, any>) {
  return request<ResultBody<AttendanceMonthVO>>(`/hrs-api/attendance-month/${attendanceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加月度考勤接口 POST /attendance-month */
export async function addAttendanceMonth(body: AttendanceMonthForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/attendance-month', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新月度考勤接口 PUT /attendance-month */
export async function updateAttendanceMonth(
  body: AttendanceMonthForm,
  options?: Record<string, any>,
) {
  return request<ResultBody<number>>('/hrs-api/attendance-month', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除月度考勤接口 DELETE /attendance-month/${attendanceId} */
export async function deleteAttendanceMonth(attendanceId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/attendance-month/${attendanceId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除月度考勤接口 DELETE /attendance-month */
export async function batchDeleteAttendanceMonth(
  body: (number | undefined)[],
  options?: Record<string, any>,
) {
  return request<ResultBody<number[]>>('/hrs-api/attendance-month', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 月度考勤导入模板生成 GET /attendance-month/template */
export async function generateAttendanceMonthTemplate(options?: Record<string, any>) {
  return request('/hrs-api/attendance-month/template', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 导出月度考勤 GET /attendance-month/export */
export async function exportAttendanceMonth(pageParams: PageParams, options?: Record<string, any>) {
  return request('/hrs-api/attendance-month/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...pageParams,
    },
    ...(options || {}),
  });
}
