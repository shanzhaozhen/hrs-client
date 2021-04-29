import type { RegionType } from "@/services/region/typings";
import type {WorkExperienceForm, WorkExperienceVO} from "@/services/work-experience/typings";
import type {EducationalExperienceForm, EducationalExperienceVO} from "@/services/educational-experience/typings";
import type { CertificateForm, CertificateVO } from "@/services/certificate/typings";
import FamilyVO = API.FamilyVO;
import FamilyForm = API.FamilyForm;

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
  /** 岗位等级 */
  postLevel?: string;
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
  birthAddressProvince?: string | number;
  /** 出生地(市) */
  birthAddressCity?: string | number;
  /** 籍贯(省) */
  nativeAddressProvince?: string | number;
  /** 籍贯(市) */
  nativeAddressCity?: string | number;
  /** 户口类型 */
  householdType?: string;
  /** 户口地址(省) */
  registeredAddressProvince?: string | number;
  /** 户口地址(市) */
  registeredAddressCity?: string | number;
  /** 户口地址(区) */
  registeredAddressArea?: string | number;
  /** 户口地址(市) */
  registeredAddressDetail?: string | number;
  /** 家庭住址(省) */
  homeAddressProvince?: string | number;
  /** 家庭住址(市) */
  homeAddressCity?: string | number;
  /** 家庭住址(区) */
  homeAddressArea?: string | number;
  /** 家庭住址(详细) */
  homeAddressDetail?: string | number;
  /** 现住地址(省) */
  currentAddressProvince?: string | number;
  /** 现住地址(市) */
  currentAddressCity?: string | number;
  /** 现住地址(区) */
  currentAddressArea?: string | number;
  /** 现住地址(详细) */
  currentAddressDetail?: string | number;
  /** 邮递地址(省) */
  postalAddressProvince?: string | number;
  /** 邮递地址(市) */
  postalAddressCity?: string | number;
  /** 邮递地址(区) */
  postalAddressArea?: string | number;
  /** 邮递地址(详细) */
  postalAddressDetail?: string | number;
  /** 紧急联系人姓名 */
  contactName?: string;
  /** 紧急联系人关系 */
  contactRelation?: string;
  /** 紧急联系人电话 */
  contactPhone?: string;
  birthAddress: RegionType;
  nativeAddress: RegionType;
  registeredAddress: RegionType;
  homeAddress: RegionType;
  currentAddress: RegionType;
  postalAddress: RegionType;
  /** 工作履历 */
  workExperienceList?: WorkExperienceForm[];
  /** 教育经历 */
  educationalExperienceList?: EducationalExperienceForm[];
  /** 证件信息 */
  certificateList?: CertificateForm[];
  /** 家庭成员 */
  familyList?: FamilyForm[];
};

export type StaffVO = {
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
  /** 岗位等级 */
  postLevel?: string;
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
  marriageCertificate?: number;
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
  /** 工作履历 */
  workExperienceList?: WorkExperienceVO[];
  /** 教育经历 */
  educationalExperienceList?: EducationalExperienceVO[];
  /** 证件信息 */
  certificateList?: CertificateVO[];
  /** 家庭成员 */
  familyList?: FamilyVO[];
  /** 创建人 */
  createdBy?: number;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改时间 */
  lastModifiedDate?: string;
};
