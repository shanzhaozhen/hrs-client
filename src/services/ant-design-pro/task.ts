// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 更新定时任务接口 PUT /task */
export async function updateDynamicScheduledTask(
  body: API.DynamicScheduledTaskForm,
  options?: { [key: string]: any },
) {
  return request<API.ResultBodyLong>('/task', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 添加定时任务接口 POST /task */
export async function addDynamicScheduledTask(
  body: API.DynamicScheduledTaskForm,
  options?: { [key: string]: any },
) {
  return request<API.ResultBodyLong>('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取任务信息（分页） POST /task/page */
export async function getDynamicScheduledTaskPage1(
  body: API.BaseSearchForm,
  options?: { [key: string]: any },
) {
  return request<API.ResultBodyPageDynamicScheduledTaskVO>('/task/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 获取任务信息（通过任务id） GET /task/${param0} */
export async function getDynamicScheduledTaskByDynamicScheduledTaskId(
  params: {
    // path
    /** 任务id */
    taskId: number;
  },
  options?: { [key: string]: any },
) {
  const { taskId: param0 } = params;
  return request<API.ResultBodyDynamicScheduledTaskVO>(`/task/${param0}`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 删除定时任务接口 DELETE /task/${param0} */
export async function deleteDynamicScheduledTask(
  params: {
    // path
    /** 任务id */
    taskId: number;
  },
  options?: { [key: string]: any },
) {
  const { taskId: param0 } = params;
  return request<API.ResultBodyLong>(`/task/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 停止定时任务接口 GET /task/${param0}/stop */
export async function stopDynamicScheduledTask(
  params: {
    // path
    /** 任务id */
    taskId: number;
  },
  options?: { [key: string]: any },
) {
  const { taskId: param0 } = params;
  return request<API.ResultBodyObject>(`/task/${param0}/stop`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 开始定时任务接口 GET /task/${param0}/start */
export async function startDynamicScheduledTask(
  params: {
    // path
    /** 任务id */
    taskId: number;
  },
  options?: { [key: string]: any },
) {
  const { taskId: param0 } = params;
  return request<API.ResultBodyObject>(`/task/${param0}/start`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}

/** 运行定时任务接口 GET /task/${param0}/run */
export async function runDynamicScheduledTask(
  params: {
    // path
    /** 任务id */
    taskId: number;
  },
  options?: { [key: string]: any },
) {
  const { taskId: param0 } = params;
  return request<API.ResultBodyObject>(`/task/${param0}/run`, {
    method: 'GET',
    params: { ...params },
    responseType: '*/*',
    ...(options || {}),
  });
}
