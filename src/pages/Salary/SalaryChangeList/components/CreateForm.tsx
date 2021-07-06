import React, {useEffect, useRef, useState} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import { addSalaryChange } from '@/services/salary-change/salary-change';
import type {SalaryChangeForm, SalaryChangeVO} from '@/services/salary-change/typings';
import FormBody from '@/pages/Salary/SalaryChangeList/components/FormBody';
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

  const [staffChangeInitialValues, setSalaryChangeInitialValues] = useState<SalaryChangeVO>({});

  useEffect(() => {
    if (staffId) {
      getStaffById(staffId).then(({ data }) => {
        setSalaryChangeInitialValues(data ? {
          ...data,
          id: undefined,
          staffId: data.id,
          staffCode: data.staffCode,
          staffName: data.staffName,
          depId: data.depId,
        } : {});
      })
    }
  }, [])


  const formRef = useRef<FormInstance>();

  /**
   * 添加调薪记录
   * @param fields
   */
  const handleAdd = async (fields: SalaryChangeForm) => {
    const hide = message.loading('正在添加');
    try {
      await addSalaryChange({ ...fields });
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
