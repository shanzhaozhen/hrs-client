import React, { Dispatch, SetStateAction } from 'react';
import { message } from 'antd';

import type { UserForm, UserVO } from '@/services/user/typings';
import FormBody from '@/pages/System/UserList/components/FormBody';
import { updateUser } from '@/services/user/user';
import { ModalForm } from '@ant-design/pro-form';

export interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: UserVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onCancel, values } = props;

  /**
   * 修改用户
   * @param fields
   */
  const handleUpdate = async (fields: UserForm) => {
    const hide = message.loading('正在修改');
    try {
      const res = await updateUser(fields);
      if (res.code === 0) {
        hide();
        message.success('修改成功');
        handleUpdateModalVisible(false);
      } else {
        hide();
        message.error(res.message || '修改失败请重试！');
      }
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <ModalForm
      width={748}
      title="修改用户"
      visible={updateModalVisible}
      onVisibleChange={handleUpdateModalVisible}
      initialValues={values}
      modalProps={{
        onCancel,
        destroyOnClose: true,
      }}
      onFinish={handleUpdate}
    >
      <FormBody isEdit={true} handleSubmit={handleUpdate} />
    </ModalForm>
  );
};

export default UpdateForm;
