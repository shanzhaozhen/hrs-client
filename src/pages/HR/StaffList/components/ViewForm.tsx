import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import FormBody from '@/pages/HR/StaffList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm from '@ant-design/pro-form';

interface ViewFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const ViewForm: React.FC<ViewFormProps> = () => {

  return (
    <>
      <ProDescriptions>
        <ProDescriptions.Item label={"dfdf"}>ddd</ProDescriptions.Item>
        <ProDescriptions.Item label={"dfdf"}>ddd</ProDescriptions.Item>
        <ProDescriptions.Item label={"dfdf"}>ddd</ProDescriptions.Item>
        <ProDescriptions.Item label={"dfdf"}>ddd</ProDescriptions.Item>
        <ProDescriptions.Item label={"dfdf"}>ddd</ProDescriptions.Item>
        <ProDescriptions.Item label={"dfdf"}>ddd</ProDescriptions.Item>
      </ProDescriptions>
      <ProForm>
        <FormBody />
      </ProForm>
    </>
  );
};

export default ViewForm;
