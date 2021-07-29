export type SalaryForm = {
  /** 主键ID */
  id: number;
  /** 员工id */
  staffId: number;
  /** 发放月份 */
  month?: string;
  /** 发薪类型（工资、奖金） */
  type?: string;
  /** 岗位等级 */
  postLevel?: string;
  /** 考核等级 */
  appraise?: string;
  /** 是否冻结 */
  freeze?: boolean;
  /** 基础工资 */
  basicSalary?: number;
  /** 岗位工资 */
  postSalary?: number;
  /** 绩效工资 */
  meritSalary?: number;
  /** 病假工资 */
  sickSalary?: number;
  /** 补发工资 */
  backSalary?: number;
  /** 加班工资 */
  overtimeSalary?: number;
  /** 工资小计 */
  salarySubtotal?: number;
  /** 年终奖 */
  annualBonus?: number;
  /** 安全奖 */
  safetyBonus?: number;
  /** 综治奖 */
  stabilityBonus?: number;
  /** 计生奖 */
  familyPlanningBonus?: number;
  /** 先进奖 */
  excellenceBonus?: number;
  /** 专项奖 */
  specialBonus?: number;
  /** 奖金小计 */
  bonusSubtotal?: number;
  /** 独生子女津贴 */
  oneChildAllowance?: number;
  /** 高温津贴 */
  hotWeatherAllowance?: number;
  /** 全勤津贴 */
  fullAttendanceAllowance?: number;
  /** 夜班津贴 */
  nightShiftAllowance?: number;
  /** 值班补贴 */
  onDutyAllowance?: number;
  /** 就餐补贴 */
  mealAllowance?: number;
  /** 交通补贴 */
  trafficAllowance?: number;
  /** 节日慰问金 */
  festivalAllowance?: number;
  /** 安全岗岗位津贴 */
  safetyAllowance?: number;
  /** 其他 */
  otherAllowance?: number;
  /** 津贴小计 */
  allowanceSubtotal?: number;
  /** 扣病假工资 */
  sickLeaveDeduct?: number;
  /** 扣试用期/入离职结算 */
  entryExitDeduct?: number;
  /** 扣全勤 */
  fullAttendanceDeduct?: number;
  /** 扣季度绩效 */
  meritDeduct?: number;
  /** 税前扣款小计 */
  preTaxDeductSubtotal?: number;
  /** 生日卡 */
  birthdayCard?: number;
  /** 清凉饮料 */
  coolDrink?: number;
  /** 慰问品 */
  condolenceGoods?: number;
  /** 实物小计 */
  materialSubtotal?: number;
  /** 公积金 */
  accumulationFund?: number;
  /** 养老保险 */
  endowmentInsurance?: number;
  /** 失业保险 */
  unemploymentInsurance?: number;
  /** 医疗保险 */
  medicalInsurance?: number;
  /** 工会费 */
  unionFees?: number;
  /** 房租 */
  rent?: number;
  /** 话费 */
  phoneBill?: number;
  /** 个税 */
  individualIncomeTax?: number;
  /** 其他税后应扣 */
  otherAftTaxDeduct?: number;
  /** 税后应扣小计 */
  aftTaxDeductSubtotal?: number;
  /** 通讯补贴 */
  communicationAllowance?: number;
  /** 应发工资 */
  shouldSalary?: number;
  /** 计税收入 */
  preTaxSalary?: number;
  /** 实发工资 */
  actualSalary?: number;
  /** 备注 */
  remarks?: string;
};

export type SalaryVO = {
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
  /** 发放月份 */
  month?: string;
  /** 发薪类型（工资、奖金） */
  type?: string;
  /** 岗位等级 */
  postLevel?: string;
  /** 考核等级 */
  appraise?: string;
  /** 是否冻结 */
  freeze?: boolean;
  /** 基础工资 */
  basicSalary?: number;
  /** 岗位工资 */
  postSalary?: number;
  /** 绩效工资 */
  meritSalary?: number;
  /** 病假工资 */
  sickSalary?: number;
  /** 补发工资 */
  backSalary?: number;
  /** 加班工资 */
  overtimeSalary?: number;
  /** 工资小计 */
  salarySubtotal?: number;
  /** 年终奖 */
  annualBonus?: number;
  /** 安全奖 */
  safetyBonus?: number;
  /** 综治奖 */
  stabilityBonus?: number;
  /** 计生奖 */
  familyPlanningBonus?: number;
  /** 先进奖 */
  excellenceBonus?: number;
  /** 专项奖 */
  specialBonus?: number;
  /** 奖金小计 */
  bonusSubtotal?: number;
  /** 独生子女津贴 */
  oneChildAllowance?: number;
  /** 高温津贴 */
  hotWeatherAllowance?: number;
  /** 全勤津贴 */
  fullAttendanceAllowance?: number;
  /** 夜班津贴 */
  nightShiftAllowance?: number;
  /** 值班补贴 */
  onDutyAllowance?: number;
  /** 就餐补贴 */
  mealAllowance?: number;
  /** 交通补贴 */
  trafficAllowance?: number;
  /** 节日慰问金 */
  festivalAllowance?: number;
  /** 安全岗岗位津贴 */
  safetyAllowance?: number;
  /** 其他 */
  otherAllowance?: number;
  /** 津贴小计 */
  allowanceSubtotal?: number;
  /** 扣病假工资 */
  sickLeaveDeduct?: number;
  /** 扣试用期/入离职结算 */
  entryExitDeduct?: number;
  /** 扣全勤 */
  fullAttendanceDeduct?: number;
  /** 扣季度绩效 */
  meritDeduct?: number;
  /** 税前扣款小计 */
  preTaxDeductSubtotal?: number;
  /** 生日卡 */
  birthdayCard?: number;
  /** 清凉饮料 */
  coolDrink?: number;
  /** 慰问品 */
  condolenceGoods?: number;
  /** 实物小计 */
  materialSubtotal?: number;
  /** 公积金 */
  accumulationFund?: number;
  /** 养老保险 */
  endowmentInsurance?: number;
  /** 失业保险 */
  unemploymentInsurance?: number;
  /** 医疗保险 */
  medicalInsurance?: number;
  /** 工会费 */
  unionFees?: number;
  /** 房租 */
  rent?: number;
  /** 话费 */
  phoneBill?: number;
  /** 个税 */
  individualIncomeTax?: number;
  /** 其他税后应扣 */
  otherAftTaxDeduct?: number;
  /** 税后应扣小计 */
  aftTaxDeductSubtotal?: number;
  /** 通讯补贴 */
  communicationAllowance?: number;
  /** 应发工资 */
  shouldSalary?: number;
  /** 计税收入 */
  preTaxSalary?: number;
  /** 实发工资 */
  actualSalary?: number;
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
