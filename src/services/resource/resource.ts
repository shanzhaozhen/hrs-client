// @ts-ignore
import { request } from 'umi';
import type { ResourceForm, ResourceVO } from '@/services/resource/typings';
import {ResultBody} from "@/services/common/typings";

/** 获取所有资源（树状结构） GET /resource/tree */
export async function getResourceTree(options?: Record<string, any>) {
  return request<ResultBody<ResourceVO[]>>('/hrs-api/resource/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有根部资源（树状结构） GET /resource/root-tree */
export async function getAllResourceRootTree(options?: Record<string, any>) {
  return request<ResultBody<ResourceVO[]>>('/hrs-api/resource/root-tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取资源（通过资源id） GET /resource/${resourceId} */
export async function getResourceById(resourceId: number, options?: Record<string, any>) {
  return request<ResultBody<ResourceVO>>(`/hrs-api/resource/${resourceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 资源添加接口 POST /resource */
export async function addResource(body: ResourceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/resource', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 资源更新接口 PUT /resource */
export async function updateResource(body: ResourceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/resource', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 资源删除接口 DELETE /resource/${resourceId} */
export async function deleteResource(resourceId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/resource/${resourceId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量资源删除接口 DELETE /resource */
export async function batchDeleteResource(body?: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/resource', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
