import type {ResumeForm} from "@/services/resume/typings";
import type {Dispatch, SetStateAction} from "react";
import type {RegionType} from "@/services/region/typings";

/**
 * 地址转换
 * @param address
 * @param field
 */
export const convertAddress = (address: RegionType, field: string): any => {
  if (address) {
    return {
      [`${field}Province`]: address.province || undefined,
      [`${field}City`]: address.city || undefined,
      [`${field}Area`]: address.area || undefined,
      [`${field}Detail`]: address.detail || undefined
    }
  }
  return {};
}

/**
 * 简历转变
 * @param fields
 */
export const convertResumeForm = (fields: ResumeForm): ResumeForm => {
  const birthAddress = convertAddress(fields.birthAddress, 'birthAddress');
  const nativeAddress = convertAddress(fields.nativeAddress, 'nativeAddress');
  const registeredAddress = convertAddress(fields.registeredAddress, 'registeredAddress');
  const homeAddress = convertAddress(fields.homeAddress, 'homeAddress');
  const currentAddress = convertAddress(fields.currentAddress, 'currentAddress');
  const postalAddress = convertAddress(fields.postalAddress, 'postalAddress');

  return {
    ...fields,
    birthAddress,
    nativeAddress,
    registeredAddress,
    homeAddress,
    currentAddress,
    postalAddress
  };
};

/**
 * 身份证号码提取生日
 * @param idNumber
 */
export const getBirthdayFromIdNumber = (idNumber: string) => {
  if (idNumber && idNumber.length > 13) {
    return new Date(`${idNumber.substring(6, 10)}-${idNumber.substring(10, 12)}-${idNumber.substring(12, 14)}`);
  }
  return ''
}

/**
 * 身份证号码提取性别
 * @param idNumber
 */
export const getSexFromIdNumber = (idNumber: string) => {
  if (idNumber && idNumber.length > 16) {
    return Number(idNumber.substr(16,1)) % 2 ? '男' : '女';
  }
  return ''
}

/**
 * 校验工作简历
 * @param currentValue
 * @param setErrors
 * @param isNextPage
 */
export const validateWorkExperienceList = (currentValue: any[], setErrors: Dispatch<SetStateAction<any>>, isNextPage: boolean) => {
  if (currentValue && currentValue.length > 0) {
    let isPass = true;
    setErrors((origin: any) => {
      return {
        ...origin,
        workExperienceList: currentValue.map((item: any) => {
          const error: Record<string, any> = {};
          if (item) {
            if ((isNextPage || item.hasOwnProperty('workUnit')) && !item.workUnit) {
              error.workUnit = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('startDate')) && !item.startDate) {
              error.startDate = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('endDate')) && !item.endDate) {
              error.endDate = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('duty')) && !item.duty) {
              error.duty = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('unitType')) && !item.unitType) {
              error.unitType = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('witnessName')) && !item.witnessName) {
              error.witnessName = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('witnessPhone')) && !item.witnessPhone) {
              error.witnessPhone = '不能为空';
              isPass = false;
            }
          }
          return error;
        })
      }
    });
    if (!isPass) {
      throw new Error('请正确填写工作经历');
    }
    return isPass;
  }
  return true;
}


/**
 * 校验教育经历成员
 * @param currentValue
 * @param setErrors
 * @param isNextPage
 */
export const validateEducationalList = (currentValue: any[], setErrors: Dispatch<SetStateAction<any>>, isNextPage: boolean) => {
  if (currentValue && currentValue.length > 0) {
    let isPass = true;
    setErrors((origin: any) => {
      return {
        ...origin,
        educationalExperienceList: currentValue.map((item: any) => {
          const error: Record<string, any> = {};
          if (item) {
            if ((isNextPage || item.hasOwnProperty('schoolName')) && !item.schoolName) {
              error.schoolName = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('startDate')) && !item.startDate) {
              error.startDate = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('endDate')) && !item.endDate) {
              error.endDate = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('education')) && !item.education) {
              error.education = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('major')) && !item.major) {
              error.major = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('studyYears')) && !item.studyYears) {
              error.studyYears = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('fullTime')) && !item.fullTime) {
              error.fullTime = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('witnessName')) && !item.witnessName) {
              error.witnessName = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('witnessPhone')) && !item.witnessPhone) {
              error.witnessPhone = '不能为空';
              isPass = false;
            }
          }
          return error;
        })
      }
    });
    if (!isPass) {
      throw new Error('请正确填写工作经历');
    }
    return isPass;
  }
  return true;
}


/**
 * 校验家庭成员
 * @param currentValue
 * @param setErrors
 * @param isNextPage
 */
export const validateFamilyList = (currentValue: any[], setErrors: Dispatch<SetStateAction<any>>, isNextPage: boolean) => {
  if (currentValue && currentValue.length > 0) {
    let isPass = true;
    setErrors((origin: any) => {
      return {
        ...origin,
        familyList: currentValue.map((item: any) => {
          const error: Record<string, any> = {};
          if (item) {
            if ((isNextPage || item.hasOwnProperty('name')) && !item.name) {
              error.workUnit = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('relation')) && !item.relation) {
              error.startDate = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('birthday')) && !item.birthday) {
              error.endDate = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('politics')) && !item.politics) {
              error.duty = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('workUnit')) && !item.workUnit) {
              error.unitType = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('duty')) && !item.duty) {
              error.witnessName = '不能为空';
              isPass = false;
            }
            if ((isNextPage || item.hasOwnProperty('mobilePhone')) && !item.mobilePhone) {
              error.witnessPhone = '不能为空';
              isPass = false;
            }
          }
          return error;
        })
      }
    });
    if (!isPass) {
      throw new Error('请正确填写工作经历');
    }
    return isPass;
  }
  return true;
}
