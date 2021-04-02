// @ts-ignore
import { request } from 'umi';
import type { WorkExperienceForm, WorkExperienceVO } from "@/services/work-experience/typings";
import type { Orders, Page, PageParams } from "@/services/common/typings";


/** 获取工作履历（分页） GET /work-experience/page */
export async function getWorkExperiencePage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<WorkExperienceVO>>('/hrs-api/work-experience/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders
    },
    ...(options || {}),
  });
}

/** 获取工作履历（通过工作履历id） GET /work-experience/${workExperienceId} */
export async function getWorkExperienceById(workExperienceId: number, options?: Record<string, any>) {
  return request<WorkExperienceVO>(`/hrs-api/work-experience/${workExperienceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取工作履历（通过工作履历id） GET /work-experience/pid/${workExperienceId} */
export async function getWorkExperienceListByPid(pid: number, options?: Record<string, any>,) {
  return request<WorkExperienceVO[]>(`/hrs-api/work-experience/pid/${pid}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加工作履历接口 POST /work-experience */
export async function addWorkExperience(body: WorkExperienceForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/work-experience', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新工作履历接口 PUT /work-experience */
export async function updateWorkExperience(body: WorkExperienceForm, options?: Record<string, any>,) {
  return request<number>('/hrs-api/work-experience', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除工作履历接口 DELETE /work-experience/${workExperienceId} */
export async function deleteWorkExperience(workExperienceId: number, options?: Record<string, any>) {
  return request<number>(`/hrs-api/work-experience/${workExperienceId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除工作履历接口 DELETE /work-experience */
export async function batchDeleteWorkExperience(body: number[], options?: Record<string, any>) {
  return request<number[]>('/hrs-api/work-experience', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
