// @ts-ignore
import { request } from 'umi';
import type { DictionaryForm, DictionaryVO } from "@/services/dictionary/typings";
import type { Page } from "@/services/common/typings";
import type { Orders, PageParams } from "@/services/common/typings";

/** 获取所有根部字典 GET /dictionary/root */
export async function getDictionaryRootList(options?: Record<string, any>) {
  return request<DictionaryVO[]>('/hrs-api/dictionary/root', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有根部字典 GET /dictionary/page/root */
export async function getDictionaryRootPage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<DictionaryVO>>('/hrs-api/dictionary/page/root', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取字典（通过字典id） GET /dictionary/${dictionaryId} */
export async function getDictionaryById(dictionaryId: number, options?: Record<string, any>) {
  return request<DictionaryVO>(`/hrs-api/dictionary/${dictionaryId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取字典树（通过父级字典id） GET /dictionary/tree/${dictionaryId} */
export async function getDictionaryTreeById(dictionaryId: number, options?: Record<string, any>) {
  return request<DictionaryVO>(`/hrs-api/dictionary/tree/${dictionaryId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 通过ID获取所在的树 GET /dictionary/tree/parent/${dictionaryId} */
export async function getDictionaryParentTreeById(dictionaryId: number, options?: Record<string, any>,) {
  return request<DictionaryVO>(`/hrs-api/dictionary/tree/parent/${dictionaryId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 通过父级ID获取字典子节点 GET /dictionary/children/${dictionaryId} */
export async function getDictionaryChildrenById(dictionaryId: number, options?: Record<string, any>) {
  return request<DictionaryVO[]>(`/hrs-api/dictionary/children/${dictionaryId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 通过父级ID获取字典子节点 GET /dictionary/children/code */
export async function getDictionaryChildrenByCode(code: string, keyword: string, options?: Record<string, any>) {
  return request<DictionaryVO[]>(`/hrs-api/dictionary/children/code`, {
    method: 'GET',
    params: {
      code,
      keyword
    },
    ...(options || {}),
  });
}

/** 字典添加接口 POST /dictionary */
export async function addDictionary(body: DictionaryForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/dictionary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 字典更新接口 PUT /dictionary */
export async function updateDictionary(body: DictionaryForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/dictionary', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 字典删除接口 DELETE /dictionary/${dictionaryId} */
export async function deleteDictionary(dictionaryId: number, options?: Record<string, any>,) {
  return request<number>(`/hrs-api/dictionary/${dictionaryId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量字典删除接口 DELETE /dictionary */
export async function batchDeleteDictionary(body: (number | undefined)[], options?: Record<string, any>) {
  return request<number[]>('/hrs-api/dictionary', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
