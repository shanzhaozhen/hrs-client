import React, {useState} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Performance/PerformanceSettingList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import SalaryChangeModal from "@/pages/Salary/SalaryChangeList/components/ModalBody";
import type { SalaryStaffVO } from "@/services/salary-staff/typings";

interface ViewFormProps {
  viewModalVisible: boolean;
  handleViewModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: SalaryStaffVO;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewModalVisible, handleViewModalVisible, values } = props

  const [staffChangeModalVisible, setSalaryChangeModalVisible] = useState<boolean>(false);

  return (
    <>
      <ModalForm
        width={748}
        title="查看绩效设置"
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

      <SalaryChangeModal
        staffChangeModalVisible={staffChangeModalVisible}
        handleSalaryChangeModalVisible={setSalaryChangeModalVisible}
        staffId={values?.staffId}
      />
    </>
  );
};

export default ViewForm;
