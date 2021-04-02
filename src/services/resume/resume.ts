// @ts-ignore
import { request } from 'umi';
import type { Orders, Page, PageParams } from "@/services/common/typings";
import type { ResumeVO } from "@/services/resume/typings";

/** 获取简历（分页） GET /resume/page */
export async function getResumePage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<ResumeVO>>('/hrs-api/resume/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取简历（通过简历id） GET /resume/${resumeId} */
export async function getResumeById(resumeId: number, options?: Record<string, any>) {
  return request<ResumeVO>(`/hrs-api/resume/${resumeId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加简历接口 POST /resume */
export async function addResume(body: API.ResumeForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新简历接口 PUT /resume */
export async function updateResume(body: API.ResumeForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/resume', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除简历接口 DELETE /resume */
export async function batchDeleteResume(body: (number | undefined)[], options?: Record<string, any>) {
  return request<number[]>('/hrs-api/resume', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除简历接口 DELETE /resume/${resumeId} */
export async function deleteResume(resumeId: number, options?: Record<string, any>) {
  return request<number>(`/hrs-api/resumeId/${resumeId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
