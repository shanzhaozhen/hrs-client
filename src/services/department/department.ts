// @ts-ignore
import { request } from 'umi';
import DepartmentForm = API.DepartmentForm;

/** 获取部门信息（通过部门id） GET /department/${departmentId} */
export async function getDepartmentByDepartmentId(departmentId: number, options?: Record<string, any>) {
  return request<API.ResultBodyDepartmentVO>(`/department/${departmentId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有部门（树状） GET /department/tree */
export async function getDepartmentTree(options?: Record<string, any>) {
  return request<API.ResultBodyListDepartmentVO>('/department/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有部门 GET /department/all */
export async function getAllDepartments(options?: Record<string, any>) {
  return request<API.ResultBodyListDepartmentVO>('/department/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加部门接口 POST /department */
export async function addDepartment(body: DepartmentForm, options?: Record<string, any>) {
  return request<API.ResultBodyLong>('/department', {
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
  return request<number>('/department', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 删除部门接口 DELETE /department */
export async function deleteDepartment(body?: number[], options?: Record<string, any>) {
  return request<API.ResultBodyListLong>('/department', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

