import React, {useRef} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type {FormInstance} from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Salary/SalaryList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { DrawerForm } from "@ant-design/pro-form";
import {onFormValuesChange} from "@/pages/Salary/SalaryList";
import {addSalary} from "@/services/salary/salary";
import type {SalaryForm} from "@/services/salary/typings";

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 添加薪资发放
   * @param fields
   */
  const handleAdd = async (fields: SalaryForm) => {
    const hide = message.loading('正在添加');
    try {
      await addSalary(fields);
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
      <DrawerForm
        width={748}
        title="新建薪资发放"
        visible={createModalVisible}
        formRef={formRef}
        onVisibleChange={handleCreateModalVisible}
        drawerProps={{
          destroyOnClose: true,
        }}
        onValuesChange={(changedValues: any, allValues: any) => {
          onFormValuesChange(changedValues, allValues, formRef);
        }}
        onFinish={handleAdd}
      >
        <FormBody formRef={formRef} />
      </DrawerForm>
    </>
  );
};

export default CreateForm;
