// @ts-ignore
import { request } from 'umi';
import type { SortOrder } from 'antd/lib/table/interface';
import type { ResourceVO } from '@/services/resource/typings';
import type { PageParams } from '@/services/common/typings';

/** 获取所有资源（树状结构） GET /resource/tree */
export async function getAllResourceTree(
  params: PageParams,
  sorter: Record<string, SortOrder>,
  options?: Record<string, any>,
) {
  return request<ResourceVO[]>('/hrs-api/resource/tree', {
    method: 'GET',
    data: {
      ...params,
      sorter,
    },
    ...(options || {}),
  });
}

/** 获取所有根部资源（树状结构） GET /resource/root-tree */
export async function getAllResourceRootTree(options?: Record<string, any>) {
  return request<ResourceVO[]>('/hrs-api/resource/root-tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取资源（通过资源id） GET /resource/${resourceId} */
export async function getResourceByResourceId(resourceId: number, options?: Record<string, any>) {
  return request<ResourceVO>(`/hrs-api/resource/${resourceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 资源添加接口 POST /resource */
export async function addResource(body: API.ResourceForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/resource', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 资源更新接口 PUT /resource */
export async function updateResource(body: API.ResourceForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/resource', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 资源删除接口 DELETE /resource/${param0} */
export async function deleteResources(
  resourceIds: (number | undefined)[],
  options?: Record<string, any>,
) {
  return request<number[]>(`/hrs-api/resource`, {
    method: 'DELETE',
    data: resourceIds,
    ...(options || {}),
  });
}
