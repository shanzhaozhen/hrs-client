import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import { addStaff } from '@/services/staff/staff';
import type { StaffForm } from '@/services/staff/typings';
import FormBody, { convertStaffForm } from '@/pages/HR/StaffList/components/FormBody';
import { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

interface CreateFormProps {
  createDrawerVisible: boolean;
  handleCreateDrawerVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createDrawerVisible, handleCreateDrawerVisible, tableActionRef } = props;

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
      handleCreateDrawerVisible(false);
      tableActionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <DrawerForm
      width={'75%'}
      title="新建员工"
      visible={createDrawerVisible}
      onVisibleChange={handleCreateDrawerVisible}
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={handleAdd}
    >
      <FormBody />
    </DrawerForm>
  );
};

export default CreateForm;
