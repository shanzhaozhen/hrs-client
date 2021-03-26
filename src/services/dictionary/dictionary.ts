// @ts-ignore
import { request } from 'umi';
import type { DictionaryVO } from "@/services/dictionary/typings";
import type { Page } from "@/services/common/typings";

/** 获取所有字典（树状结构） GET /dictionary/tree */
export async function getDictionaryTree(options?: Record<string, any>) {
  return request<DictionaryVO[]>('/dictionary/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有根部字典 GET /dictionary/root-tree */
export async function getDictionaryRootPage(options?: Record<string, any>) {
  return request<Page<DictionaryVO>>('/dictionary/page/root', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取字典（通过字典id） GET /dictionary/${param0} */
export async function getDictionaryByDictionaryId(dictionaryId: number, options?: Record<string, any>) {
  return request<DictionaryVO>(`/dictionary/${dictionaryId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 字典添加接口 POST /dictionary */
export async function addDictionary(body: API.DictionaryForm, options?: Record<string, any>) {
  return request<API.ResultBodyLong>('/dictionary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 字典更新接口 PUT /dictionary */
export async function updateDictionary(body: API.DictionaryForm, options?: Record<string, any>) {
  return request<API.ResultBodyLong>('/dictionary', {
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
  return request<API.ResultBodyLong>(`/dictionary/${dictionaryId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量字典删除接口 DELETE /dictionary */
export async function batchDeleteDictionary(body: (number | undefined)[], options?: Record<string, any>) {
  return request<API.ResultBodyListLong>('/dictionary', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
