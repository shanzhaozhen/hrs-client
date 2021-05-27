import type { Dispatch, SetStateAction } from "react";
import {RegionType} from "@/services/region/typings";

/**
 * 封装校验函数
 * @param setErrors
 * @param currentField
 * @param value
 * @param require
 * @param customRule
 * @param customRuleTip
 */
export const customValidator = async (setErrors: Dispatch<SetStateAction<any>>, currentField: string, value: any, require: boolean, customRule?: () => boolean, customRuleTip?: string) => {
  console.log('currentField', currentField)

  if (require && (typeof(value) !== "boolean" && !value)) {
    setErrors((origin: any) => ({
      ...origin,
      [currentField]: '不能为空'
    }))
    throw new Error('不能为空');
  }

  if (customRule && !customRule()) {
    setErrors((origin: any) => ({
      ...origin,
      [currentField]: customRuleTip || '输入有误'
    }))
    throw new Error(customRuleTip);
  }

  setErrors((origin: any) => ({
    ...origin,
    [currentField]: undefined
  }))
}

export const fieldValidator = (item: any, field: string, errors: Record<string, any>, tips?: string) => {
  if (item && item[field]) {
    errors[field] = tips || '不能为空';
    return true;
  }
  return false;
}

/**
 * 检验手机号码是否正确
 * @param phoneNumber
 */
export const validatePhoneNumber = (phoneNumber: string) => {
  return /^1\d{10}$/.test(phoneNumber);
}

/**
 * 检验邮箱地址是否正确
 * @param email
 */
export const validateEmail = (email: string) => {
  return /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
}

/**
 * 检验身份证是否正确
 * @param idNumber
 */
export const validateIdNumber = (idNumber: string) => {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(idNumber);
}

export const validateAddress = (address: RegionType | any, level: number, haveDetail: boolean) => {
  if (!(haveDetail && address && address.detail)) {
    return false;
  }
  if (level === 1) {
    return !!address.province;
  }
  if (level === 2) {
    return !!(address.province && address.city);
  }
  if (level === 3) {
    return !!(address.province && address.city && address.area);
  }
  return false;
}
