export type PerformanceSettingForm = {
  /** 主键ID */
  id: number;
  /** 名称 */
  name?: string;
  /** 开始考核月份 */
  startMonth?: string;
  /** 结束考核月份 */
  endMonth?: string;
  /** 考核年度 */
  year?: number;
  /** 考核季度 */
  quarter?: number;
  /** 备注 */
  remarks?: string;
};

export type PerformanceSettingVO = {
  /** 主键ID */
  id?: number;
  /** 名称 */
  name?: string;
  /** 开始考核月份 */
  startMonth?: string;
  /** 结束考核月份 */
  endMonth?: string;
  /** 考核年度 */
  year?: number;
  /** 考核季度 */
  quarter?: number;
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
