import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import type { RegionForm, RegionVO } from '@/services/region/typings';
import FormBody from '@/pages/System/RegionList/components/FormBody';
import { updateRegion } from '@/services/region/region';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

export interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: RegionVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onCancel, tableActionRef, values } = props;

  /**
   * 修改区域
   * @param fields
   */
  const handleUpdate = async (fields: RegionForm) => {
    const hide = message.loading('正在修改');
    try {
      await updateRegion(fields);
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
      title="修改区域"
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
