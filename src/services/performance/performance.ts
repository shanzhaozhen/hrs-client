// @ts-ignore
import { request } from 'umi';
import type {Orders, Page, PageParams, ResultBody} from "@/services/common/typings";
import type {PerformanceForm, PerformanceVO} from "@/services/performance/typings";

/** 获取绩效评价（分页） GET /performance/page */
export async function getPerformancePage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<PerformanceVO>>>('/hrs-api/performance/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取绩效评价（通过绩效评价id） GET /performance/${performanceId} */
export async function getPerformanceById(performanceId: number, options?: Record<string, any>) {
  return request<ResultBody<PerformanceVO>>(`/hrs-api/performance/${performanceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加绩效评价接口 POST /performance */
export async function addPerformance(body: PerformanceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/performance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新绩效评价接口 PUT /performance */
export async function updatePerformance(body: PerformanceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/performance', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除绩效评价接口 DELETE /performance/${performanceId} */
export async function deletePerformance(performanceId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/performance/${performanceId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


/** 批量删除绩效评价接口 DELETE /performance */
export async function batchDeletePerformance(body: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/performance', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 导出绩效评价 GET /performance/print */
export async function printPerformance(performanceId: number, options?: Record<string, any>) {
  return request<any>('/hrs-api/performance/print', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 导出绩效评价 GET /performance/export */
export async function exportPerformance(
  params: {
    // query
    keyword: string;
    depId: number;
  },
  options?: Record<string, any>,
) {
  return request<any>('/hrs-api/performance/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
