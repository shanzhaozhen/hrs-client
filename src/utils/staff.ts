import type { StaffForm } from "@/services/staff/typings";

export const convertStaffForm = (fields: StaffForm): StaffForm => {
  let { staffInfo } = fields;

  if (staffInfo) {
    if (staffInfo.birthAddress) {
      staffInfo = {
        ...staffInfo,
        birthAddressProvince: staffInfo.birthAddress.province,
        birthAddressCity: staffInfo.birthAddress.city,
      }
    }

    if (staffInfo.nativeAddress) {
      staffInfo = {
        ...staffInfo,
        nativeAddressProvince: staffInfo.nativeAddress.province,
        nativeAddressCity: staffInfo.nativeAddress.city,
      }
    }

    if (staffInfo.registeredAddress) {
      staffInfo = {
        ...staffInfo,
        registeredAddressProvince: staffInfo.registeredAddress.province,
        registeredAddressCity: staffInfo.registeredAddress.city,
        registeredAddressArea: staffInfo.registeredAddress.area,
        registeredAddressDetail: staffInfo.registeredAddress.detail
      }
    }

    if (staffInfo.homeAddress) {
      staffInfo = {
        ...staffInfo,
        homeAddressProvince: staffInfo.homeAddress.province,
        homeAddressCity: staffInfo.homeAddress.city,
        homeAddressArea: staffInfo.homeAddress.area,
        homeAddressDetail: staffInfo.homeAddress.detail
      }
    }

    if (staffInfo.currentAddress) {
      staffInfo = {
        ...staffInfo,
        currentAddressProvince: staffInfo.currentAddress.province,
        currentAddressCity: staffInfo.currentAddress.city,
        currentAddressArea: staffInfo.currentAddress.area,
        currentAddressDetail: staffInfo.currentAddress.detail
      }
    }

    if (staffInfo.postalAddress) {
      staffInfo = {
        ...staffInfo,
        postalAddressProvince: staffInfo.postalAddress.province,
        postalAddressCity: staffInfo.postalAddress.city,
        postalAddressArea: staffInfo.postalAddress.area,
        postalAddressDetail: staffInfo.postalAddress.detail
      }
    }
  }



  return {
    ...fields,
    staffInfo
  };
};
