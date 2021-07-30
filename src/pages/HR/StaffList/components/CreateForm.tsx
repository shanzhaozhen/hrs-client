import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import { addStaff } from '@/services/staff/staff';
import type { StaffForm } from '@/services/staff/typings';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import ProForm, { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { convertStaffForm } from '@/utils/staff';

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
   * 添加员工
   * @param fields
   */
  const handleAdd = async (fields: StaffForm) => {
    const hide = message.loading('正在添加');
    try {
      await workRecordForm.validateFields();
      await workExperienceForm.validateFields();
      await educationalExperienceForm.validateFields();
      await familyForm.validateFields();
      await contractForm.validateFields();
      await titleForm.validateFields();
      await qualificationForm.validateFields();
      await driverLicenseForm.validateFields();
      await addStaff(convertStaffForm(fields));
      hide();
      message.success('添加成功');
      handleCreateDrawerVisible(false);
      tableActionRef.current?.reloadAndRest?.();
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
