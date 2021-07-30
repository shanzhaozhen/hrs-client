export type QualificationForm = {
  /** 主键ID */
  id: number;
  /** 关联ID */
  staffId?: number;
  /** 职业资格 */
  qualification?: string;
  /** 职业 */
  profession?: string;
  /** 资格等级 */
  level?: string;
  /** 工种 */
  workType?: string;
  /** 证书编号 */
  number?: string;
  /** 获得日期 */
  obtainDate?: string;
  /** 评定机构 */
  issueCompany?: string;
  /** 是否最高 */
  highest?: string;
  /** 附件 */
  fileId?: number;
  /** 备注 */
  remarks?: string;
};

export type QualificationVO = {
  /** 主键ID */
  id: number;
  /** 关联ID */
  staffId?: number;
  /** 职业资格 */
  qualification?: string;
  /** 职业 */
  profession?: string;
  /** 资格等级 */
  level?: string;
  /** 工种 */
  workType?: string;
  /** 证书编号 */
  number?: string;
  /** 获得日期 */
  obtainDate?: string;
  /** 评定机构 */
  issueCompany?: string;
  /** 是否最高 */
  highest?: string;
  /** 附件 */
  fileId?: number;
  /** 备注 */
  remarks?: string;
};
