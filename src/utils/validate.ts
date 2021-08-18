import type { Dispatch, SetStateAction } from 'react';
import type { RegionType } from '@/services/region/typings';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

/**
 * 封装校验函数
 * @param setErrors
 * @param currentField
 * @param value
 * @param require
 * @param customRule
 * @param customRuleTip
 */
export const customValidator = async (
  setErrors: Dispatch<SetStateAction<any>>,
  currentField: string,
  value: any,
  require: boolean,
  customRule?: () => boolean,
  customRuleTip?: string,
) => {
  console.log('currentField', currentField);

  if (require && typeof value !== 'boolean' && !value) {
    setErrors((origin: any) => ({
      ...origin,
      [currentField]: '不能为空',
    }));
    throw new Error('不能为空');
  }

  if (customRule && !customRule()) {
    setErrors((origin: any) => ({
      ...origin,
      [currentField]: customRuleTip || '输入有误',
    }));
    throw new Error(customRuleTip);
  }

  setErrors((origin: any) => ({
    ...origin,
    [currentField]: undefined,
  }));
};

/**
 * 更新错误信息（Form.List）
 * @param setErrors
 * @param listField
 * @param index
 * @param currentField
 * @param errorMessage
 */
const updateErrorList = (
  setErrors: Dispatch<SetStateAction<any>>,
  listField: string,
  index: number,
  currentField: string,
  errorMessage?: string,
) => {
  setErrors((origin: any) => {
    const listFieldValue = origin.hasOwnProperty(listField) ? origin[listField] : undefined;
    const indexFieldValue =
      listFieldValue && listFieldValue.hasOwnProperty(index) ? listFieldValue[index] : undefined;

    return {
      ...origin,
      [listField]: {
        ...listFieldValue,
        [index]: {
          ...indexFieldValue,
          [currentField]: errorMessage,
        },
      },
    };
  });
};

/**
 * 封装校验函数
 * @param setErrors
 * @param listField
 * @param index
 * @param currentField
 * @param value
 * @param require
 * @param customRule
 * @param customRuleTip
 */
export const customListValidator = async (
  setErrors: Dispatch<SetStateAction<any>>,
  listField: string,
  index: number,
  currentField: string,
  value: any,
  require: boolean,
  customRule?: () => boolean,
  customRuleTip?: string,
) => {
  if (require && typeof value !== 'boolean' && !value) {
    updateErrorList(setErrors, listField, index, currentField, '不能为空');
    throw new Error('不能为空');
  }

  if (customRule && !customRule()) {
    updateErrorList(setErrors, listField, index, currentField, customRuleTip || '输入有误');
    throw new Error(customRuleTip || '输入有误');
  }

  updateErrorList(setErrors, listField, index, currentField);
};

/**
 * 封装校验函数（Form.List）
 * @param setErrors
 * @param currentField
 * @param value
 * @param require
 * @param customRule
 * @param customRuleTip
 */
export const customZaCellValidator = async (
  setErrors: Dispatch<SetStateAction<any>>,
  value: any,
  require: boolean,
  customRule?: () => boolean,
  customRuleTip?: string,
) => {
  if (require && typeof value !== 'boolean' && !value) {
    setErrors('不能为空');
    throw new Error('不能为空');
  }

  if (customRule && !customRule()) {
    setErrors(customRuleTip || '输入有误');
    throw new Error(customRuleTip);
  }

  setErrors(undefined);
};

/**
 * 检验手机号码是否正确
 * @param phoneNumber
 */
export const validatePhoneNumber = (phoneNumber: string) => {
  return /^1\d{10}$/.test(phoneNumber);
};

/**
 * 检验邮箱地址是否正确
 * @param email
 */
export const validateEmail = (email: string) => {
  return /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
};

/**
 * 检验身份证是否正确
 * @param idNumber
 */
export const validateIdNumber = (idNumber: string) => {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    idNumber,
  );
};

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
};

export const validateForm = async (form: FormInstance, tip: string): Promise<boolean> => {
  try {
    await form.validateFields();
  } catch (error) {
    message.error(tip || '表单校验失败');
    return false;
  }
  return true;
};
