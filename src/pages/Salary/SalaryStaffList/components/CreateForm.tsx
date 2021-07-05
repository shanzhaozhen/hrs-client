import React, {useRef} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type {FormInstance} from 'antd';
import { message } from 'antd';
import { addStaff } from '@/services/staff/staff';
import type { StaffForm } from '@/services/staff/typings';
import FormBody from '@/pages/Salary/SalaryStaffList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { convertStaffForm } from "@/utils/staff";
import { ModalForm } from "@ant-design/pro-form";

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  const formRef = useRef<FormInstance>();


  /**
   * 添加员工
   * @param fields
   */
  const handleAdd = async (fields: StaffForm) => {
    const hide = message.loading('正在添加');
    try {
      await addStaff(convertStaffForm(fields));
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
        <FormBody />
      </ModalForm>
    </>
  );
};

export default CreateForm;
