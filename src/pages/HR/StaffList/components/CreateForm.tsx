import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import { addStaff } from '@/services/staff/staff';
import type { StaffForm } from '@/services/staff/typings';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import ProForm, { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { convertStaffForm } from '@/utils/staff';
import { validateForm } from '@/utils/validate';

interface CreateFormProps {
  createDrawerVisible: boolean;
  handleCreateDrawerVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createDrawerVisible, handleCreateDrawerVisible, tableActionRef } = props;

  const [workRecordForm] = ProForm.useForm();
  const [workExperienceForm] = ProForm.useForm();
  const [educationalExperienceForm] = ProForm.useForm();
  const [familyForm] = ProForm.useForm();
  const [contractForm] = ProForm.useForm();
  const [titleForm] = ProForm.useForm();
  const [qualificationForm] = ProForm.useForm();
  const [driverLicenseForm] = ProForm.useForm();

  /**
   * 校验信息
   */
  const validateStaffOtherInfoForm = async () => {
    let validateResult: boolean;
    validateResult = await validateForm(
      workRecordForm,
      '工作记录列表校验失败，请检查填写是否正确',
    ).then();
    if (validateResult) {
      validateResult = await validateForm(
        workExperienceForm,
        '工作履历列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    if (validateResult) {
      validateResult = await validateForm(
        educationalExperienceForm,
        '教育经历列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    if (validateResult) {
      validateResult = await validateForm(
        familyForm,
        '家庭信息列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    if (validateResult) {
      validateResult = await validateForm(
        contractForm,
        '合同信息列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    if (validateResult) {
      validateResult = await validateForm(
        titleForm,
        '职称信息列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    if (validateResult) {
      validateResult = await validateForm(
        qualificationForm,
        '工作记录列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    if (validateResult) {
      validateResult = await validateForm(
        workExperienceForm,
        '职业资格列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    if (validateResult) {
      validateResult = await validateForm(
        driverLicenseForm,
        '驾驶证信息列表校验失败，请检查填写是否正确',
      ).then();
    } else {
      return false;
    }
    return validateResult;
  };

  /**
   * 添加员工
   * @param fields
   */
  const handleAdd = async (fields: StaffForm) => {
    const hide = message.loading('正在添加');
    try {
      // 校验信息
      const validateResult = await validateStaffOtherInfoForm();

      if (validateResult) {
        await addStaff(convertStaffForm(fields));
        hide();
        message.success('添加成功');
        handleCreateDrawerVisible(false);
        tableActionRef.current?.reloadAndRest?.();
      } else {
        hide();
      }
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <>
      <DrawerForm
        width={'80%'}
        title="新建员工"
        visible={createDrawerVisible}
        onVisibleChange={handleCreateDrawerVisible}
        drawerProps={{
          destroyOnClose: true,
        }}
        onValuesChange={(changedValues: any, allValues: any) => {
          console.log('changedValues', changedValues);
          console.log('allValues', allValues);
        }}
        onFinish={handleAdd}
      >
        <FormBody
          workRecordForm={workRecordForm}
          workExperienceForm={workExperienceForm}
          educationalExperienceForm={educationalExperienceForm}
          familyForm={familyForm}
          contractForm={contractForm}
          titleForm={titleForm}
          qualificationForm={qualificationForm}
          driverLicenseForm={driverLicenseForm}
        />
      </DrawerForm>
    </>
  );
};

export default CreateForm;
