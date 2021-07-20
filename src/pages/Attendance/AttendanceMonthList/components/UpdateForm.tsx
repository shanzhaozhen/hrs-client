import React, { useRef } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Attendance/AttendanceMonthList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { DrawerForm } from '@ant-design/pro-form';
import type { AttendanceMonthForm, AttendanceMonthVO } from '@/services/attendance-month/typings';
import { updateAttendanceMonth } from '@/services/attendance-month/attendance-month';

interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: AttendanceMonthForm | AttendanceMonthVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onClose, tableActionRef, values } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 修改月度考勤
   * @param fields
   */
  const handleUpdate = async (fields: AttendanceMonthForm) => {
    const hide = message.loading('正在添加');
    try {
      await updateAttendanceMonth(fields);
      hide();
      message.success('添加成功');
      handleUpdateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <>
      <DrawerForm
        width={'75%'}
        title="修改月度考勤"
        visible={updateModalVisible}
        formRef={formRef}
        initialValues={values}
        onVisibleChange={handleUpdateModalVisible}
        drawerProps={{
          onClose,
          destroyOnClose: true,
        }}
        onFinish={handleUpdate}
      >
        <FormBody formRef={formRef} />
      </DrawerForm>
    </>
  );
};

export default UpdateForm;
