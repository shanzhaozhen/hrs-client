import React from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { message } from 'antd';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import FormBody, {convertStaffForm} from '@/pages/HR/StaffList/components/FormBody';
import { updateStaff } from '@/services/staff/staff';
import { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';

export interface UpdateFormProps {
  updateDrawerVisible: boolean;
  handleUpdateDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: StaffVO;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateDrawerVisible, handleUpdateDrawerVisible, onCancel, tableActionRef, values } = props;

  /**
   * 修改员工
   * @param fields
   */
  const handleUpdate = async (fields: StaffForm) => {
    const hide = message.loading('正在修改');
    console.log(fields)
    const convertStaffForm1 = convertStaffForm(fields);
    console.log(convertStaffForm1)
    try {
      await updateStaff(convertStaffForm(fields));
      hide();
      message.success('修改成功');
      handleUpdateDrawerVisible(false);
      tableActionRef.current?.reloadAndRest?.();
      // message.error(res.message || '修改失败请重试！');
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  return (
    <DrawerForm
      width={'75%'}
      title="修改员工"
      visible={updateDrawerVisible}
      onVisibleChange={handleUpdateDrawerVisible}
      initialValues={values}
      drawerProps={{
        onClose: onCancel,
        destroyOnClose: true,
      }}
      onFinish={handleUpdate}
      // onFinish={async (formData) => {
      //   console.log(formData)
      // }}
      // submitter={{
      //   searchConfig: {
      //     submitText: '提交',
      //     resetText: '取消',
      //   },
      // }}
    >
      {values && Object.keys(values).length ? (
        <FormBody values={values} />
      ) : null}
    </DrawerForm>
  );
};

export default UpdateForm;
