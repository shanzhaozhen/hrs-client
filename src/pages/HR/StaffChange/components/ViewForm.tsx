import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { StaffChangeVO } from '@/services/staff-change/typings';
import FormBody from '@/pages/HR/StaffChange/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';

export interface ViewFormProps {
  viewModalVisible: boolean;
  handleViewModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: StaffChangeVO;
  staffId?: number;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewModalVisible, handleViewModalVisible, onCancel, values, staffId } = props;

  return (
    <ModalForm
      width={748}
      title="查看调动"
      visible={viewModalVisible}
      onVisibleChange={handleViewModalVisible}
      initialValues={values}
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
      {values && Object.keys(values).length ? <FormBody isView staffId={staffId} /> : null}
    </ModalForm>
  );
};

export default ViewForm;
