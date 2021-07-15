export type PerformanceForm = {
  /** 主键ID */
  id: number;
  /** 员工id */
  staffId: number;
  /** 关联的考核季度id */
  performanceSettingId?: number;
  /** 考核年度 */
  year?: number;
  /** 考核季度 */
  quarter?: number;
  /** 考核等级 */
  appraise?: string;
  /** 备注 */
  remarks?: string;
};

export type PerformanceVO = {
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
  /** 考核年度 */
  year?: number;
  /** 考核季度 */
  quarter?: number;
  /** 考核等级 */
  appraise?: string;
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
