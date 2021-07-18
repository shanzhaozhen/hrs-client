import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Salary/SalaryList/components/FormBody';
import {DrawerForm} from '@ant-design/pro-form';
import type {SalaryForm, SalaryVO} from "@/services/salary/typings";

interface ViewFormProps {
  viewModalVisible: boolean;
  handleViewModalVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  values?: SalaryVO | SalaryForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewModalVisible, handleViewModalVisible, onClose, values } = props

  return (
    <>
      <DrawerForm
        width={748}
        title="查看薪资发放"
        visible={viewModalVisible}
        onVisibleChange={handleViewModalVisible}
        initialValues={values}
        drawerProps={{
          onClose,
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
          <FormBody isView={true} />
        ) : null}
      </DrawerForm>
    </>
  );
};

export default ViewForm;
