import React from 'react';
import { message, Modal } from 'antd';
import { addUser } from '@/services/user/user';
import type { UserForm } from '@/services/user/typings';
import FormBody from '@/pages/System/UserList/components/FormBody';

interface CreateFormProps {
  createModalVisible: boolean;
  onCancel: (flag?: boolean) => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, onCancel: handleCreateModalVisible } = props;

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
    <Modal
      width={748}
      destroyOnClose
      title="新建用户"
      visible={createModalVisible}
      onCancel={() => handleCreateModalVisible()}
      footer={null}
    >
      <FormBody handleSubmit={handleAdd} />
    </Modal>
  );
};

export default CreateForm;
