import React, {useState} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/HR/ResumeList/components/FormBody';
import { DrawerForm } from '@ant-design/pro-form';
import type {ResumeForm, ResumeVO} from "@/services/resume/typings";
import {HistoryOutlined} from "@ant-design/icons";
import {Button} from "antd";
import TransferRecordModal from "@/pages/HR/TransferRecordList/components/ModalBody";

interface ViewFormProps {
  viewDrawerVisible: boolean;
  handleViewDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: ResumeVO | ResumeForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewDrawerVisible, handleViewDrawerVisible, onCancel, values } = props

  const [transferRecordModalVisible, setTransferRecordModalVisible] = useState<boolean>(false);

  return (
    <>
      <DrawerForm
        width={'75%'}
        title={
          <>
            <span style={{ marginRight: 15 }}>查看员工</span>
            <Button
              type="primary"
              icon={<HistoryOutlined />}
              onClick={() => {
                setTransferRecordModalVisible(true);
              }}
            >
              调动记录
            </Button>
          </>
        }
        visible={viewDrawerVisible}
        onVisibleChange={handleViewDrawerVisible}
        initialValues={values}
        drawerProps={{
          onClose: onCancel,
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
      </DrawerForm>

      <TransferRecordModal
        transferRecordModalVisible={transferRecordModalVisible}
        handleTransferRecordModalVisible={setTransferRecordModalVisible}
        resumeId={values?.id}
      />
    </>
  );
};

export default ViewForm;
