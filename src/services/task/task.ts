// @ts-ignore
import { request } from 'umi';
import type { Page } from "@/services/common/typings";
import type { Orders, PageParams } from "@/services/common/typings";
import type { TaskForm, TaskVO } from "@/services/task/typings";

/** 获取任务信息（分页） GET /task/page */
export async function getTaskPage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<Page<TaskVO>>('/hrs-api/task/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 添加定时任务接口 POST /task */
export async function addTask(body: TaskForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新定时任务接口 PUT /task */
export async function updateTask(body: TaskForm, options?: Record<string, any>,) {
  return request<number>('/hrs-api/task', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除定时任务接口 DELETE /task */
export async function batchDeleteTask(body: (number | undefined)[], options?: Record<string, any>,) {
  return request<number>('/hrs-api/task', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除定时任务接口 DELETE /task/${taskId} */
export async function deleteTask(taskId: number, options?: Record<string, any>) {
  return request<number>(`/hrs-api/task/${taskId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取任务信息（通过任务id） GET /task/${taskId} */
export async function getTaskByTaskId(taskId: number, options?: Record<string, any>,) {
  return request<TaskVO>(`/hrs-api/task/${taskId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 运行定时任务接口 GET /task/${param0}/run */
export async function runTask(taskId: number, options?: Record<string, any>) {
  return request<any>(`/hrs-api/task/${taskId}/run`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 停止定时任务接口 GET /task/${taskId}/stop */
export async function stopTask(taskId: number, options?: Record<string, any>,) {
  return request<number>(`/hrs-api/task/${taskId}/stop`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 开始定时任务接口 GET /task/${param0}/start */
export async function startTask(taskId: number, options?: Record<string, any>) {
  return request<undefined>(`/hrs-api/task/${taskId}/start`, {
    method: 'GET',
    ...(options || {}),
  });
}
