import type { ResumeForm } from "@/services/resume/typings";

export const convertResumeForm = (fields: ResumeForm): ResumeForm => {
  const newFields = { ...fields };

  if (fields.birthAddress) {
    newFields.birthAddressProvince = fields.birthAddress.province;
    newFields.birthAddressCity = fields.birthAddress.city;
  }

  if (fields.nativeAddress) {
    newFields.nativeAddressProvince = fields.nativeAddress.province;
    newFields.nativeAddressCity = fields.nativeAddress.city;
  }

  if (fields.registeredAddress) {
    newFields.registeredAddressProvince = fields.registeredAddress.province;
    newFields.registeredAddressCity = fields.registeredAddress.city;
    newFields.registeredAddressArea = fields.registeredAddress.area;
    newFields.registeredAddressDetail = fields.registeredAddress.detail;
  }

  if (fields.homeAddress) {
    newFields.homeAddressProvince = fields.homeAddress.province;
    newFields.homeAddressCity = fields.homeAddress.city;
    newFields.homeAddressArea = fields.homeAddress.area;
    newFields.homeAddressDetail = fields.homeAddress.detail;
  }

  if (fields.currentAddress) {
    newFields.currentAddressProvince = fields.currentAddress.province;
    newFields.currentAddressCity = fields.currentAddress.city;
    newFields.currentAddressArea = fields.currentAddress.area;
    newFields.currentAddressDetail = fields.currentAddress.detail;
  }

  if (fields.postalAddress) {
    newFields.postalAddressProvince = fields.postalAddress.province;
    newFields.postalAddressCity = fields.postalAddress.city;
    newFields.postalAddressArea = fields.postalAddress.area;
    newFields.postalAddressDetail = fields.postalAddress.detail;
  }

  return newFields;
};

export const getBirthdayFromIdNumber = (idNumber: string) => {
  if (idNumber && idNumber.length > 13) {
    return new Date(`${idNumber.substring(6, 10)}-${idNumber.substring(10, 12)}-${idNumber.substring(12, 14)}`);
  }
  return ''
}

export const getSexFromIdNumber = (idNumber: string) => {
  if (idNumber && idNumber.length > 16) {
    return Number(idNumber.substr(16,1)) % 2 ? '男' : '女';
  }
  return ''
}
