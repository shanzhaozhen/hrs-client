// @ts-ignore
import { request } from 'umi';
import type { DepartmentForm, DepartmentVO } from "@/services/department/typings";

/** 获取部门信息（通过部门id） GET /department/${departmentId} */
export async function getDepartmentByDepartmentId(departmentId: number, options?: Record<string, any>) {
  return request<DepartmentVO>(`/hrs-api/department/${departmentId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有部门（树状） GET /department/tree */
export async function getDepartmentTree(options?: Record<string, any>) {
  return request<DepartmentVO[]>('/hrs-api/department/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有部门 GET /department/all */
export async function getAllDepartments(options?: Record<string, any>) {
  return request<DepartmentVO[]>('/hrs-api/department/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加部门接口 POST /department */
export async function addDepartment(body: DepartmentForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/department', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新部门接口 PUT /department */
export async function updateDepartment(body: DepartmentForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/department', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除部门接口 DELETE /department */
export async function deleteDepartments(body?: (number | undefined)[], options?: Record<string, any>) {
  return request<number[]>('/hrs-api/department', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除部门接口 DELETE /department/${departmentId} */
export async function deleteDepartment(departmentId: number, options?: Record<string, any>,) {
  return request<number>(`/hrs-api/department/${departmentId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除部门接口 DELETE /department */
export async function batchDeleteDepartment(body?: (number | undefined)[], options?: Record<string, any>) {
  return request<number[]>('/hrs-api/department', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
