import React, {useRef} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type {FormInstance} from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Salary/SalaryStaffList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { ModalForm } from "@ant-design/pro-form";
import { addStaffSalary } from "@/services/salary-staff/salary-staff";
import type { StaffSalaryForm } from "@/services/salary-staff/typings";

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 添加员工薪资
   * @param fields
   */
  const handleAdd = async (fields: StaffSalaryForm) => {
    const hide = message.loading('正在添加');
    try {
      await addStaffSalary(fields);
      hide();
      message.success('添加成功');
      handleCreateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <>
      <ModalForm
        width={748}
        title="新建员工薪资"
        visible={createModalVisible}
        formRef={formRef}
        onVisibleChange={handleCreateModalVisible}
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={handleAdd}
      >
        <FormBody formRef={formRef} />
      </ModalForm>
    </>
  );
};

export default CreateForm;
