import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import { DrawerForm } from '@ant-design/pro-form';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import { HistoryOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import StaffChangeModal from '@/pages/HR/StaffChange/components/ModalBody';

interface ViewFormProps {
  viewDrawerVisible: boolean;
  handleViewDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  values?: StaffVO | StaffForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewDrawerVisible, handleViewDrawerVisible, onClose, values } = props;

  const [staffChangeModalVisible, handleStaffChangeModalVisible] = useState<boolean>(false);

  return (
    <>
      <DrawerForm
        width={'80%'}
        title={
          <>
            <span style={{ marginRight: 15 }}>查看员工</span>
            <Button
              type="primary"
              icon={<HistoryOutlined />}
              onClick={() => {
                handleStaffChangeModalVisible(true);
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
        {values && Object.keys(values).length ? <FormBody isView={true} values={values} /> : null}
      </DrawerForm>

      <StaffChangeModal
        staffChangeModalVisible={staffChangeModalVisible}
        handleStaffChangeModalVisible={handleStaffChangeModalVisible}
        staffId={values?.id}
      />
    </>
  );
};

export default ViewForm;
