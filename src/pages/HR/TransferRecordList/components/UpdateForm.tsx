import React, {useRef} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import type { TransferRecordForm, TransferRecordVO } from '@/services/transfer-record/typings';
import FormBody from '@/pages/HR/TransferRecordList/components/FormBody';
import { updateTransferRecord } from '@/services/transfer-record/transfer-record';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

export interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: TransferRecordVO;
  staffId?: number;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onCancel, tableActionRef, values, staffId } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 修改调动记录
   * @param fields
   */
  const handleUpdate = async (fields: TransferRecordForm) => {
    const hide = message.loading('正在修改');
    try {
      await updateTransferRecord({
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
      title="修改调动"
      visible={updateModalVisible}
      onVisibleChange={handleUpdateModalVisible}
      initialValues={values}
      modalProps={{
        onCancel,
        destroyOnClose: true,
      }}
      onFinish={handleUpdate}
    >
      <FormBody isEdit={true} formRef={formRef} />
    </ModalForm>
  );
};

export default UpdateForm;
