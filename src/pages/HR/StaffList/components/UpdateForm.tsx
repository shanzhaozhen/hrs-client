import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import { updateStaff } from '@/services/staff/staff';
import { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

export interface UpdateFormProps {
  updateDrawerVisible: boolean;
  handleUpdateDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: StaffVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateDrawerVisible, handleUpdateDrawerVisible, onCancel, tableActionRef, values } = props;

  /**
   * 修改员工
   * @param fields
   */
  const handleUpdate = async (fields: StaffForm) => {
    const hide = message.loading('正在修改');
    try {
      await updateStaff({
        ...fields,
        birthAddressProvince: fields.birthAddress.province,
        birthAddressCity: fields.birthAddress.city,
        nativeAddressProvince: fields.nativeAddress.province,
        nativeAddressCity: fields.nativeAddress.city,
        registeredAddressProvince: fields.registeredAddress.province,
        registeredAddressCity: fields.registeredAddress.city,
        registeredAddressArea: fields.registeredAddress.area,
        registeredAddressDetail: fields.registeredAddress.detail,
        homeAddressProvince: fields.homeAddress.province,
        homeAddressCity: fields.homeAddress.city,
        homeAddressArea: fields.homeAddress.area,
        homeAddressDetail: fields.homeAddress.detail,
        currentAddressProvince: fields.currentAddress.province,
        currentAddressCity: fields.currentAddress.city,
        currentAddressArea: fields.currentAddress.area,
        currentAddressDetail: fields.currentAddress.detail,
        postalAddressProvince: fields.postalAddress.province,
        postalAddressCity: fields.postalAddress.city,
        postalAddressArea: fields.postalAddress.area,
        postalAddressDetail: fields.postalAddress.detail,
      });
      hide();
      message.success('修改成功');
      handleUpdateDrawerVisible(false);
      tableActionRef.current?.reloadAndRest?.();
      // message.error(res.message || '修改失败请重试！');
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <DrawerForm
      width={'75%'}
      title="修改员工"
      visible={updateDrawerVisible}
      onVisibleChange={handleUpdateDrawerVisible}
      initialValues={values}
      drawerProps={{
        onClose: onCancel,
        destroyOnClose: true,
      }}
      onFinish={handleUpdate}
      // onFinish={async (formData) => {
      //   console.log(formData)
      // }}
      // submitter={{
      //   searchConfig: {
      //     submitText: '提交',
      //     resetText: '取消',
      //   },
      // }}
    >
      {values && Object.keys(values).length ? (
        <FormBody isEdit={true} values={values} />
      ) : null}
    </DrawerForm>
  );
};

export default UpdateForm;
