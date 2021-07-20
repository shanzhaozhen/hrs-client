import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Attendance/AttendanceMonthList/components/FormBody';
import { DrawerForm } from '@ant-design/pro-form';
import type { AttendanceMonthForm, AttendanceMonthVO } from '@/services/attendance-month/typings';

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
        title="查看月度考勤"
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
        {values && Object.keys(values).length ? <FormBody isView={true} /> : null}
      </DrawerForm>
    </>
  );
};

export default ViewForm;
