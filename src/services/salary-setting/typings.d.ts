export type SalarySettingForm = {
  /** 主键ID */
  id: number;
  /** 加班费基数 */
  overTimeBase?: number;
  /** 全勤津贴标准（元/月） */
  fullAttendanceAllowance?: number;
  /** 就餐补贴（元/月） */
  mealAllowance?: number;
  /** 交通补贴（自行到达）A（元/月） */
  trafficAllowanceOwnA?: number;
  /** 交通补贴（自行到达）B（元/月） */
  trafficAllowanceOwnB?: number;
  /** 交通补贴（自行到达）C（元/月） */
  trafficAllowanceOwnC?: number;
  /** 交通补贴（乘坐接驳车）A（元/月） */
  trafficAllowanceBusA?: number;
  /** 交通补贴（乘坐接驳车）B（元/月） */
  trafficAllowanceBusB?: number;
  /** 交通补贴（乘坐接驳车）C（元/月） */
  trafficAllowanceBusC?: number;
  /** 安全岗岗位津贴A */
  safetyAllowanceA?: number;
  /** 安全岗岗位津贴B */
  safetyAllowanceB?: number;
  /** 安全岗岗位津贴C */
  safetyAllowanceC?: number;
  /** 独生子女津贴标准（元/天） */
  oneChildAllowance?: number;
  /** 高温津贴开始生效月份 */
  highTemperatureStartDate?: string;
  /** 高温津贴结束生效月份 */
  highTemperatureEndDate?: string;
  /** 高温津贴A标准 */
  highTemperatureAllowanceA?: number;
  /** 高温津贴B标准 */
  highTemperatureAllowanceB?: number;
  /** 高温津贴C标准 */
  highTemperatureAllowanceC?: number;
  /** 值班费（工作日）（元/天） */
  dutyWeekFee?: number;
  /** 值班费（休息日前一天）（元/天） */
  dutyBeforeWeekFee?: number;
  /** 值班费（法定节假日前一天）（元/天） */
  dutyBeforeFestivalFee?: number;
  /** 值班费（休息日）（元/天） */
  dutyWeekendFee?: number;
  /** 值班费（法定节假日（春节假期除外））（元/天） */
  dutyFestivalFee?: number;
  /** 值班费（春节假期（不含除夕、初一、初二））（元/天） */
  dutyOutSpringFee?: number;
  /** 值班费（春节假期（除夕、初一、初二））（元/天） */
  dutyInSpringFee?: number;
  /** 工会费 */
  unionFees?: number;
  /** 备注 */
  remarks?: string;
};

export type SalarySettingVO = {
  /** 主键ID */
  id?: number;
  /** 加班费基数 */
  overTimeBase?: number;
  /** 全勤津贴标准（元/月） */
  fullAttendanceAllowance?: number;
  /** 就餐补贴（元/月） */
  mealAllowance?: number;
  /** 交通补贴（自行到达）A（元/月） */
  trafficAllowanceOwnA?: number;
  /** 交通补贴（自行到达）B（元/月） */
  trafficAllowanceOwnB?: number;
  /** 交通补贴（自行到达）C（元/月） */
  trafficAllowanceOwnC?: number;
  /** 交通补贴（乘坐接驳车）A（元/月） */
  trafficAllowanceBusA?: number;
  /** 交通补贴（乘坐接驳车）B（元/月） */
  trafficAllowanceBusB?: number;
  /** 交通补贴（乘坐接驳车）C（元/月） */
  trafficAllowanceBusC?: number;
  /** 安全岗岗位津贴A */
  safetyAllowanceA?: number;
  /** 安全岗岗位津贴B */
  safetyAllowanceB?: number;
  /** 安全岗岗位津贴C */
  safetyAllowanceC?: number;
  /** 独生子女津贴标准（元/天） */
  oneChildAllowance?: number;
  /** 高温津贴开始生效月份 */
  highTemperatureStartDate?: string;
  /** 高温津贴结束生效月份 */
  highTemperatureEndDate?: string;
  /** 高温津贴A标准 */
  highTemperatureAllowanceA?: number;
  /** 高温津贴B标准 */
  highTemperatureAllowanceB?: number;
  /** 高温津贴C标准 */
  highTemperatureAllowanceC?: number;
  /** 值班费（工作日）（元/天） */
  dutyWeekFee?: number;
  /** 值班费（休息日前一天）（元/天） */
  dutyBeforeWeekFee?: number;
  /** 值班费（法定节假日前一天）（元/天） */
  dutyBeforeFestivalFee?: number;
  /** 值班费（休息日）（元/天） */
  dutyWeekendFee?: number;
  /** 值班费（法定节假日（春节假期除外））（元/天） */
  dutyFestivalFee?: number;
  /** 值班费（春节假期（不含除夕、初一、初二））（元/天） */
  dutyOutSpringFee?: number;
  /** 值班费（春节假期（除夕、初一、初二））（元/天） */
  dutyInSpringFee?: number;
  /** 工会费 */
  unionFees?: number;
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
