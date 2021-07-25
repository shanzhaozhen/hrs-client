import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { DrawerForm } from '@ant-design/pro-form';
import type { AttendanceMonthForm, AttendanceMonthVO } from '@/services/attendance-month/typings';
import FormBody from '@/pages/Salary/SalarySetting/components/FormBody';

interface ViewFormProps {
  viewDrawerVisible: boolean;
  handleViewDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  values?: AttendanceMonthVO | AttendanceMonthForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewDrawerVisible, handleViewDrawerVisible, onClose, values } = props;

  return (
    <>
      <DrawerForm
        width={'75%'}
        title="查看薪资配置"
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
        {values && Object.keys(values).length ? <FormBody viewState={true} /> : null}
      </DrawerForm>
    </>
  );
};

export default ViewForm;
