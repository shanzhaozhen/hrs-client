// @ts-ignore
import { request } from 'umi';
import type {Orders, Page, PageParams, ResultBody} from "@/services/common/typings";
import type {SalarySettingForm, SalarySettingVO} from "@/services/salary-setting/typings";

/** 获取薪资配置（分页） GET /salary-setting/page */
export async function getSalarySettingPage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<SalarySettingVO>>>('/hrs-api/salary-setting/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders,
    },
    ...(options || {}),
  });
}

/** 获取薪资配置（通过薪资配置id） GET /salary-setting/${salarySettingId} */
export async function getSalarySettingById(salarySettingId: number, options?: Record<string, any>) {
  return request<ResultBody<SalarySettingVO>>(`/hrs-api/salary-setting/${salarySettingId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取薪资配置（通过薪资配置id） GET /salary-setting/new */
export async function getSalarySettingNew(options?: Record<string, any>) {
  return request<ResultBody<SalarySettingVO>>('/hrs-api/salary-setting/new', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加薪资配置接口 POST /salarySetting */
export async function addSalarySetting(body: SalarySettingForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salarySetting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新薪资配置接口 PUT /salarySetting */
export async function updateSalarySetting(body: SalarySettingForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/hrs-api/salarySetting', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除薪资配置接口 DELETE /salary-setting/${salarySettingId} */
export async function deleteSalarySetting(salarySettingId: number, options?: Record<string, any>) {
  return request<ResultBody<number>>(`/hrs-api/salary-setting/${salarySettingId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


/** 批量删除薪资配置接口 DELETE /salarySetting */
export async function batchDeleteSalarySetting(body: (number | undefined)[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/hrs-api/salarySetting', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
