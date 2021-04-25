// @ts-ignore
import { request } from 'umi';
import type { TransferRecordForm, TransferRecordVO } from "@/services/transfer-record/typings";
import type { Orders, Page, PageParams, ResultBody } from "@/services/common/typings";

/** 获取调动记录信息（分页） GET /transfer-record/page */
export async function getTransferRecordPage(pageParams: PageParams, staffId: number | undefined | null, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<TransferRecordVO>>>('/hrs-api/transfer-record/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
      staffId
    },
    ...(options || {}),
  });
}

/** 获取调动记录（通过调动记录id） GET /transfer-record/${transferRecordId} */
export async function getTransferRecordById(transferRecordId: number, options?: Record<string, any>) {
  return request<ResultBody<TransferRecordVO>>(`/hrs-api/transfer-record/${transferRecordId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加调动记录接口 POST /transfer-record */
export async function addTransferRecord(body: TransferRecordForm, options?: Record<string, any>,) {
  return request<ResultBody<number>>('/hrs-api/transfer-record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改调动记录接口 PUT /transfer-record */
export async function updateTransferRecord(body: TransferRecordForm, options?: Record<string, any>,) {
  return request<ResultBody<number>>('/hrs-api/transfer-record', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除调动记录接口 DELETE /transfer-record/${transferRecordId} */
export async function deleteTransferRecord(transferRecordId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/transfer-record/${transferRecordId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 批量删除调动记录接口 DELETE /transfer-record */
export async function batchDeleteTransferRecorde(body: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/transfer-record', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 执行调动记录信息 GET /transfer-record/run/${transferRecordId} */
export async function runTransfer(transferRecordId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/transfer-record/run/${transferRecordId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
