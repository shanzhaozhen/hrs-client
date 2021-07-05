import React, {useState} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {Button, message} from 'antd';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import { updateStaff } from '@/services/staff/staff';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import {convertStaffForm} from "@/utils/staff";
import {HistoryOutlined} from "@ant-design/icons";
import StaffChangeModal from "@/pages/HR/StaffChangeList/components/ModalBody";

export interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: StaffForm | StaffVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, tableActionRef, values } = props;

  const [staffChangeModalVisible, setStaffChangeModalVisible] = useState<boolean>(false);

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
      handleUpdateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
      // message.error(res.message || '修改失败请重试！');
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <>
      <ModalForm
        width={'75%'}
        title={
          <>
            <span style={{ marginRight: 15 }}>修改员工薪资</span>
            <Button
              type="primary"
              icon={<HistoryOutlined />}
              onClick={() => {
                setStaffChangeModalVisible(true);
              }}
            >
              调动记录
            </Button>
          </>
        }
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        initialValues={values}
        modalProps={{
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
      </ModalForm>

      <StaffChangeModal
        staffChangeModalVisible={staffChangeModalVisible}
        handleStaffChangeModalVisible={setStaffChangeModalVisible}
        staffId={values?.id}
      />
    </>
  );
};

export default UpdateForm;
