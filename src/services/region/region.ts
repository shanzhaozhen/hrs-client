// @ts-ignore
import { request } from 'umi';
import type { RegionForm, RegionVO } from '@/services/region/typings';
import type { Orders, Page, PageParams } from "@/services/common/typings";

/** 获取所有区域信息根部 GET /region/root */
export async function getRegionRootList(options?: Record<string, any>) {
  return request<API.ResultBodyListRegionVO>('/hrs-api/region/root', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取区域信息信息（分页） GET /region/page */
export async function getRegionRootPage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<RegionVO>>('/hrs-api/region/page/root', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders
    },
    ...(options || {}),
  });
}

/** 获取所有区域信息 GET /region/all */
export async function getAllRegions(options?: Record<string, any>) {
  return request<RegionVO[]>('/hrs-api/region/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有区域信息（树状） GET /region/tree */
export async function getRegionTree(options?: Record<string, any>) {
  return request<RegionVO[]>('/hrs-api/region/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 通过level获取区域信息（树状） GET /region/tree/level */
export async function getRegionTreeByLevel(level: number, type: number, options?: Record<string, any>) {
  return request<RegionVO[]>('/hrs-api/region/tree/level', {
    method: 'GET',
    params: {
      level,
      type
    },
    ...(options || {}),
  });
}

/** 通过父级ID获取字典子节点 GET /region/${regionId}/children */
export async function getRegionChildrenById(regionId: number, options?: Record<string, any>) {
  return request<RegionVO[]>(`/hrs-api/region/${regionId}/children`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取区域信息信息（通过区域信息id） GET /region/${regionId} */
export async function getRegionById(regionId: number, options?: Record<string, any>) {
  return request<RegionVO>(`/hrs-api/region/${regionId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加区域信息接口 POST /region */
export async function addRegion(body: RegionForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/region', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新区域信息接口 PUT /region */
export async function updateRegion(body: RegionForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/region', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除区域信息接口 DELETE /region/${regionId} */
export async function deleteRegion(regionId: number, options?: Record<string, any>,) {
  return request<number>(`/hrs-api/region/${regionId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除区域信息接口 DELETE /region */
export async function batchDeleteRegion(body: (number | undefined)[], options?: Record<string, any>,) {
  return request<number>('/hrs-api/region', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
