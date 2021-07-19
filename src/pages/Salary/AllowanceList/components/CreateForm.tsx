import React, { useRef } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Salary/AllowanceList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import { onFormValuesChange } from '@/pages/Salary/AllowanceList';
import { addAllowance } from '@/services/allowance/allowance';
import type { AllowanceForm } from '@/services/allowance/typings';

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 添加津贴数据
   * @param fields
   */
  const handleAdd = async (fields: AllowanceForm) => {
    const hide = message.loading('正在添加');
    try {
      await addAllowance(fields);
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
        title="新建津贴数据"
        visible={createModalVisible}
        formRef={formRef}
        onVisibleChange={handleCreateModalVisible}
        modalProps={{
          destroyOnClose: true,
        }}
        onValuesChange={(changedValues: any, allValues: any) => {
          onFormValuesChange(changedValues, allValues, formRef);
        }}
        onFinish={handleAdd}
      >
        <FormBody formRef={formRef} />
      </ModalForm>
    </>
  );
};

export default CreateForm;
