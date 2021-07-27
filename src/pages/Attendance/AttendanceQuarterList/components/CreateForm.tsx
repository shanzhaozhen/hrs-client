import React, { useRef } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Attendance/AttendanceQuarterList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { DrawerForm } from '@ant-design/pro-form';
import { addAttendanceQuarter } from '@/services/attendance-quarter/attendance-quarter';
import type { AttendanceQuarterForm } from '@/services/attendance-quarter/typings';

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 添加季度考勤
   * @param fields
   */
  const handleAdd = async (fields: AttendanceQuarterForm) => {
    const hide = message.loading('正在添加');
    try {
      await addAttendanceQuarter(fields);
      hide();
      message.success('添加成功');
      handleCreateModalVisible(false);
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
        title="新建季度考勤"
        visible={createModalVisible}
        formRef={formRef}
        initialValues={{ freeze: false }}
        onVisibleChange={handleCreateModalVisible}
        drawerProps={{
          destroyOnClose: true,
        }}
        onFinish={handleAdd}
      >
        <FormBody formRef={formRef} />
      </DrawerForm>
    </>
  );
};

export default CreateForm;
