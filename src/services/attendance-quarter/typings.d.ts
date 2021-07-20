export type AttendanceQuarterForm = {
  /** 主键ID */
  id: number;
  /** 员工id */
  staffId: number;
  /** 考勤年度 */
  year?: number;
  /** 考勤季度 */
  quarter?: number;
  /** 应出勤天数 */
  shouldAttendanceDays?: number;
  /** 实出勤天数 */
  actualAttendanceDays?: number;
  /** 是否冻结 */
  freeze?: boolean;
  /** 备注 */
  remarks?: string;
};

export type AttendanceQuarterVO = {
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
  /** 考勤年度 */
  year?: number;
  /** 考勤季度 */
  quarter?: number;
  /** 应出勤天数 */
  shouldAttendanceDays?: number;
  /** 实出勤天数 */
  actualAttendanceDays?: number;
  /** 是否冻结 */
  freeze?: boolean;
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
