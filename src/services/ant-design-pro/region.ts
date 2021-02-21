// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 更新区域信息接口 PUT /region */
export async function updateRegion(body: API.RegionForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/region', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 添加区域信息接口 POST /region */
export async function addRegion(body: API.RegionForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/region', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取区域信息信息（分页） POST /region/page */
export async function getRegionPage(body: API.BaseSearchForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyPageRegionVO>('/region/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取区域信息信息（通过区域信息id） GET /region/${param0} */
export async function getRegionByRegionId(
  params: {
    // path
    /** 区域信息id */
    regionId: number;
  },
  options?: { [key: string]: any },
) {
  const { regionId: param0 } = params;
  return request<API.ResultBodyRegionVO>(`/region/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 删除区域信息接口 DELETE /region/${param0} */
export async function deleteRegion(
  params: {
    // path
    /** 区域信息id */
    regionId: number;
  },
  options?: { [key: string]: any },
) {
  const { regionId: param0 } = params;
  return request<API.ResultBodyLong>(`/region/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取所有区域信息 GET /region/tree */
export async function getRegionTree(options?: { [key: string]: any }) {
  return request<API.ResultBodyListRegionVO>('/region/tree', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取所有区域信息 GET /region/all */
export async function getAllRegions(options?: { [key: string]: any }) {
  return request<API.ResultBodyListRegionVO>('/region/all', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}
