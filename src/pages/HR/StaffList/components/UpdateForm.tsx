import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {Button, message} from 'antd';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import { updateStaff } from '@/services/staff/staff';
import ProForm, { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import {convertStaffForm} from "@/utils/staff";
import {HistoryOutlined} from "@ant-design/icons";

export interface UpdateFormProps {
  updateDrawerVisible: boolean;
  handleUpdateDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: StaffForm | StaffVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateDrawerVisible, handleUpdateDrawerVisible, onCancel, tableActionRef, values } = props;

  const [workExperienceForm] = ProForm.useForm();
  const [educationalExperienceForm] = ProForm.useForm();
  const [certificateForm] = ProForm.useForm();
  const [familyForm] = ProForm.useForm();

  /**
   * 修改员工
   * @param fields
   */
  const handleUpdate = async (fields: StaffForm) => {
    const hide = message.loading('正在修改');
    try {
      await workExperienceForm.validateFields();
      await educationalExperienceForm.validateFields();
      await certificateForm.validateFields();
      await familyForm.validateFields();
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
        width={'75%'}
        title={
          <>
            <span style={{ marginRight: 15 }}>修改员工</span>
            <Button
              type="primary"
              icon={<HistoryOutlined />}
            >
              调动记录
            </Button>
          </>
        }
        visible={updateDrawerVisible}
        onVisibleChange={handleUpdateDrawerVisible}
        initialValues={values}
        drawerProps={{
          onClose: onCancel,
          destroyOnClose: true,
        }}
        onFinish={handleUpdate}
      >
        {values && Object.keys(values).length ? (
          <FormBody
            values={values}
            isEdit
            workExperienceForm={workExperienceForm}
            educationalExperienceForm={educationalExperienceForm}
            certificateForm={certificateForm}
            familyForm={familyForm}
          />
        ) : null}
      </DrawerForm>
    </>
  );
};

export default UpdateForm;
