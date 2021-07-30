import type { WorkExperienceForm, WorkExperienceVO } from '@/services/work-experience/typings';
import type {
  EducationalExperienceForm,
  EducationalExperienceVO,
} from '@/services/educational-experience/typings';
import type { CertificateForm, CertificateVO } from '@/services/certificate/typings';
import type { FamilyForm, FamilyVO } from '@/services/family/typings';
import type { StaffInfoForm, StaffInfoVO } from '@/services/staff-info/typings';
import type { WorkRecordForm, WorkRecordVO } from '@/services/work-record/typings';
import type { TitleForm, TitleVO } from '@/services/title/typings';
import type { DriverLicenseForm, DriverLicenseVO } from '@/services/driver-license/typings';
import type { QualificationForm, QualificationVO } from '@/services/qualification/typings';

export type StaffForm = {
  /** 主键ID */
  id: number;
  /** 员工编号 */
  staffCode?: string;
  /** 员工姓名 */
  staffName?: string;
  /** 性别 */
  sex?: string;
  /** 出生日期 */
  birthday?: string;
  /** 身份证号码 */
  idNumber?: string;
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
  /** 开始工作时间 */
  workDate?: string;
  /** 进入商贸集团时间 */
  entryGacDate?: string;
  /** 入职日期 */
  entryDate?: string;
  /** 离职日期 */
  departureDate?: string;
  /** 社保号 */
  socialSecurityNumber?: string;
  /** 银行卡号 */
  bankCardNumber?: string;
  /** 开户行 */
  bankName?: string;
  /** 个人照片 */
  personalPhoto?: number;
  /** 员工信息 */
  staffInfo?: StaffInfoForm;
  /** 工作记录 */
  workRecordList?: WorkRecordForm[];
  /** 工作履历 */
  workExperienceList?: WorkExperienceForm[];
  /** 教育经历 */
  educationalExperienceList?: EducationalExperienceForm[];
  /** 家庭成员 */
  familyList?: FamilyForm[];
  /** 合同信息 */
  contractList?: CertificateForm[];
  /** 职称信息 */
  titleList?: TitleForm[];
  /** 职业资格 */
  qualificationList?: QualificationForm[];
  /** 驾驶证信息 */
  driverLicenseList?: DriverLicenseForm[];
};

export type StaffVO = {
  /** 主键ID */
  id?: number;
  /** 员工编号 */
  staffCode?: string;
  /** 员工姓名 */
  staffName?: string;
  /** 性别 */
  sex?: string;
  /** 出生日期 */
  birthday?: string;
  /** 身份证号码 */
  idNumber?: string;
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
  /** 开始工作时间 */
  workDate?: string;
  /** 进入商贸集团时间 */
  entryGacDate?: string;
  /** 入职日期 */
  entryDate?: string;
  /** 离职日期 */
  departureDate?: string;
  /** 社保号 */
  socialSecurityNumber?: string;
  /** 银行卡号 */
  bankCardNumber?: string;
  /** 开户行 */
  bankName?: string;
  /** 个人照片 */
  personalPhoto?: number;
  /** 员工信息 */
  staffInfo?: StaffInfoVO;
  /** 工作记录 */
  workRecordList?: WorkRecordVO[];
  /** 工作履历 */
  workExperienceList?: WorkExperienceVO[];
  /** 教育经历 */
  educationalExperienceList?: EducationalExperienceVO[];
  /** 家庭成员 */
  familyList?: FamilyVO[];
  /** 合同信息 */
  contractList?: CertificateVO[];
  /** 职称信息 */
  titleList?: TitleVO[];
  /** 职业资格 */
  qualificationList?: QualificationVO[];
  /** 驾驶证信息 */
  driverLicenseList?: DriverLicenseVO[];
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
