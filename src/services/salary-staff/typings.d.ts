export type SalaryStaffForm = {
  /** 主键ID */
  id: number;
  /** 员工ID */
  staffId: number;
  /** 基础工资 */
  basicSalary?: number;
  /** 岗位工资 */
  postSalary?: number;
  /** 公积金基数 */
  accumulationFund?: number;
  /** 是否享有独生子女津贴 */
  haveOneChildAllowance?: boolean;
  /** 安全津贴档次 */
  safetyAllowance?: string;
  /** 高温津贴档次 */
  hotWeatherAllowance?: string;
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
  /** 部门ID */
  depId?: number;
  /** 基础工资 */
  basicSalary?: number;
  /** 岗位工资 */
  postSalary?: number;
  /** 公积金基数 */
  accumulationFund?: number;
  /** 是否享有独生子女津贴 */
  haveOneChildAllowance?: boolean;
  /** 安全津贴档次 */
  safetyGrade?: string;
  /** 高温津贴档次 */
  hotWeatherGrade?: string;
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
