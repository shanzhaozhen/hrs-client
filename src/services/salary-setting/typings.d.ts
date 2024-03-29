export type SalarySettingForm = {
  /** 主键ID */
  id: number;
  /** 公积金基数比例 */
  accumulationFundRate?: number;
  /** 养老保险基数比例 */
  endowmentInsuranceRate?: number;
  /** 失业保险基数比例 */
  unemploymentInsuranceRate?: number;
  /** 医疗保险基数比例 */
  medicalInsuranceRate?: number;
  /** 养老保险基数下限 */
  endowmentInsuranceLower?: number;
  /** 养老保险基数上限 */
  endowmentInsuranceUpper?: number;
  /** 失业保险基数下限 */
  unemploymentInsuranceLower?: number;
  /** 失业保险基数上限 */
  unemploymentInsuranceUpper?: number;
  /** 医疗保险基数下限 */
  medicalInsuranceLower?: number;
  /** 医疗保险基数上限 */
  medicalInsuranceUpper?: number;
  /** 绩效工资基数 */
  meritSalary?: number;
  /** 绩效A发放比例 */
  meritA?: number;
  /** 绩效B发放比例 */
  meritB?: number;
  /** 绩效C发放比例 */
  meritC?: number;
  /** 绩效D发放比例 */
  meritD?: number;
  /** 绩效E发放比例 */
  meritE?: number;
  /** 绩效F发放比例 */
  meritF?: number;
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
  /** 独生子女津贴标准（元/月） */
  oneChildAllowance?: number;
  /** 高温津贴开始生效月份 */
  hotWeatherStartMonth?: number;
  /** 高温津贴结束生效月份 */
  hotWeatherEndMonth?: number;
  /** 高温津贴A标准 */
  hotWeatherAllowanceA?: number;
  /** 高温津贴B标准 */
  hotWeatherAllowanceB?: number;
  /** 高温津贴C标准 */
  hotWeatherAllowanceC?: number;
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
  /** 加班费基数 */
  overtimeFees?: number;
  /** 加班费基数计算方式 */
  overtimeMode?: string;
  /** 备注 */
  remarks?: string;
};

export type SalarySettingVO = {
  /** 主键ID */
  id?: number;
  /** 公积金基数比例 */
  accumulationFundRate?: number;
  /** 养老保险基数比例 */
  endowmentInsuranceRate?: number;
  /** 失业保险基数比例 */
  unemploymentInsuranceRate?: number;
  /** 医疗保险基数比例 */
  medicalInsuranceRate?: number;
  /** 养老保险基数下限 */
  endowmentInsuranceLower?: number;
  /** 养老保险基数上限 */
  endowmentInsuranceUpper?: number;
  /** 失业保险基数下限 */
  unemploymentInsuranceLower?: number;
  /** 失业保险基数上限 */
  unemploymentInsuranceUpper?: number;
  /** 医疗保险基数下限 */
  medicalInsuranceLower?: number;
  /** 医疗保险基数上限 */
  medicalInsuranceUpper?: number;
  /** 绩效工资基数 */
  meritSalary?: number;
  /** 绩效A发放比例 */
  meritA?: number;
  /** 绩效B发放比例 */
  meritB?: number;
  /** 绩效C发放比例 */
  meritC?: number;
  /** 绩效D发放比例 */
  meritD?: number;
  /** 绩效E发放比例 */
  meritE?: number;
  /** 绩效F发放比例 */
  meritF?: number;
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
  /** 独生子女津贴标准（元/月） */
  oneChildAllowance?: number;
  /** 高温津贴开始生效月份 */
  hotWeatherStartMonth?: number;
  /** 高温津贴结束生效月份 */
  hotWeatherEndMonth?: number;
  /** 高温津贴A标准 */
  hotWeatherAllowanceA?: number;
  /** 高温津贴B标准 */
  hotWeatherAllowanceB?: number;
  /** 高温津贴C标准 */
  hotWeatherAllowanceC?: number;
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
  /** 加班费基数 */
  overtimeFees?: number;
  /** 加班费基数计算方式 */
  overtimeMode?: string;
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
