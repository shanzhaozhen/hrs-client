import React, { useRef } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import type { SalaryChangeForm, SalaryChangeVO } from '@/services/salary-change/typings';
import FormBody from '@/pages/Salary/SalaryChangeList/components/FormBody';
import { updateSalaryChange } from '@/services/salary-change/salary-change';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

export interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: SalaryChangeVO;
  staffId?: number;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {
    updateModalVisible,
    handleUpdateModalVisible,
    onCancel,
    tableActionRef,
    values,
    staffId,
  } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 修改调薪记录
   * @param fields
   */
  const handleUpdate = async (fields: SalaryChangeForm) => {
    const hide = message.loading('正在修改');
    try {
      await updateSalaryChange({
        ...fields,
      });
      hide();
      message.success('修改成功');
      handleUpdateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <ModalForm
      width={748}
      title="修改调薪"
      visible={updateModalVisible}
      onVisibleChange={handleUpdateModalVisible}
      initialValues={values}
      formRef={formRef}
      modalProps={{
        onCancel,
        destroyOnClose: true,
      }}
      onFinish={handleUpdate}
    >
      {values && Object.keys(values).length ? (
        <FormBody staffId={staffId} formRef={formRef} />
      ) : null}
    </ModalForm>
  );
};

export default UpdateForm;
