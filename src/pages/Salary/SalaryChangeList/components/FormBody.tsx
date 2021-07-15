import React, { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FormInstance } from 'antd';
import {Button, Col, Input, message, Row} from 'antd';
import {ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import { useDepartmentList } from "@/utils/department";
import { ContactsOutlined } from "@ant-design/icons";
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import StaffSelect from "@/components/StaffSelect";
import { getSalaryStaffByStaffId } from "@/services/salary-staff/salary-staff";

interface FormProps {
  isEdit?: boolean;
  staffId?: number;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { staffId, formRef } = props;

  const [staffSelectVisible, setStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="调薪记录id" hidden={true} />
        <ProFormText name="staffId" label="员工id" hidden={true}/>
        <Col xl={12} lg={12} md={24}>
          {staffId ? (
            <ProFormText
              width="md"
              name="staffCode"
              label="员工编号"
              placeholder="员工编号"
              rules={[{ required: true, message: '不是有效的员工' }]}
              disabled
            />
          ) : (
            <ProFormItem label="员工编号">
              <Input.Group compact>
                <ProFormItem
                  name="staffCode"
                  rules={[{ required: true, message: '请选择员工' }]} style={{ width: '218px' }}>
                  style={{ width: '218px' }}
                  <Input
                    placeholder="请选择员工"
                    name="staffCode"
                    disabled
                  />
                </ProFormItem>
                <Button
                  type="primary"
                  icon={<ContactsOutlined />}
                  onClick={() => setStaffSelectVisible(true)}
                >
                  选择员工
                </Button>
              </Input.Group>
            </ProFormItem>
          )}
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="staffName"
            label="员工姓名"
            placeholder="员工姓名"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="depId"
            label="部门"
            options={departmentList.map(item => ({value: item.id || '', label: item.name}))}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker
            width="md"
            name="effectiveDate"
            label="生效日期"
            rules={[{ required: true, message: '请选择生效日期' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="preBasicSalary"
            label="变更前基础工资"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="postBasicSalary"
            label="变更后基础工资"
            rules={[{ required: true, message: '请填写变更后基础工资' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="prePostSalary"
            label="变更前岗位工资"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="postPostSalary"
            label="变更后岗位工资"
            rules={[{ required: true, message: '请填写变更后岗位工资' }]}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea name="remarks" label="备注" />
        </Col>
      </Row>

      <StaffSelect
        staffSelectVisible={staffSelectVisible}
        handleStaffSelectVisible={setStaffSelectVisible}
        onSelectAction={async (selectValue) => {
          const currentFormValue = formRef?.current.getFieldsValue();
          if (!selectValue.id) {
            message.error('没有选中有效的员工！');
            return;
          }
          const { data } = await getSalaryStaffByStaffId(selectValue.id);

          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            depId: selectValue.depId,
            preBasicSalary: data?.basicSalary,
            prePostSalary: data?.postSalary,
          })
          setStaffSelectVisible(false);
        }}
      />
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
