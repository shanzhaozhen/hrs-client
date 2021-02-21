// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 更新路由接口 PUT /route */
export async function updateRoute(body: API.RouteForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/route', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 添加路由接口 POST /route */
export async function addRoute(body: API.RouteForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/route', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取路由信息（通过路由id） GET /route/${param0} */
export async function getRouteByRouteId(
  params: {
    // path
    /** 路由id */
    routeId: number;
  },
  options?: { [key: string]: any },
) {
  const { routeId: param0 } = params;
  return request<API.ResultBodyRouteVO>(`/route/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 删除路由接口 DELETE /route/${param0} */
export async function deleteRoute(
  params: {
    // path
    /** 路由id */
    routeId: number;
  },
  options?: { [key: string]: any },
) {
  const { routeId: param0 } = params;
  return request<API.ResultBodyLong>(`/route/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取所有路由信息（树状结构） GET /route/tree */
export async function getAllRouteTree(options?: { [key: string]: any }) {
  return request<API.ResultBodyListRouteVO>('/route/tree', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}
