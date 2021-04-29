export type CertificateForm = {
  /** 主键ID */
  id: number;
  /** 关联id */
  pid?: number;
  /** 证件名称 */
  name?: string;
  /** 证件类型 */
  type?: string;
  /** 证件号 */
  number?: string;
  /** 取证日期 */
  obtainDate?: string;
  /** 发证单位 */
  issueUnit?: string;
};

export type CertificateVO = {
  /** 主键ID */
  id: number;
  /** 关联id */
  pid?: number;
  /** 证件名称 */
  name?: string;
  /** 证件类型 */
  type?: string;
  /** 证件号 */
  number?: string;
  /** 取证日期 */
  obtainDate?: string;
  /** 发证单位 */
  issueUnit?: string;
  /** 创建人 */
  createdBy?: number;
  /** 创建人名称 */
  createdByName?: string;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改人名称 */
  lastModifiedByName?: string;
  /** 修改时间 */
  lastModifiedDate?: string;
};
