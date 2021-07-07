export type StaffChangeForm = {
  /** 主键ID */
  id?: number;
  /** 员工id */
  staffId?: number;
  /** 变更前部门id */
  preDepId?: number;
  /** 变更后部门id */
  postDepId?: number;
  /** 变更前职务 */
  preDuty?: string;
  /** 变更后职务 */
  postDuty?: string;
  /** 变更前岗位 */
  prePost?: string;
  /** 变更后岗位 */
  postPost?: string;
  /** 变更前岗位类型 */
  prePostType?: string;
  /** 变更后岗位类型 */
  postPostType?: string;
  /** 变更前岗位等级 */
  prePostLevel?: string;
  /** 变更后岗位等级 */
  postPostLevel?: string;
  /** 生效日期 */
  effectiveDate?: string;
  /** 是否已执行 */
  executed?: number;
  /** 备注 */
  remarks?: string;
};

export type StaffChangeVO = {
  /** 主键ID */
  id?: number;
  /** 员工id */
  staffId?: number;
  /** 员工编号 */
  staffCode?: string;
  /** 员工姓名 */
  staffName?: string;
  /** 变更前部门id */
  preDepId?: number;
  /** 变更后部门id */
  postDepId?: number;
  /** 变更前职务 */
  preDuty?: string;
  /** 变更后职务 */
  postDuty?: string;
  /** 变更前岗位 */
  prePost?: string;
  /** 变更后岗位 */
  postPost?: string;
  /** 变更前岗位类型 */
  prePostType?: string;
  /** 变更后岗位类型 */
  postPostType?: string;
  /** 变更前岗位等级 */
  prePostLevel?: string;
  /** 变更后岗位等级 */
  postPostLevel?: string;
  /** 生效日期 */
  effectiveDate?: string;
  /** 是否已执行 */
  executed?: number;
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
