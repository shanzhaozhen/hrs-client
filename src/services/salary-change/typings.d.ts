export type SalaryChangeForm = {
  /** 主键ID */
  id: number;
  /** 员工id */
  staffId: number;
  /** 变更前基础工资 */
  preBasicSalary?: number;
  /** 变更后基础工资 */
  postBasicSalary?: number;
  /** 变更前岗位工资 */
  prePostSalary?: number;
  /** 变更后岗位工资 */
  postPostSalary?: number;
  /** 生效日期 */
  effectiveDate?: string;
  /** 是否已执行 */
  executed?: number;
  /** 备注 */
  remarks?: string;
};

export type SalaryChangeVO = {
  /** 主键ID */
  id?: number;
  /** 员工id */
  staffId?: number;
  /** 员工编号 */
  staffCode?: string;
  /** 员工姓名 */
  staffName?: string;
  /** 部门id */
  depId?: number;
  /** 变更前基础工资 */
  preBasicSalary?: number;
  /** 变更后基础工资 */
  postBasicSalary?: number;
  /** 变更前岗位工资 */
  prePostSalary?: number;
  /** 变更后岗位工资 */
  postPostSalary?: number;
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
