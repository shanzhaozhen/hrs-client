import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import { addDictionary } from '@/services/dictionary/dictionary';
import type { DictionaryForm } from '@/services/dictionary/typings';
import FormBody from '@/pages/System/DictionaryList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import type { DictionaryVO } from '@/services/dictionary/typings';

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: DictionaryVO;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef, values } = props;

  /**
   * 添加字典
   * @param fields
   */
  const handleAdd = async (fields: DictionaryForm) => {
    const hide = message.loading('正在添加');
    try {
      await addDictionary({ ...fields });
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
      title="新建字典"
      visible={createModalVisible}
      onVisibleChange={handleCreateModalVisible}
      initialValues={values}
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
