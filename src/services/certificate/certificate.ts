// @ts-ignore
import { request } from 'umi';
import type {Page, ResultBody } from "@/services/common/typings";
import type {CertificateForm, CertificateVO} from "@/services/certificate/typings";
import type { Orders, PageParams } from "@/services/common/typings";

/** 更新证书接口 PUT /certificate */
export async function updateCertificate(body: CertificateForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/certificate', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加证书接口 POST /certificate */
export async function addCertificate(body: API.CertificateForm, options?: Record<string, any>) {
  return request<ResultBody<number>>('/certificate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除证书接口 DELETE /certificate */
export async function batchDeleteCertificate(body: number[], options?: Record<string, any>) {
  return request<ResultBody<number[]>>('/certificate', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取证书（通过证书id） GET /certificate/${certificateId} */
export async function getCertificateById(certificateId: number, options?: Record<string, any>) {
  return request<ResultBody<CertificateVO>>(`/certificate/${certificateId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除证书接口 DELETE /certificate/${certificateId} */
export async function deleteCertificate(certificateId: number, options?: Record<string, any>) {
  return request<number>(`/certificate/${certificateId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取证书（通过证书id） GET /certificate/pid/${pid} */
export async function getCertificateListByPid(pid: number, options?: Record<string, any>) {
  return request<ResultBody<CertificateVO[]>>(`/certificate/pid/${pid}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取证书（分页） GET /certificate/page */
export async function getCertificatePage(pageParams: PageParams, orders?: Orders | undefined | null, options?: Record<string, any>) {
  return request<ResultBody<Page<CertificateVO>>>('/certificate/page', {
    method: 'GET',
    params: {
      ...pageParams,
      ...orders
    },
    ...(options || {}),
  });
}
