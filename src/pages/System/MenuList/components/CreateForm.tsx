import React from 'react';
import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { message } from 'antd';
import { addMenu } from '@/services/menu/menu';
import type { MenuForm } from '@/services/menu/typings';
import FormBody from '@/pages/System/MenuList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  /**
   * 添加用户
   * @param fields
   */
  const handleAdd = async (fields: MenuForm) => {
    const hide = message.loading('正在添加');
    try {
      await addMenu({ ...fields });
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
    <ModalForm
      width={748}
      title="新建用户"
      visible={createModalVisible}
      onVisibleChange={handleCreateModalVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={handleAdd}
    >
      <FormBody />
    </ModalForm>
  );
};

export default CreateForm;
