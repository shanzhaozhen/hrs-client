import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import type { DepartmentForm, DepartmentVO } from '@/services/department/typings';
import FormBody from '@/pages/System/DepartmentList/components/FormBody';
import { updateDepartment } from '@/services/department/department';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

export interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: DepartmentVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onCancel, tableActionRef, values } = props;

  /**
   * 修改部门
   * @param fields
   */
  const handleUpdate = async (fields: DepartmentForm) => {
    const hide = message.loading('正在修改');
    try {
      await updateDepartment({...fields});
      hide();
      message.success('修改成功');
      handleUpdateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
      // message.error(res.message || '修改失败请重试！');
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <ModalForm
      width={748}
      title="修改部门"
      visible={updateModalVisible}
      onVisibleChange={handleUpdateModalVisible}
      initialValues={values}
      modalProps={{
        onCancel,
        destroyOnClose: true,
      }}
      onFinish={handleUpdate}
    >
      <FormBody isEdit={true} />
    </ModalForm>
  );
};

export default UpdateForm;
