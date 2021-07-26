import React, { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Input, message, Row } from 'antd';
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useDepartmentList } from '@/utils/department';
import { ContactsOutlined } from '@ant-design/icons';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';
import StaffSelect from '@/components/StaffSelect';
import { getSalaryStaffByStaffId } from '@/services/salary-staff/salary-staff';

interface FormProps {
  isView?: boolean;
  staffId?: number;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { staffId, isView, formRef } = props;

  const [staffSelectVisible, handleStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();

  return (
    <>
      <ProFormText name="id" label="调薪记录id" hidden={true} />
      <ProFormText name="staffId" label="员工id" hidden={true} />
      <ProFormSwitch name="executed" label="是否已执行" hidden={true} />
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24}>
          {staffId || isView ? (
            <ProFormText
              width="md"
              name="staffCode"
              label="员工编号"
              placeholder="员工编号"
              rules={[{ required: true, message: '不是有效的员工' }]}
              readonly={isView}
              disabled
            />
          ) : (
            <ProFormItem label="员工编号">
              <Input.Group compact>
                <ProFormItem
                  name="staffCode"
                  rules={[{ required: true, message: '请选择员工' }]}
                  style={{ width: '218px' }}
                >
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
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="staffName"
            label="员工姓名"
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
            options={departmentList.map((item) => ({ value: item.id || '', label: item.name }))}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker
            width="md"
            name="effectiveDate"
            label="生效日期"
            tooltip="生效日期为该员工公布组织架构变化（或资格等级）的日期"
            rules={[{ required: true, message: '请选择生效日期' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="preBasicSalary"
            label="变更前基础工资"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="postBasicSalary"
            label="变更后基础工资"
            rules={[{ required: true, message: '请填写变更后基础工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="prePostSalary"
            label="变更前岗位工资"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="postPostSalary"
            label="变更后岗位工资"
            rules={[{ required: true, message: '请填写变更后岗位工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="preAccumulationFund"
            label="变更前公积金基数"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="postAccumulationFund"
            label="变更后公积金基数"
            rules={[{ required: true, message: '请填写变更后公积金基数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSwitch
            width="md"
            name="preHaveOneChildAllowance"
            label="变更前是否享有独生子女津贴"
            checkedChildren="是"
            unCheckedChildren="否"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSwitch
            width="md"
            name="postHaveOneChildAllowance"
            label="变更后是否享有独生子女津贴"
            rules={[{ required: true, message: '请选择是否享有独生子女津贴' }]}
            checkedChildren="是"
            unCheckedChildren="否"
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="preSafetyGrade"
            label="变更前安全津贴档次"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postSafetyGrade"
            label="变更后安全津贴档次"
            rules={[{ required: true, message: '请选择安全津贴档次' }]}
            options={[
              { label: 'A', value: 'A' },
              { label: 'B', value: 'B' },
              { label: 'C', value: 'C' },
              { label: '不享有', value: '不享有' },
            ]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="preHotWeatherGrade"
            label="变更前高温津贴档次"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postHotWeatherGrade"
            label="变更后高温津贴档次"
            rules={[{ required: true, message: '请选择高温津贴档次' }]}
            options={[
              { label: 'A', value: 'A' },
              { label: 'B', value: 'B' },
              { label: 'C', value: 'C' },
              { label: '不享有', value: '不享有' },
            ]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker
            width="md"
            name="changeDate"
            label="变更日期"
            tooltip="变更日期为到达这个时间后，将会变更为本次的修改值"
            rules={[{ required: true, message: '请选择变更日期' }]}
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
            preAccumulationFund: data?.accumulationFund,
            preHaveOneChildAllowance: data?.haveOneChildAllowance,
            preSafetyGrade: data?.safetyGrade,
            preHotWeatherGrade: data?.hotWeatherGrade,
          });
          handleStaffSelectVisible(false);
        }}
      />
    </>
  );
};

export default FormBody;
