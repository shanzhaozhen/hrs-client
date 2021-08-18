import React, { useState } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Button, message } from 'antd';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import { updateStaff } from '@/services/staff/staff';
import ProForm, { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { convertStaffForm } from '@/utils/staff';
import { HistoryOutlined } from '@ant-design/icons';
import StaffChangeModal from '@/pages/HR/StaffChange/components/ModalBody';
import { validateForm } from '@/utils/validate';

export interface UpdateFormProps {
  updateDrawerVisible: boolean;
  handleUpdateDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: StaffForm | StaffVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateDrawerVisible, handleUpdateDrawerVisible, onClose, tableActionRef, values } = props;

  const [staffChangeModalVisible, handleStaffChangeModalVisible] = useState<boolean>(false);

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
   * 修改员工
   * @param fields
   */
  const handleUpdate = async (fields: StaffForm) => {
    const hide = message.loading('正在修改');

    try {
      // 校验信息
      const validateResult = await validateStaffOtherInfoForm();

      if (validateResult) {
        await updateStaff(convertStaffForm(fields));
        hide();
        message.success('修改成功');
        handleUpdateDrawerVisible(false);
        tableActionRef.current?.reloadAndRest?.();
      } else {
        hide();
      }
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <>
      <DrawerForm
        width={'80%'}
        title={
          <>
            <span style={{ marginRight: 15 }}>修改员工</span>
            <Button
              type="primary"
              icon={<HistoryOutlined />}
              onClick={() => {
                handleStaffChangeModalVisible(true);
              }}
            >
              调动记录
            </Button>
          </>
        }
        visible={updateDrawerVisible}
        onVisibleChange={handleUpdateDrawerVisible}
        initialValues={values}
        drawerProps={{
          onClose,
          destroyOnClose: true,
        }}
        onFinish={handleUpdate}
      >
        {values && Object.keys(values).length ? (
          <FormBody
            values={values}
            isEdit
            workRecordForm={workRecordForm}
            workExperienceForm={workExperienceForm}
            educationalExperienceForm={educationalExperienceForm}
            familyForm={familyForm}
            contractForm={contractForm}
            titleForm={titleForm}
            qualificationForm={qualificationForm}
            driverLicenseForm={driverLicenseForm}
          />
        ) : null}
      </DrawerForm>

      <StaffChangeModal
        staffChangeModalVisible={staffChangeModalVisible}
        handleStaffChangeModalVisible={handleStaffChangeModalVisible}
        staffId={values?.id}
      />
    </>
  );
};

export default UpdateForm;
