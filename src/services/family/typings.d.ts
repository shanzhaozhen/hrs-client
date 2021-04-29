export type FamilyForm = {
  /** 主键ID */
  id: number;
  /** 关联id */
  pid?: number;
  /** 姓名 */
  name?: string;
  /** 关系 */
  relation?: string;
  /** 出生日期 */
  birthday?: string;
  /** 政治面貌 */
  politics?: string;
  /** 工作单位 */
  workUnit?: string;
  /** 职务 */
  duty?: string;
  /** 移动电话 */
  mobilePhone?: string;
  /** 固话 */
  landlinePhone?: string;
};

export type FamilyVO = {
  /** 主键ID */
  id: number;
  /** 关联id */
  pid?: number;
  /** 姓名 */
  name?: string;
  /** 关系 */
  relation?: string;
  /** 出生日期 */
  birthday?: string;
  /** 政治面貌 */
  politics?: string;
  /** 工作单位 */
  workUnit?: string;
  /** 职务 */
  duty?: string;
  /** 移动电话 */
  mobilePhone?: string;
  /** 固话 */
  landlinePhone?: string;
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
