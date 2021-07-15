export type AttendanceForm = {
  /** 主键ID */
  id: number;
  /** 员工id */
  staffId: number;
  /** 考勤月份 */
  month?: string;
  /** 应出勤天数 */
  shouldAttendanceDays?: number;
  /** 实出勤天数 */
  actualAttendanceDays?: number;
  /** 旷工天数 */
  absenteeismDays?: number;
  /** 出差天数 */
  travelDays?: number;
  /** 外出天数 */
  outDays?: number;
  /** 迟到次数 */
  lateTimes?: number;
  /** 迟到分钟数 */
  lateMinutes?: number;
  /** 早退次数 */
  leaveEarlyTimes?: number;
  /** 早退分钟数 */
  leaveEarlyMinutes?: number;
  /** 缺卡次数 */
  cardMissTimes?: number;
  /** 签卡次数 */
  signCardTimes?: number;
  /** 平时加班时数 */
  overtimeWeekHours?: number;
  /** 周末加班时数 */
  overtimeWeekendHours?: number;
  /** 节日加班时数 */
  overtimeFestivalHours?: number;
  /** 年假天数 */
  annualLeaveDays?: number;
  /** 调休假天数 */
  compensatoryLeaveDays?: number;
  /** 计生假天数 */
  familyPlanningLeaveDays?: number;
  /** 产假天数 */
  maternityLeaveDays?: number;
  /** 节假日请假天数 */
  holidayLeaveDays?: number;
  /** 病假天数 */
  sickLeaveDays?: number;
  /** 事假天数 */
  absenceLeaveDays?: number;
  /** 特殊情况请假天数 */
  exceptionalCaseDays?: number;
  /** 工伤假天数 */
  injuryLeaveDays?: number;
  /** 婚假天数 */
  marriageLeaveDays?: number;
  /** 哺乳假天数 */
  lactationLeaveDays?: number;
  /** 独生子女父母陪护假天数 */
  onlyChildLeaveDays?: number;
  /** 看护假天数 */
  nursingLeave?: number;
  /** 丧假天数 */
  bereavementLeave?: number;
  /** 值班（工作日）天数 */
  dutyWeek?: number;
  /** 值班（休息日前一天）天数 */
  dutyBeforeWeek?: number;
  /** 值班（法定节假日前一天）天数 */
  dutyBeforeFestival?: number;
  /** 值班（休息日）天数 */
  dutyWeekend?: number;
  /** 值班（法定节假日（春节假期除外））天数 */
  dutyFestival?: number;
  /** 值班（春节假期（不含除夕、初一、初二））天数 */
  dutyOutSpring?: number;
  /** 值班（春节假期（除夕、初一、初二））天数 */
  dutyInSpring?: number;
  /** 备注 */
  remarks?: string;
};

export type AttendanceVO = {
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
  /** 考勤月份 */
  month?: string;
  /** 应出勤天数 */
  shouldAttendanceDays?: number;
  /** 实出勤天数 */
  actualAttendanceDays?: number;
  /** 旷工天数 */
  absenteeismDays?: number;
  /** 出差天数 */
  travelDays?: number;
  /** 外出天数 */
  outDays?: number;
  /** 迟到次数 */
  lateTimes?: number;
  /** 迟到分钟数 */
  lateMinutes?: number;
  /** 早退次数 */
  leaveEarlyTimes?: number;
  /** 早退分钟数 */
  leaveEarlyMinutes?: number;
  /** 缺卡次数 */
  cardMissTimes?: number;
  /** 签卡次数 */
  signCardTimes?: number;
  /** 平时加班时数 */
  overtimeWeekHours?: number;
  /** 周末加班时数 */
  overtimeWeekendHours?: number;
  /** 节日加班时数 */
  overtimeFestivalHours?: number;
  /** 年假天数 */
  annualLeaveDays?: number;
  /** 调休假天数 */
  compensatoryLeaveDays?: number;
  /** 计生假天数 */
  familyPlanningLeaveDays?: number;
  /** 产假天数 */
  maternityLeaveDays?: number;
  /** 节假日请假天数 */
  holidayLeaveDays?: number;
  /** 病假天数 */
  sickLeaveDays?: number;
  /** 事假天数 */
  absenceLeaveDays?: number;
  /** 特殊情况请假天数 */
  exceptionalCaseDays?: number;
  /** 工伤假天数 */
  injuryLeaveDays?: number;
  /** 婚假天数 */
  marriageLeaveDays?: number;
  /** 哺乳假天数 */
  lactationLeaveDays?: number;
  /** 独生子女父母陪护假天数 */
  onlyChildLeaveDays?: number;
  /** 看护假天数 */
  nursingLeave?: number;
  /** 丧假天数 */
  bereavementLeave?: number;
  /** 值班（工作日）天数 */
  dutyWeek?: number;
  /** 值班（休息日前一天）天数 */
  dutyBeforeWeek?: number;
  /** 值班（法定节假日前一天）天数 */
  dutyBeforeFestival?: number;
  /** 值班（休息日）天数 */
  dutyWeekend?: number;
  /** 值班（法定节假日（春节假期除外））天数 */
  dutyFestival?: number;
  /** 值班（春节假期（不含除夕、初一、初二））天数 */
  dutyOutSpring?: number;
  /** 值班（春节假期（除夕、初一、初二））天数 */
  dutyInSpring?: number;
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
