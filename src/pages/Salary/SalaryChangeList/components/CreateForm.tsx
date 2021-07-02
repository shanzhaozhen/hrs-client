import React, {useEffect, useRef, useState} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import { addStaffChange } from '@/services/staff-change/staff-change';
import type {StaffChangeForm, StaffChangeVO} from '@/services/staff-change/typings';
import FormBody from '@/pages/HR/StaffChangeList/components/FormBody';
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

  const [staffChangeInitialValues, setStaffChangeInitialValues] = useState<StaffChangeVO>({});

  useEffect(() => {
    if (staffId) {
      getStaffById(staffId).then(({ data }) => {
        setStaffChangeInitialValues(data ? {
          ...data,
          id: undefined,
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
      })
    }
  }, [])


  const formRef = useRef<FormInstance>();

  /**
   * 添加调动记录
   * @param fields
   */
  const handleAdd = async (fields: StaffChangeForm) => {
    const hide = message.loading('正在添加');
    try {
      await addStaffChange({ ...fields });
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
      <ModalForm
        width={748}
        title="新建调动"
        visible={createModalVisible}
        onVisibleChange={handleCreateModalVisible}
        formRef={formRef}
        initialValues={staffChangeInitialValues}
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={handleAdd}
      >
        {!staffId || staffChangeInitialValues && Object.keys(staffChangeInitialValues).length ? (
          <FormBody staffId={staffId} formRef={formRef} />
        ) : null}
      </ModalForm>
    </>
  );
};

export default CreateForm;
