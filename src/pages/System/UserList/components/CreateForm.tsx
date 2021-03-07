import React, { Dispatch, SetStateAction } from 'react';
import { message } from 'antd';
import { addUser } from '@/services/user/user';
import type { UserForm } from '@/services/user/typings';
import FormBody from '@/pages/System/UserList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible } = props;

  /**
   * 添加用户
   * @param fields
   */
  const handleAdd = async (fields: UserForm) => {
    const hide = message.loading('正在添加');
    try {
      await addUser({ ...fields });
      hide();
      message.success('添加成功');
      handleCreateModalVisible(false);
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
      <FormBody handleSubmit={handleAdd} />
    </ModalForm>
  );
};

export default CreateForm;
