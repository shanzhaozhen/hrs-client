export type EducationalExperienceForm = {
  /** 主键ID */
  id?: number;
  /** 关联id */
  pid?: number;
  /** 学校 */
  schoolName?: string;
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** 学历 */
  education?: string;
  /** 专业 */
  major?: string;
  /** 学制 */
  studyYears?: number;
  /** 是否全日制 */
  fullTime?: boolean;
  /** 证明人姓名 */
  witnessName?: string;
  /** 证明人电话 */
  witnessPhone?: string;
};

export type EducationalExperienceVO = {
  /** 主键ID */
  id: number;
  /** 关联id */
  pid?: number;
  /** 学校 */
  schoolName?: string;
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** 学历 */
  education?: string;
  /** 专业 */
  major?: string;
  /** 学制 */
  studyYears?: number;
  /** 是否全日制 */
  fullTime?: boolean;
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
