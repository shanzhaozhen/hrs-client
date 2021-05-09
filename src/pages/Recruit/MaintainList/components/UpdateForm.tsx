import React, {useRef} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {FormInstance, message} from 'antd';
import type { TaskForm, TaskVO } from '@/services/task/typings';
import FormBody from '@/pages/System/TaskList/components/FormBody';
import { updateTask } from '@/services/task/task';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

export interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: TaskVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onCancel, tableActionRef, values } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 修改任务
   * @param fields
   */
  const handleUpdate = async (fields: TaskForm) => {
    const hide = message.loading('正在修改');
    try {
      await updateTask({
        ...fields,
      });
      hide();
      message.success('修改成功');
      handleUpdateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <ModalForm
      width={748}
      title="修改任务"
      visible={updateModalVisible}
      onVisibleChange={handleUpdateModalVisible}
      initialValues={values}
      modalProps={{
        onCancel,
        destroyOnClose: true,
      }}
      formRef={formRef}
      onFinish={handleUpdate}
    >
      <FormBody isEdit={true} formRef={formRef} />
    </ModalForm>
  );
};

export default UpdateForm;
