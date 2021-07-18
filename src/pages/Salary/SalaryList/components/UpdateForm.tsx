import React, {useRef} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type {FormInstance} from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Salary/SalaryList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { DrawerForm } from "@ant-design/pro-form";
import type { SalaryForm, SalaryVO } from "@/services/salary/typings";
import { updateSalary } from "@/services/salary/salary";
import {onFormValuesChange} from "@/pages/Salary/SalaryList";

interface UpdateFormProps {
  updateModalVisible: boolean;
  handleUpdateModalVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: SalaryForm | SalaryVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, handleUpdateModalVisible, onClose, tableActionRef, values } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 修改薪资发放
   * @param fields
   */
  const handleUpdate = async (fields: SalaryForm) => {
    const hide = message.loading('正在添加');
    try {
      await updateSalary(fields);
      hide();
      message.success('添加成功');
      handleUpdateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <>
      <DrawerForm
        width={748}
        title="修改薪资发放"
        visible={updateModalVisible}
        formRef={formRef}
        initialValues={values}
        onVisibleChange={handleUpdateModalVisible}
        onValuesChange={(changedValues: any, allValues: any) => {
          onFormValuesChange(changedValues, allValues, formRef);
        }}
        drawerProps={{
          onClose,
          destroyOnClose: true,
        }}
        onFinish={handleUpdate}
      >
        <FormBody formRef={formRef} />
      </DrawerForm>
    </>
  );
};

export default UpdateForm;
