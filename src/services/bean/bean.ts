// @ts-ignore
import { request } from 'umi';
import type { BeanInfo } from "@/services/bean/typings";
import type { TaskVO } from "@/services/task/typings";
import {ResultBody} from "@/services/common/typings";

/** 获取Bean列表 GET /bean/list */
export async function getBeanInfoList(options?: Record<string, any>) {
  return request<ResultBody<BeanInfo[]>>('/hrs-api/bean/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取Bean列表 GET /bean/${beanName} */
export async function getBeanInfoByName(beanName: string, options?: Record<string, any>) {
  return request<ResultBody<BeanInfo>>(`/hrs-api/bean/${beanName}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取Bean对应的方法 POST /bean/method */
export async function getBeanMethod(
  body?: {
    beanName?: string;
    methodName?: string;
  }, options?: Record<string, any>) {
  return request<ResultBody<TaskVO>>('/hrs-api/bean/method', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
