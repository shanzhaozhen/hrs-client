import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import { addResource } from '@/services/resource/resource';
import type { ResourceForm } from '@/services/resource/typings';
import FormBody from '@/pages/System/ResourceList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import { ActionType } from '@ant-design/pro-table';

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  /**
   * 添加资源
   * @param fields
   */
  const handleAdd = async (fields: ResourceForm) => {
    const hide = message.loading('正在添加');
    try {
      await addResource({ ...fields });
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
      title="新建资源"
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
