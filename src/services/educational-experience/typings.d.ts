export type EducationalExperienceForm = {
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
  /** 专业 */
  major?: string;
  /** 学制 */
  studyYears?: number;
  /** 学习方式 */
  style?: string;
  /** 学历 */
  education?: string;
  /** 学位 */
  degree?: string;
  /** 学位授予日期 */
  degreeDate?: string;
  /** 学位授予单位 */
  degreeCompany?: string;
  /** 学历证书编号 */
  educationNumber?: string;
  /** 学位证书编号 */
  degreeNumber?: string;
  /** 是否最高学历 */
  isHighestEducation?: string;
  /** 入职学历 */
  entryEducation?: string;
  /** 是否入职学历 */
  isEntryEducation?: string;
  /** 证明人姓名 */
  witnessName?: string;
  /** 证明人电话 */
  witnessPhone?: string;
  /** 备注 */
  remarks?: string;
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
  /** 专业 */
  major?: string;
  /** 学制 */
  studyYears?: number;
  /** 学习方式 */
  style?: string;
  /** 学历 */
  education?: string;
  /** 学位 */
  degree?: string;
  /** 学位授予日期 */
  degreeDate?: string;
  /** 学位授予单位 */
  degreeCompany?: string;
  /** 学历证书编号 */
  educationNumber?: string;
  /** 学位证书编号 */
  degreeNumber?: string;
  /** 是否最高学历 */
  isHighestEducation?: string;
  /** 入职学历 */
  entryEducation?: string;
  /** 是否入职学历 */
  isEntryEducation?: string;
  /** 证明人姓名 */
  witnessName?: string;
  /** 证明人电话 */
  witnessPhone?: string;
  /** 备注 */
  remarks?: string;
  /** 创建人 */
  createdBy?: number;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改时间 */
  lastModifiedDate?: string;
};
