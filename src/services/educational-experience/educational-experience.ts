// @ts-ignore
import { request } from 'umi';
import type {Orders, Page, PageParams, ResultBody} from "@/services/common/typings";
import type { EducationalExperienceForm, EducationalExperienceVO } from "@/services/educational-experience/typings";

/** 获取教育经历（分页） GET /educational-experience/page */
export async function getEducationalExperiencePage(pageParams: PageParams, roleId?: number, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<EducationalExperienceVO>>>('/educational-experience/page', {
    method: 'GET',
    params: {
      ...pageParams,
    },
    ...(options || {}),
  });
}

/** 获取教育经历（通过教育经历id） GET /educational-experience/${educationalExperienceId} */
export async function getEducationalExperienceById(educationalExperienceId: number, options?: Record<string, any>) {
  return request<ResultBody<EducationalExperienceVO>>(`/educational-experience/${educationalExperienceId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取教育经历（通过教育经历id） GET /educational-experience/pid/${pid} */
export async function getEducationalExperienceListByPid(pid: number, options?: Record<string, any>) {
  return request<ResultBody<Page<EducationalExperienceVO>>>(`/educational-experience/pid/${pid}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 添加教育经历接口 POST /educational-experience */
export async function addEducationalExperience(body: EducationalExperienceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/educational-experience', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新教育经历接口 PUT /educational-experience */
export async function updateEducationalExperience(body: EducationalExperienceForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/educational-experience', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除教育经历接口 DELETE /educational-experience/${educationalExperienceId} */
export async function deleteEducationalExperience(educationalExperienceId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/educational-experience/${educationalExperienceId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除教育经历接口 DELETE /educational-experience */
export async function batchDeleteEducationalExperience(body: number[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/educational-experience', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

