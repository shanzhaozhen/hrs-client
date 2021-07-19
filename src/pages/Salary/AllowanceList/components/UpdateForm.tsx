import React, { useRef } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Salary/AllowanceList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import type { AllowanceForm, AllowanceVO } from '@/services/allowance/typings';
import { updateAllowance } from '@/services/allowance/allowance';
import { onFormValuesChange } from '@/pages/Salary/AllowanceList';

interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: AllowanceForm | AllowanceVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onCancel, tableActionRef, values } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 修改津贴数据
   * @param fields
   */
  const handleUpdate = async (fields: AllowanceForm) => {
    const hide = message.loading('正在添加');
    try {
      await updateAllowance(fields);
      hide();
      message.success('添加成功');
      handleUpdateModalVisible(false);
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
        title="修改津贴数据"
        visible={updateModalVisible}
        formRef={formRef}
        initialValues={values}
        onVisibleChange={handleUpdateModalVisible}
        onValuesChange={(changedValues: any, allValues: any) => {
          onFormValuesChange(changedValues, allValues, formRef);
        }}
        modalProps={{
          onCancel,
          destroyOnClose: true,
        }}
        onFinish={handleUpdate}
      >
        <FormBody formRef={formRef} />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
