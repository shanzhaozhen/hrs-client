// @ts-ignore
import { request } from 'umi';
import type {PerformanceSettingForm, PerformanceSettingVO} from "@/services/performance-setting/typings";
import type {Orders, Page, PageParams, ResultBody} from "@/services/common/typings";

/** 获取绩效设置（分页） GET /performance-setting/page */
export async function getPerformanceSettingPage(pageParams: PageParams & any, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<PerformanceSettingVO>>>('/hrs-api/performance-setting/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders
    },
    ...(options || {}),
  });
}

/** 获取绩效设置（分页） GET /performance-setting/page */
export async function getPerformanceSettingList(keyword?: string | number, options?: Record<string, any>) {
  return request<ResultBody<PerformanceSettingVO[]>>('/hrs-api/performance-setting/list', {
    method: 'GET',
    params: {
      keyword
    },
    ...(options || {}),
  });
}

/** 获取绩效设置（通过绩效设置id） GET /performance-setting/${performanceSettingId} */
export async function getPerformanceSettingById(performanceSettingId: number, options?: Record<string, any>) {
  return request<ResultBody<PerformanceSettingVO>>(`/hrs-api/performance-setting/${performanceSettingId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加绩效设置接口 POST /performance-setting */
export async function addPerformanceSetting(body: PerformanceSettingForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/performance-setting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新绩效设置接口 PUT /performance-setting */
export async function updatePerformanceSetting(body: PerformanceSettingForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/performance-setting', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除绩效设置接口 DELETE /performance-setting/${performanceSettingId} */
export async function deletePerformanceSetting(performanceSettingId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/performance-setting/${performanceSettingId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除绩效设置接口 DELETE /performance-setting */
export async function batchDeletePerformanceSetting(body: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/performance-setting', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出绩效设置 GET /performance-setting/export */
export async function exportPerformanceSetting(params: any, options?: Record<string, any>) {
  return request('/hrs-api/performance-setting/export', {
    method: 'GET',
    responseType: 'blob',
    params: {
      ...params
    },
    ...(options || {}),
    skipErrorHandler: true
  });
}

/** 打印绩效设置 POST /performance-setting/print */
export async function printPerformanceSetting(performanceSettingId: number, options?: Record<string, any>) {
  return request('/hrs-api/performance-setting/print', {
    method: 'GET',
    responseType: 'blob',
    params: {
      performanceSettingId
    },
    ...(options || {}),
    skipErrorHandler: true
  });
}

