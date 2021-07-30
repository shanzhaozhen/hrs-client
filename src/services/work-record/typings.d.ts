export type WorkRecordForm = {
  /** 主键ID */
  id: number;
  /** 关联id */
  staffId?: number;
  /** 组织 */
  organization?: string;
  /** 人员类别 */
  category?: string;
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 部门 */
  department?: string;
  /** 岗位 */
  post?: string;
  /** 岗位序列 */
  postType?: string;
  /** 职务 */
  duty?: string;
  /** 职务类别 */
  dutyType?: string;
  /** 异动事件 */
  changeEvent?: string;
  /** 异动类型 */
  changeType?: string;
  /** 异动原因 */
  changeReason?: string;
  /** 试用 */
  trial?: string;
  /** 试用类型 */
  trialType?: string;
  /** 部门详情 */
  departmentDetails?: string;
  /** 备注 */
  remarks?: string;
};

export type WorkRecordVO = {
  /** 主键ID */
  id: number;
  /** 关联id */
  staffId?: number;
  /** 组织 */
  organization?: string;
  /** 人员类别 */
  category?: string;
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 部门 */
  department?: string;
  /** 岗位 */
  post?: string;
  /** 岗位序列 */
  postType?: string;
  /** 职务 */
  duty?: string;
  /** 职务类别 */
  dutyType?: string;
  /** 异动事件 */
  changeEvent?: string;
  /** 异动类型 */
  changeType?: string;
  /** 异动原因 */
  changeReason?: string;
  /** 试用 */
  trial?: string;
  /** 试用类型 */
  trialType?: string;
  /** 部门详情 */
  departmentDetails?: string;
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
