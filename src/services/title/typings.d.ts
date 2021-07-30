export type TitleForm = {
  /** 主键ID */
  id: number;
  /** 关联ID */
  staffId?: number;
  /** 职称 */
  title?: string;
  /** 职称等级 */
  level?: string;
  /** 证书编号 */
  number?: string;
  /** 评定日期 */
  evaluationDate?: string;
  /** 终止日期 */
  endDate?: string;
  /** 评定机构 */
  issueCompany?: string;
  /** 是否最高 */
  highest?: string;
  /** 附件 */
  fileId?: number;
  /** 备注 */
  remarks?: string;
};

export type TitleVO = {
  /** 主键ID */
  id: number;
  /** 关联ID */
  staffId?: number;
  /** 职称 */
  title?: string;
  /** 职称等级 */
  level?: string;
  /** 证书编号 */
  number?: string;
  /** 评定日期 */
  evaluationDate?: string;
  /** 终止日期 */
  endDate?: string;
  /** 评定机构 */
  issueCompany?: string;
  /** 是否最高 */
  highest?: string;
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
