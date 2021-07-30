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
   * 修改员工
   * @param fields
   */
  const handleUpdate = async (fields: StaffForm) => {
    const hide = message.loading('正在修改');
    try {
      await workRecordForm.validateFields();
      await workExperienceForm.validateFields();
      await educationalExperienceForm.validateFields();
      await familyForm.validateFields();
      await contractForm.validateFields();
      await titleForm.validateFields();
      await qualificationForm.validateFields();
      await driverLicenseForm.validateFields();
      await updateStaff(convertStaffForm(fields));
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
