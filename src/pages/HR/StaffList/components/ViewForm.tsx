import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import { DrawerForm } from '@ant-design/pro-form';
import type { StaffVO } from "@/services/staff/typings";
import {HistoryOutlined} from "@ant-design/icons";
import {Button} from "antd";

interface ViewFormProps {
  viewDrawerVisible: boolean;
  handleViewDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: StaffVO;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewDrawerVisible, handleViewDrawerVisible, onCancel, values } = props

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
    </>
  );
};


export default ViewForm;
