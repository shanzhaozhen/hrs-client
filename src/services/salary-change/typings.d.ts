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
  /** 变更前公积金基数 */
  preAccumulationFund?: number;
  /** 变更后公积金基数 */
  postAccumulationFund?: number;
  /** 变更前是否享有独生子女津贴 */
  preHaveOneChildAllowance?: boolean;
  /** 变更后是否享有独生子女津贴 */
  postHaveOneChildAllowance?: boolean;
  /** 变更前安全津贴档次 */
  preSafetyGrade?: string;
  /** 变更后安全津贴档次 */
  postSafetyGrade?: string;
  /** 变更前高温津贴档次 */
  preHotWeatherGrade?: string;
  /** 变更后高温津贴档次 */
  postHotWeatherGrade?: string;
  /** 生效日期 */
  effectiveDate?: string;
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
  /** 部门ID */
  depId?: number;
  /** 变更前基础工资 */
  preBasicSalary?: number;
  /** 变更后基础工资 */
  postBasicSalary?: number;
  /** 变更前岗位工资 */
  prePostSalary?: number;
  /** 变更后岗位工资 */
  postPostSalary?: number;
  /** 变更前公积金基数 */
  preAccumulationFund?: number;
  /** 变更后公积金基数 */
  postAccumulationFund?: number;
  /** 变更前是否享有独生子女津贴 */
  preHaveOneChildAllowance?: boolean;
  /** 变更后是否享有独生子女津贴 */
  postHaveOneChildAllowance?: boolean;
  /** 变更前安全津贴档次 */
  preSafetyGrade?: string;
  /** 变更后安全津贴档次 */
  postSafetyGrade?: string;
  /** 变更前高温津贴档次 */
  preHotWeatherGrade?: string;
  /** 变更后高温津贴档次 */
  postHotWeatherGrade?: string;
  /** 生效日期 */
  effectiveDate?: string;
  /** 变更日期 */
  changeDate?: string;
  /** 是否已执行 */
  executed?: boolean;
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
