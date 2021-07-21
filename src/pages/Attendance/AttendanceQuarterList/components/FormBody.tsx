import React, { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Input, Row } from 'antd';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';
import { ContactsOutlined } from '@ant-design/icons';
import { useDepartmentList } from '@/utils/department';
import StaffSelect from '@/components/StaffSelect';

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, formRef } = props;

  const [staffSelectVisible, handleStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();

  return (
    <>
      <ProFormText name="id" label="季度考勤id" hidden={true} />
      <Row gutter={24}>
        <ProFormText name="staffId" label="员工id" hidden={true} />
        <Col xl={8} lg={12} md={24}>
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
                <ProFormItem name="staffCode" rules={[{ required: true, message: '请选择员工' }]}>
                  <Input placeholder="请选择员工" name="staffCode" disabled />
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
        <Col xl={8} lg={12} md={24}>
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
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="depId"
            label="部门"
            required={true}
            options={departmentList.map((item) => ({ value: item.id || '', label: item.name }))}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="year"
            label="考勤年度"
            rules={[{ required: true, message: '请输入考核年度' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="quarter"
            label="考勤季度"
            rules={[{ required: true, message: '请输入考核季度' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="shouldAttendanceDays"
            label="应出勤天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入应出勤天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="actualAttendanceDays"
            label="实出勤天数"
            min={0}
            rules={[{ required: true, message: '请输入实出勤天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSwitch
            width="md"
            name="freeze"
            label="是否冻结"
            tooltip="冻结的作用主要为工资发放自动生成数据时防止再次重新统计月度考勤时使用，冻结后将不会重新生成季度考勤"
            checkedChildren="是"
            unCheckedChildren="否"
            initialValue={false}
            rules={[{ required: true, message: '请选择是否冻结' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea name="remarks" label="备注" readonly={isView} />
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
          });
          handleStaffSelectVisible(false);
        }}
      />
    </>
  );
};

export default FormBody;
