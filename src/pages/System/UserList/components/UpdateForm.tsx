import React from 'react';
import { message, Modal } from 'antd';

import type { UserForm } from '@/services/user/typings';
import FormBody from '@/pages/System/UserList/components/FormBody';
import { updateUser } from '@/services/user/user';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: UserForm) => void;
  updateModalVisible: boolean;
  // values: UserForm;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onCancel: handleUpdateModalVisible, updateModalVisible, values } = props;

  /**
   * 修改用户
   * @param fields
   */
  const handleUpdate = async (fields: UserForm) => {
    const hide = message.loading('正在添加');
    try {
      await updateUser({ ...fields });
      hide();
      message.success('添加成功');
      handleUpdateModalVisible(false);
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <Modal
      width={748}
      destroyOnClose
      title="修改用户"
      visible={updateModalVisible}
      footer={null}
      onCancel={() => handleUpdateModalVisible()}
    >
      <FormBody isEdit={true} handleSubmit={handleUpdate} initialValues={values} />
    </Modal>
  );
};

export default UpdateForm;
