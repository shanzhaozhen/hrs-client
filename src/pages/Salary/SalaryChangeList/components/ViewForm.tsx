import React, { useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import type { SalaryChangeVO } from '@/services/salary-change/typings';
import FormBody from '@/pages/Salary/SalaryChangeList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';

export interface UpdateFormProps {
  viewModalVisible: boolean;
  handleViewModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: SalaryChangeVO;
  staffId?: number;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { viewModalVisible, handleViewModalVisible, onCancel, values, staffId } = props;

  const formRef = useRef<FormInstance>();

  return (
    <ModalForm
      width={748}
      title="查看调动"
      visible={viewModalVisible}
      onVisibleChange={handleViewModalVisible}
      initialValues={values}
      formRef={formRef}
      modalProps={{
        onCancel,
        destroyOnClose: true,
      }}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      {values && Object.keys(values).length ? (
        <FormBody isView staffId={staffId} formRef={formRef} />
      ) : null}
    </ModalForm>
  );
};

export default UpdateForm;
