import type { StaffForm } from "@/services/staff/typings";

export const convertStaffForm = (fields: StaffForm): StaffForm => {
  let { staffInfo } = fields;

  if (staffInfo.birthAddress) {
    staffInfo = {
      ...staffInfo,
      birthAddressProvince: fields.staffInfo.birthAddress.province,
      birthAddressCity: fields.staffInfo.birthAddress.city,
    }
  }

  if (staffInfo.nativeAddress) {
    staffInfo = {
      ...staffInfo,
      nativeAddressProvince: fields.staffInfo.nativeAddress.province,
      nativeAddressCity: fields.staffInfo.nativeAddress.city,
    }
  }

  if (staffInfo.registeredAddress) {
    staffInfo = {
      ...staffInfo,
      registeredAddressProvince: fields.staffInfo.registeredAddress.province,
      registeredAddressCity: fields.staffInfo.registeredAddress.city,
      registeredAddressArea: fields.staffInfo.registeredAddress.area,
      registeredAddressDetail: fields.staffInfo.registeredAddress.detail
    }
  }

  if (staffInfo.homeAddress) {
    staffInfo = {
      ...staffInfo,
      homeAddressProvince: fields.staffInfo.homeAddress.province,
      homeAddressCity: fields.staffInfo.homeAddress.city,
      homeAddressArea: fields.staffInfo.homeAddress.area,
      homeAddressDetail: fields.staffInfo.homeAddress.detail
    }
  }

  if (staffInfo.currentAddress) {
    staffInfo = {
      ...staffInfo,
      currentAddressProvince: fields.staffInfo.currentAddress.province,
      currentAddressCity: fields.staffInfo.currentAddress.city,
      currentAddressArea: fields.staffInfo.currentAddress.area,
      currentAddressDetail: fields.staffInfo.currentAddress.detail
    }
  }

  if (staffInfo.postalAddress) {
    staffInfo = {
      ...staffInfo,
      postalAddressProvince: fields.staffInfo.postalAddress.province,
      postalAddressCity: fields.staffInfo.postalAddress.city,
      postalAddressArea: fields.staffInfo.postalAddress.area,
      postalAddressDetail: fields.staffInfo.postalAddress.detail
    }
  }

  return {
    ...fields,
    staffInfo: staffInfo
  };
};
