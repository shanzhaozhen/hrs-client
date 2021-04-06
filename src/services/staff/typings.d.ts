export type StaffForm = {
  /** 主键ID */
  id: number;
  /** 员工编号 */
  staffCode?: string;
  /** 员工姓名 */
  staffName?: string;
  /** 部门ID */
  depId?: number;
  /** 在司状态 */
  companyState?: string;
  /** 职务 */
  duty?: string;
  /** 岗位 */
  post?: string;
  /** 岗位类型 */
  postType?: string;
  /** 性别 */
  sex?: number;
  /** 民族 */
  nation?: string;
  /** 出生日期 */
  birthday?: string;
  /** 开始工作时间 */
  workDate?: string;
  /** 入职日期 */
  entryDate?: string;
  /** 政治面貌 */
  politics?: string;
  /** 最高学历 */
  education?: string;
  /** 学位 */
  degree?: string;
  /** 婚姻状况 */
  maritalStatus?: string;
  /** 配偶名字 */
  spouseName?: string;
  /** 结婚证件 */
  marriageCertificate?: string;
  /** 结婚日期 */
  marriageDate?: string;
  /** 子女人数 */
  childrenNumber?: number;
  /** 身份证号码 */
  idNumber?: string;
  /** 联系电话 */
  phone?: string;
  /** 社保号 */
  socialSecurityNumber?: string;
  /** 出生地(省) */
  birthAddressProvince?: string;
  /** 出生地(市) */
  birthAddressCity?: string;
  /** 籍贯(省) */
  nativeAddressProvince?: string;
  /** 籍贯(市) */
  nativeAddressCity?: string;
  /** 户口类型 */
  householdType?: string;
  /** 户口地址(省) */
  registeredAddressProvince?: string;
  /** 户口地址(市) */
  registeredAddressCity?: string;
  /** 户口地址(区) */
  registeredAddressArea?: string;
  /** 户口地址(市) */
  registeredAddressDetail?: string;
  /** 家庭住址(省) */
  homeAddressProvince?: string;
  /** 家庭住址(市) */
  homeAddressCity?: string;
  /** 家庭住址(区) */
  homeAddressArea?: string;
  /** 家庭住址(详细) */
  homeAddressDetail?: string;
  /** 现住地址(省) */
  currentAddressProvince?: string;
  /** 现住地址(市) */
  currentAddressCity?: string;
  /** 现住地址(区) */
  currentAddressArea?: string;
  /** 现住地址(详细) */
  currentAddressDetail?: string;
  /** 邮递地址(省) */
  postalAddressProvince?: string;
  /** 邮递地址(市) */
  postalAddressCity?: string;
  /** 邮递地址(区) */
  postalAddressArea?: string;
  /** 邮递地址(详细) */
  postalAddressDetail?: string;
  /** 紧急联系人姓名 */
  contactName?: string;
  /** 紧急联系人关系 */
  contactRelation?: string;
  /** 紧急联系人电话 */
  contactPhone?: string;
};

export type StaffVO = {
  /** 创建人 */
  createdBy?: number;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改时间 */
  lastModifiedDate?: string;
  /** 主键ID */
  id?: number;
  /** 员工编号 */
  staffCode?: string;
  /** 员工姓名 */
  staffName?: string;
  /** 部门ID */
  depId?: number;
  /** 在司状态 */
  companyState?: string;
  /** 职务 */
  duty?: string;
  /** 岗位 */
  post?: string;
  /** 岗位类型 */
  postType?: string;
  /** 性别 */
  sex?: number;
  /** 民族 */
  nation?: string;
  /** 出生日期 */
  birthday?: string;
  /** 开始工作时间 */
  workDate?: string;
  /** 入职日期 */
  entryDate?: string;
  /** 政治面貌 */
  politics?: string;
  /** 最高学历 */
  education?: string;
  /** 学位 */
  degree?: string;
  /** 婚姻状况 */
  maritalStatus?: string;
  /** 配偶名字 */
  spouseName?: string;
  /** 结婚证件 */
  marriageCertificate?: string;
  /** 结婚日期 */
  marriageDate?: string;
  /** 子女人数 */
  childrenNumber?: number;
  /** 身份证号码 */
  idNumber?: string;
  /** 联系电话 */
  phone?: string;
  /** 社保号 */
  socialSecurityNumber?: string;
  /** 出生地(省) */
  birthAddressProvince?: string;
  /** 出生地(市) */
  birthAddressCity?: string;
  /** 籍贯(省) */
  nativeAddressProvince?: string;
  /** 籍贯(市) */
  nativeAddressCity?: string;
  /** 户口类型 */
  householdType?: string;
  /** 户口地址(省) */
  registeredAddressProvince?: string;
  /** 户口地址(市) */
  registeredAddressCity?: string;
  /** 户口地址(区) */
  registeredAddressArea?: string;
  /** 户口地址(市) */
  registeredAddressDetail?: string;
  /** 家庭住址(省) */
  homeAddressProvince?: string;
  /** 家庭住址(市) */
  homeAddressCity?: string;
  /** 家庭住址(区) */
  homeAddressArea?: string;
  /** 家庭住址(详细) */
  homeAddressDetail?: string;
  /** 现住地址(省) */
  currentAddressProvince?: string;
  /** 现住地址(市) */
  currentAddressCity?: string;
  /** 现住地址(区) */
  currentAddressArea?: string;
  /** 现住地址(详细) */
  currentAddressDetail?: string;
  /** 邮递地址(省) */
  postalAddressProvince?: string;
  /** 邮递地址(市) */
  postalAddressCity?: string;
  /** 邮递地址(区) */
  postalAddressArea?: string;
  /** 邮递地址(详细) */
  postalAddressDetail?: string;
  /** 紧急联系人姓名 */
  contactName?: string;
  /** 紧急联系人关系 */
  contactRelation?: string;
  /** 紧急联系人电话 */
  contactPhone?: string;
};
