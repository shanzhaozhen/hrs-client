// @ts-ignore
import { request } from 'umi';
import type {Page, ResultBody} from "@/services/common/typings";
import type { Orders, PageParams } from "@/services/common/typings";
import type {FamilyForm, FamilyVO} from "@/services/family/typings";

/** 获取家庭成员（分页） GET /family/page */
export async function getFamilyPage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<FamilyVO>>>('/family/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders
    },
    ...(options || {}),
  });
}

/** 获取家庭成员（通过家庭成员id） GET /family/${familyId} */
export async function getFamilyById(familyId: number, options?: Record<string, any>) {
  return request<ResultBody<FamilyVO>>(`/family/${familyId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取家庭成员（通过家庭成员id） GET /family/pid/${pid} */
export async function getFamilyListByPid(pid: number, options?: Record<string, any>) {
  return request<ResultBody<FamilyVO>>(`/family/pid/${pid}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加家庭成员接口 POST /family */
export async function addFamily(body: FamilyForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/family', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新家庭成员接口 PUT /family */
export async function updateFamily(body: FamilyForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/family', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除家庭成员接口 DELETE /family/${familyId} */
export async function deleteFamily(familyId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/family/${familyId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除家庭成员接口 DELETE /family */
export async function batchDeleteFamily(body: number[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/family', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
