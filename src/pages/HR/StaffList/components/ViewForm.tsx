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
        // onFinish={handleUpdate}
        onFinish={async (formData) => {
          console.log(formData)
        }}
        submitter={{
          resetButtonProps: {
            type: 'dashed',
            name: '提交'
          },
          submitButtonProps: {
            title: '提交'
          },
        }}
      >
        {values && Object.keys(values).length ? (
          <FormBody isEdit={true} values={values} />
        ) : null}
      </DrawerForm>
    </>
  );
};

export default ViewForm;
