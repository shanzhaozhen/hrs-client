export type ContractForm = {
  /** 主键ID */
  id: number;
  /** 关联id */
  staffId?: number;
  /** 合同名称 */
  name?: string;
  /** 合同编号 */
  number?: string;
  /** 业务类型 */
  type?: string;
  /** 业务发生日期 */
  occurrenceDate?: string;
  /** 合同期限类型 */
  periodType?: string;
  /** 合同期限 */
  period?: number;
  /** 合同期限单位 */
  periodUnit?: string;
  /** 合同开始日期 */
  startDate?: string;
  /** 合同结束日期 */
  endDate?: string;
  /** 是否需要试用 */
  hasProbation?: string;
  /** 试用期限 */
  probationTerm?: number;
  /** 试用期限单位 */
  probationTermUnit?: number;
  /** 试用开始日期 */
  probationStartDate?: string;
  /** 试用结束日期 */
  probationEndDate?: string;
  /** 合同主体单位 */
  company?: string;
  /** 业务发生组织 */
  organization?: string;
  /** 附件ID */
  fileId?: number;
  /** 备注 */
  remarks?: string;
};

export type ContractVO = {
  /** 主键ID */
  id: number;
  /** 关联id */
  staffId?: number;
  /** 合同名称 */
  name?: string;
  /** 合同编号 */
  number?: string;
  /** 业务类型 */
  type?: string;
  /** 业务发生日期 */
  occurrenceDate?: string;
  /** 合同期限类型 */
  periodType?: string;
  /** 合同期限 */
  period?: number;
  /** 合同期限单位 */
  periodUnit?: string;
  /** 合同开始日期 */
  startDate?: string;
  /** 合同结束日期 */
  endDate?: string;
  /** 是否需要试用 */
  hasProbation?: string;
  /** 试用期限 */
  probationTerm?: number;
  /** 试用期限单位 */
  probationTermUnit?: number;
  /** 试用开始日期 */
  probationStartDate?: string;
  /** 试用结束日期 */
  probationEndDate?: string;
  /** 合同主体单位 */
  company?: string;
  /** 业务发生组织 */
  organization?: string;
  /** 附件ID */
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
