// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /test */
export async function testInstall(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/test', {
    method: 'GET',
    responseType: '*/*',
    ...(options || {}),
  });
}
