export type SalaryStaffForm = {
  /** 主键ID */
  id: number;
  /** 员工id */
  staffId: number;
  /** 基础工资 */
  basicSalary?: number;
  /** 岗位工资 */
  postSalary?: number;
};

export type SalaryStaffVO = {
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
  /** 基础工资 */
  basicSalary?: number;
  /** 岗位工资 */
  postSalary?: number;
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
