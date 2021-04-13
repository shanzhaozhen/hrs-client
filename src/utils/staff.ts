import type { StaffForm } from "@/services/staff/typings";

export const convertStaffForm = (fields: StaffForm): StaffForm => {
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
