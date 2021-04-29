export type WorkExperienceForm = {
  /** 主键ID */
  id: number;
  /** 关联id */
  pid: number;
  /** 工作单位 */
  workUnit?: string;
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 职务/岗位 */
  duty?: string;
  /** 单位性质 */
  unitType?: string;
  /** 月薪 */
  salary?: string;
  /** 证明人姓名 */
  witnessName?: string;
  /** 证明人电话 */
  witnessPhone?: string;
};

export type WorkExperienceVO = {
  /** 主键ID */
  id: number;
  /** 关联id */
  pid?: number;
  /** 工作单位 */
  workUnit?: string;
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 职务/岗位 */
  duty?: string;
  /** 单位性质 */
  unitType?: string;
  /** 月薪 */
  salary?: string;
  /** 证明人姓名 */
  witnessName?: string;
  /** 证明人电话 */
  witnessPhone?: string;
  /** 创建人 */
  createdBy?: number;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改时间 */
  lastModifiedDate?: string;
};
