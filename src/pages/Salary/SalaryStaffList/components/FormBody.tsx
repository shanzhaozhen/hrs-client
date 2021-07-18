import React, { useState } from 'react';
import type {MutableRefObject} from 'react';
import type { FormInstance } from 'antd';
import {Button, Col, Input, Row} from 'antd';
import {ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import {ContactsOutlined} from "@ant-design/icons";
import {useDepartmentList} from "@/utils/department";
import StaffSelect from "@/components/StaffSelect";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, formRef } = props;

  const [staffSelectVisible, handleStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();

  const defaultOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' }
  ];

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="调动记录id" hidden={true} />
        <ProFormText name="staffId" label="员工id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          {isView ? (
            <ProFormText
              width="md"
              name="staffCode"
              label="员工编号"
              placeholder="员工编号"
              required={true}
              readonly={isView}
              disabled
            />
          ) : (
            <ProFormItem label="员工编号" required={true}>
              <Input.Group compact>
                <ProFormItem
                  name="staffCode"
                  rules={[{ required: true, message: '请选择员工' }]}
                  style={{ width: '218px' }}
                >
                  <Input
                    placeholder="请选择员工"
                    name="staffCode"
                    disabled
                  />
                </ProFormItem>
                <Button
                  type="primary"
                  icon={<ContactsOutlined />}
                  onClick={() => handleStaffSelectVisible(true)}
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
            required={true}
            placeholder="员工姓名"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="depId"
            label="部门"
            required={true}
            options={departmentList.map(item => ({value: item.id || '', label: item.name}))}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="basicSalary"
            label="基础工资"
            rules={[{ required: true, message: '请输入基础工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="postSalary"
            label="岗位工资"
            rules={[{ required: true, message: '请输入岗位工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSwitch
            width="md"
            name="haveOneChildAllowance"
            label="是否享有独生子女津贴"
            rules={[{ required: true, message: '请选择是否享有独生子女津贴' }]}
            checkedChildren="是"
            unCheckedChildren="否"
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="safetyAllowance"
            label="安全津贴档次"
            rules={[{ required: true, message: '请选择安全津贴档次' }]}
            options={defaultOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="highTemperatureAllowance"
            label="高温津贴档次"
            rules={[{ required: true, message: '请选择高温津贴档次' }]}
            options={defaultOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea
            name="remarks"
            label="备注"
            readonly={isView}
          />
        </Col>
      </Row>


      <StaffSelect
        staffSelectVisible={staffSelectVisible}
        handleStaffSelectVisible={handleStaffSelectVisible}
        onSelectAction={(selectValue) => {
          const currentFormValue = formRef?.current.getFieldsValue();
          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            depId: selectValue.depId,
          })
          handleStaffSelectVisible(false);
        }}
      />
    </>
  );
};

export default FormBody;
