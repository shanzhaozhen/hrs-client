// @ts-ignore
import { request } from 'umi';
import type { Page } from "@/services/common/typings";
import type { FileVO } from "@/services/file/typings";
import type { Orders, PageParams } from "@/services/common/typings";

/** 获取文件信息（分页） GET /file/page */
export async function getFilePage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<FileVO>>('/hrs-api/file/page', {
    method: 'GET',
    params: {
      ...pageParams,
    },
    ...(options || {}),
  });
}

/** 获取文件信息（通过文件id） GET /file/${fileId} */
export async function getFileById(fileId: number, options?: Record<string, any>) {
  return request<FileVO>(`/hrs-api/file/${fileId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /upload */
export async function upload(files: string[], options?: Record<string, any>,
) {
  return request<FileVO[]>('/hrs-api/upload', {
    method: 'POST',
    data: files,
    ...(options || {}),
  });
}


