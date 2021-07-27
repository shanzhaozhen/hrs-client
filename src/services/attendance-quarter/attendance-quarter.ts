// @ts-ignore
import { request } from 'umi';
import type { Orders, Page, PageParams, ResultBody } from '@/services/common/typings';
import type {
  AttendanceQuarterForm,
  AttendanceQuarterVO,
} from '@/services/attendance-quarter/typings';

/** 获取季度考勤（分页） GET /attendance-quarter/page */
export async function getAttendanceQuarterPage(
  pageParams: PageParams,
  orders?: Orders | undefined | null,
  options?: Record<string, any>,
) {
  return request<ResultBody<Page<AttendanceQuarterVO>>>('/hrs-api/attendance-quarter/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取季度考勤（通过季度考勤id） GET /attendance-quarter/${attendanceQuarterId} */
export async function getAttendanceQuarterById(
  attendanceQuarterId: number,
  options?: Record<string, any>,
) {
  return request<ResultBody<AttendanceQuarterVO>>(
    `/hrs-api/attendance-quarter/${attendanceQuarterId}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 添加季度考勤接口 POST /attendance-quarter */
export async function addAttendanceQuarter(
  body: AttendanceQuarterForm,
  options?: Record<string, any>,
) {
  return request<ResultBody<number>>('/hrs-api/attendance-quarter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新季度考勤接口 PUT /attendance-quarter */
export async function updateAttendanceQuarter(
  body: AttendanceQuarterForm,
  options?: Record<string, any>,
) {
  return request<ResultBody<number>>('/hrs-api/attendance-quarter', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除季度考勤接口 DELETE /attendance-quarter/${attendanceQuarterId} */
export async function deleteAttendanceQuarter(
  attendanceQuarterId: number,
  options?: Record<string, any>,
) {
  return request<ResultBody<number>>(`/hrs-api/attendance-quarter/${attendanceQuarterId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除季度考勤接口 DELETE /attendance-quarter */
export async function batchDeleteAttendanceQuarter(
  body: (number | undefined)[],
  options?: Record<string, any>,
) {
  return request<ResultBody<number[]>>('/hrs-api/attendance-quarter', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 冻结/解冻季度考勤 GET /attendance-quarter/freeze */
export async function freezeAttendanceQuarterByIds(
  params: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<ResultBody<string>>('/hrs-api/attendance-quarter/freeze', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 冻结/解冻季度考勤 GET /attendance-quarter/freeze/quarter */
export async function freezeAttendanceQuarterByQuarter(
  params: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<ResultBody<string>>('/hrs-api/attendance-quarter/freeze/quarter', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 季度考勤导入模板生成 GET /attendance-quarter/template */
export async function generateAttendanceQuarterTemplate(options?: Record<string, any>) {
  return request('/hrs-api/attendance-quarter/template', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

/** 导出季度考勤 GET /attendance-quarter/export */
export async function exportAttendanceQuarter(
  pageParams: PageParams,
  options?: Record<string, any>,
) {
  return request('/hrs-api/attendance-quarter/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...pageParams,
    },
    ...(options || {}),
  });
}
