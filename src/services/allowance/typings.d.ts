export type AllowanceForm = {
  /** 主键ID */
  id?: number;
  /** 员工id */
  staffId?: number;
  /** 津贴月份 */
  month?: string;
  /** 补发工资 */
  backSalary?: number;
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
  /** 就餐补贴 */
  mealAllowance?: number;
  /** 交通补贴 */
  trafficAllowance?: number;
  /** 通讯补贴 */
  communicationAllowance?: number;
  /** 节日慰问金 */
  festivalAllowance?: number;
  /** 其他补贴 */
  otherAllowance?: number;
  /** 生日卡 */
  birthdayCard?: number;
  /** 清凉饮料 */
  coolDrink?: number;
  /** 慰问品 */
  condolenceGoods?: number;
  /** 房租 */
  rent?: number;
  /** 话费 */
  phoneBill?: number;
  /** 备注 */
  remarks?: string;
};

export type AllowanceVO = {
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
  /** 津贴月份 */
  month?: string;
  /** 补发工资 */
  backSalary?: number;
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
  /** 就餐补贴 */
  mealAllowance?: number;
  /** 交通补贴 */
  trafficAllowance?: number;
  /** 通讯补贴 */
  communicationAllowance?: number;
  /** 节日慰问金 */
  festivalAllowance?: number;
  /** 其他补贴 */
  otherAllowance?: number;
  /** 生日卡 */
  birthdayCard?: number;
  /** 清凉饮料 */
  coolDrink?: number;
  /** 慰问品 */
  condolenceGoods?: number;
  /** 房租 */
  rent?: number;
  /** 话费 */
  phoneBill?: number;
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
