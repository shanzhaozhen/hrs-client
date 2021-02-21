// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 资源更新接口 PUT /resource */
export async function updateResource(body: API.ResourceForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/resource', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 资源添加接口 POST /resource */
export async function addResource(body: API.ResourceForm, options?: { [key: string]: any }) {
  return request<API.ResultBodyLong>('/resource', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取资源（通过资源id） GET /resource/${param0} */
export async function getResourceByResourceId(
  params: {
    // path
    /** 资源id */
    resourceId: number;
  },
  options?: { [key: string]: any },
) {
  const { resourceId: param0 } = params;
  return request<API.ResultBodyResourceVO>(`/resource/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 资源删除接口 DELETE /resource/${param0} */
export async function deleteResource(
  params: {
    // path
    /** 资源id */
    resourceId: number;
  },
  options?: { [key: string]: any },
) {
  const { resourceId: param0 } = params;
  return request<API.ResultBodyLong>(`/resource/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取所有资源（树状结构） GET /resource/tree */
export async function getAllResourceTree(options?: { [key: string]: any }) {
  return request<API.ResultBodyListResourceVO>('/resource/tree', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取所有根部资源（树状结构） GET /resource/root-tree */
export async function getAllResourceRootTree(options?: { [key: string]: any }) {
  return request<API.ResultBodyListResourceVO>('/resource/root-tree', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}
