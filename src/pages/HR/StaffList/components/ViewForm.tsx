import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import { DrawerForm } from '@ant-design/pro-form';
import type { StaffVO } from "@/services/staff/typings";

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
        title="查看员工"
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
