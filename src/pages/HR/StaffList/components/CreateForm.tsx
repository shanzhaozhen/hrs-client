import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message} from 'antd';
import { addUser } from '@/services/user/user';
import type { UserForm } from '@/services/user/typings';
import FormBody from '@/pages/System/UserList/components/FormBody';
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
  const handleAdd = async (fields: UserForm) => {
    const hide = message.loading('正在添加');
    try {
      await addUser({ ...fields });
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
