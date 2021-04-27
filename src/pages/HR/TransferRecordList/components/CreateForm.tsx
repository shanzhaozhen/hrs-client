import React, {useEffect, useRef, useState} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import { addTransferRecord } from '@/services/transfer-record/transfer-record';
import type {TransferRecordForm, TransferRecordVO} from '@/services/transfer-record/typings';
import FormBody from '@/pages/HR/TransferRecordList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import {getStaffById} from "@/services/staff/staff";

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  staffId?: number;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef, staffId } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [transferRecordInitialValues, setTransferRecordInitialValues] = useState<TransferRecordVO>({});

  useEffect(() => {
    try {
      if (staffId) {
        getStaffById(staffId).then(({ data }) => {
          setTransferRecordInitialValues(data ? {
            ...data,
            staffId: data.id,
            staffCode: data.staffCode,
            staffName: data.staffName,
            preDepId: data.depId,
            preDuty: data.duty,
            prePost: data.post,
            prePostType: data.postType,
            prePostLevel: data.postLevel,
            postDepId: data.depId,
            postDuty: data.duty,
            postPost: data.post,
            postPostType: data.postType,
            postPostLevel: data.postLevel,
          } : {});
          setLoading(false);
        })
      }
    } finally {
      setLoading(false);
    }
  }, [])


  const formRef = useRef<FormInstance>();

  /**
   * 添加调动记录
   * @param fields
   */
  const handleAdd = async (fields: TransferRecordForm) => {
    const hide = message.loading('正在添加');
    try {
      await addTransferRecord({ ...fields });
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
      {
        !loading &&
        <ModalForm
          width={748}
          title="新建调动"
          visible={createModalVisible}
          onVisibleChange={handleCreateModalVisible}
          formRef={formRef}
          initialValues={transferRecordInitialValues}
          modalProps={{
            destroyOnClose: true,
          }}
          onFinish={handleAdd}
        >
          <FormBody staffId={staffId} formRef={formRef} />
        </ModalForm>
      }
    </>
  );
};

export default CreateForm;
