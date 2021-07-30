export type DriverLicenseForm = {
  /** 主键ID */
  id: number;
  /** 关联ID */
  pid?: number;
  /** 准驾车型 */
  modal?: string;
  /** 证件号码 */
  number?: string;
  /** 获得日期 */
  obtainDate?: string;
  /** 有效期至 */
  expirationDate?: string;
  /** 内部驾照 */
  inside?: string;
  /** 内部驾照有效期 */
  insideExpirationDate?: string;
  /** 附件 */
  fileId?: number;
  /** 备注 */
  remarks?: string;
};

export type DriverLicenseVO = {
  /** 主键ID */
  id: number;
  /** 关联ID */
  pid?: number;
  /** 准驾车型 */
  modal?: string;
  /** 证件号码 */
  number?: string;
  /** 获得日期 */
  obtainDate?: string;
  /** 有效期至 */
  expirationDate?: string;
  /** 内部驾照 */
  inside?: string;
  /** 内部驾照有效期 */
  insideExpirationDate?: string;
  /** 附件 */
  fileId?: number;
  /** 备注 */
  remarks?: string;
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
