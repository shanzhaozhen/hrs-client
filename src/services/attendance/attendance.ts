// @ts-ignore
import { request } from 'umi';
import type {Orders, Page, PageParams, ResultBody} from "@/services/common/typings";
import type {AttendanceForm, AttendanceVO} from "@/services/attendance/typings";

/** 获取考勤数据（分页） GET /attendance/page */
export async function getAttendancePage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<AttendanceVO>>>('/hrs-api/attendance/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取考勤数据（通过考勤数据id） GET /attendance/${attendanceId} */
export async function getAttendanceById(attendanceId: number, options?: Record<string, any>) {
  return request<ResultBody<AttendanceVO>>(`/hrs-api/attendance/${attendanceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加考勤数据接口 POST /attendance */
export async function addAttendance(body: AttendanceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新考勤数据接口 PUT /attendance */
export async function updateAttendance(body: AttendanceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/attendance', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除考勤数据接口 DELETE /attendance/${attendanceId} */
export async function deleteAttendance(attendanceId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/attendance/${attendanceId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


/** 批量删除考勤数据接口 DELETE /attendance */
export async function batchDeleteAttendance(body: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/attendance', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 考勤数据导入模板生成 GET /attendance/template */
export async function generateAttendanceTemplate(options?: Record<string, any>) {
  return request('/hrs-api/attendance/template', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
    skipErrorHandler: true
  });
}

/** 导出考勤数据 GET /attendance/export */
export async function exportAttendance(pageParams: PageParams, options?: Record<string, any>) {
  return request('/hrs-api/attendance/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...pageParams,
    },
    ...(options || {}),
  });
}
