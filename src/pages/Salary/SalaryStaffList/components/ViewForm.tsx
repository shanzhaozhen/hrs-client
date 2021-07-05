import React, {useState} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Salary/SalaryStaffList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import type {StaffForm, StaffVO} from "@/services/staff/typings";
import {HistoryOutlined} from "@ant-design/icons";
import {Button} from "antd";
import StaffChangeModal from "@/pages/HR/StaffChangeList/components/ModalBody";

interface ViewFormProps {
  viewModalVisible: boolean;
  handleViewModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: StaffVO | StaffForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewModalVisible, handleViewModalVisible, values } = props

  const [staffChangeModalVisible, setStaffChangeModalVisible] = useState<boolean>(false);

  return (
    <>
      <ModalForm
        width={748}
        title={
          <>
            <span style={{ marginRight: 15 }}>查看员工薪资</span>
            <Button
              type="primary"
              icon={<HistoryOutlined />}
              onClick={() => {
                setStaffChangeModalVisible(true);
              }}
            >
              调薪记录
            </Button>
          </>
        }
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
          <FormBody isView={true} values={values} />
        ) : null}
      </ModalForm>

      <StaffChangeModal
        staffChangeModalVisible={staffChangeModalVisible}
        handleStaffChangeModalVisible={setStaffChangeModalVisible}
        staffId={values?.id}
      />
    </>
  );
};

export default ViewForm;
