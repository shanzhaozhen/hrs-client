import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Performance/PerformanceList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import type { SalaryStaffVO } from "@/services/salary-staff/typings";

interface ViewFormProps {
  viewModalVisible: boolean;
  handleViewModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: SalaryStaffVO;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewModalVisible, handleViewModalVisible, values } = props

  return (
    <>
      <ModalForm
        width={748}
        title="查看绩效评价"
        visible={viewModalVisible}
        onVisibleChange={handleViewModalVisible}
        initialValues={values}
        modalProps={{
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
          <FormBody isView={true} salaryStaffId={values.id} />
        ) : null}
      </ModalForm>
    </>
  );
};

export default ViewForm;
