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
