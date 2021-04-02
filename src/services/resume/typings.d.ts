export type ResumeForm = {
  /** 主键ID */
  id: number;
  /** 姓名 */
  name?: string;
  /** 性别 */
  sex?: number;
  /** 民族 */
  nation?: string;
  /** 籍贯(省) */
  nativeAddressProvince?: string;
  /** 籍贯(市) */
  nativeAddressCity?: string;
  /** 身份证号码 */
  idNumber?: string;
  /** 出生日期 */
  birthday?: string;
  /** 出生地(省) */
  birthAddressProvince?: string;
  /** 出生地(市) */
  birthAddressCity?: string;
  /** 政治面貌 */
  politics?: string;
  /** 最高学历 */
  education?: string;
  /** 学位 */
  degree?: string;
  /** 婚姻状况 */
  maritalStatus?: string;
  /** 联系电话 */
  phone?: string;
  /** 生育情况 */
  fertility?: string;
  /** 子女人数 */
  childrenNumber?: number;
  /** 邮箱 */
  email?: string;
  /** 应聘途径 */
  applyFor?: string;
  /** qq */
  qq?: string;
  /** 户口类型 */
  householdType?: string;
  /** 户口地址(省) */
  registeredAddressProvince?: string;
  /** 户口地址(市) */
  registeredAddressCity?: string;
  /** 户口地址(区) */
  registeredAddressArea?: string;
  /** 户口地址(详情) */
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
  /** 期望月薪 */
  expectedSalary?: string;
  /** 希望服务年限 */
  serviceYears?: string;
  /** 职称 */
  title?: string;
  /** 特长 */
  specialty?: string;
  /** 爱好 */
  hobby?: string;
  /** 紧急联系人 */
  contactName?: string;
  /** 紧急联系人关系 */
  contactRelation?: string;
  /** 紧急联系人电话 */
  contactPhone?: string;
  /** 亲友姓名 */
  friendName?: string;
  /** 亲友关系 */
  friendRelation?: string;
  /** 亲友部门 */
  friendDepartment?: string;
  /** 亲友职务 */
  friendDuty?: string;
  /** 父母赡养情况 */
  parentalSupport?: string;
  /** 本人身体状况 */
  physicalCondition?: string;
  /** 体重kg */
  weight?: number;
  /** 身高cm */
  height?: number;
  /** 视力 */
  vision?: string;
  /** 血型 */
  bloodType?: string;
  /** 遗传病史或传染病 */
  medicalHistory?: string;
  /** 结婚日期 */
  marriageDate?: string;
  /** 配偶学历 */
  spouseEducation?: string;
  /** 配偶身体状况 */
  spousePhysicalCondition?: string;
  /** 部队驻扎地 */
  troopBase?: string;
  /** 入伍时间 */
  enlistmentDate?: string;
  /** 退伍时间 */
  dischargeDate?: string;
  /** 退伍时军衔 */
  dischargeRank?: string;
  /** 立功 */
  honour?: string;
  /** 驾驶证类型 */
  driverLicenseType?: string;
  /** 驾驶证领证时间 */
  driverLicenseDate?: string;
  /** 驾龄 */
  driveYear?: number;
  /** 熟悉的驾驶路线 */
  driveLines?: string;
  /** 驾驶车种 */
  vehicleType?: string;
  /** 是否愿意加入人才库 */
  willJoin?: boolean;
};

export type ResumeVO = {
  /** 主键ID */
  id?: number;
  /** 姓名 */
  name?: string;
  /** 性别 */
  sex?: number;
  /** 民族 */
  nation?: string;
  /** 籍贯(省) */
  nativeAddressProvince?: string;
  /** 籍贯(市) */
  nativeAddressCity?: string;
  /** 身份证号码 */
  idNumber?: string;
  /** 出生日期 */
  birthday?: string;
  /** 出生地(省) */
  birthAddressProvince?: string;
  /** 出生地(市) */
  birthAddressCity?: string;
  /** 政治面貌 */
  politics?: string;
  /** 最高学历 */
  education?: string;
  /** 学位 */
  degree?: string;
  /** 婚姻状况 */
  maritalStatus?: string;
  /** 联系电话 */
  phone?: string;
  /** 生育情况 */
  fertility?: string;
  /** 子女人数 */
  childrenNumber?: number;
  /** 邮箱 */
  email?: string;
  /** 应聘途径 */
  applyFor?: string;
  /** qq */
  qq?: string;
  /** 户口类型 */
  householdType?: string;
  /** 户口地址(省) */
  registeredAddressProvince?: string;
  /** 户口地址(市) */
  registeredAddressCity?: string;
  /** 户口地址(区) */
  registeredAddressArea?: string;
  /** 户口地址(详情) */
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
  /** 期望月薪 */
  expectedSalary?: string;
  /** 希望服务年限 */
  serviceYears?: string;
  /** 职称 */
  title?: string;
  /** 特长 */
  specialty?: string;
  /** 爱好 */
  hobby?: string;
  /** 紧急联系人 */
  contactName?: string;
  /** 紧急联系人关系 */
  contactRelation?: string;
  /** 紧急联系人电话 */
  contactPhone?: string;
  /** 亲友姓名 */
  friendName?: string;
  /** 亲友关系 */
  friendRelation?: string;
  /** 亲友部门 */
  friendDepartment?: string;
  /** 亲友职务 */
  friendDuty?: string;
  /** 父母赡养情况 */
  parentalSupport?: string;
  /** 本人身体状况 */
  physicalCondition?: string;
  /** 体重kg */
  weight?: number;
  /** 身高cm */
  height?: number;
  /** 视力 */
  vision?: string;
  /** 血型 */
  bloodType?: string;
  /** 遗传病史或传染病 */
  medicalHistory?: string;
  /** 结婚日期 */
  marriageDate?: string;
  /** 配偶学历 */
  spouseEducation?: string;
  /** 配偶身体状况 */
  spousePhysicalCondition?: string;
  /** 部队驻扎地 */
  troopBase?: string;
  /** 入伍时间 */
  enlistmentDate?: string;
  /** 退伍时间 */
  dischargeDate?: string;
  /** 退伍时军衔 */
  dischargeRank?: string;
  /** 立功 */
  honour?: string;
  /** 驾驶证类型 */
  driverLicenseType?: string;
  /** 驾驶证领证时间 */
  driverLicenseDate?: string;
  /** 驾龄 */
  driveYear?: number;
  /** 熟悉的驾驶路线 */
  driveLines?: string;
  /** 驾驶车种 */
  vehicleType?: string;
  /** 是否愿意加入人才库 */
  willJoin?: boolean;
  /** 创建人 */
  createdBy?: number;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改时间 */
  lastModifiedDate?: string;
};
