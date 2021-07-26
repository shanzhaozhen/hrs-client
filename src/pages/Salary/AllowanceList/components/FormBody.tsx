import React, { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Input, Row } from 'antd';
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
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
      <ProFormText name="id" label="津贴数据id" hidden={true} />
      <ProFormText name="staffId" label="员工id" hidden={true} />
      <Row gutter={24}>
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
            options={departmentList.map((item) => ({ value: item.id || '', label: item.name }))}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDatePicker.Month
            width="md"
            name="month"
            label="津贴月份"
            rules={[{ required: true, message: '请选择津贴月份' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="backSalary"
            label="补发工资"
            rules={[{ required: true, message: '请输入补发工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="annualBonus"
            label="年终奖"
            rules={[{ required: true, message: '请输入年终奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="safetyBonus"
            label="安全奖"
            rules={[{ required: true, message: '请输入安全奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="stabilityBonus"
            label="综治奖"
            rules={[{ required: true, message: '请输入综治奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="familyPlanningBonus"
            label="计生奖"
            rules={[{ required: true, message: '请输入计生奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="excellenceBonus"
            label="先进奖"
            rules={[{ required: true, message: '请输入先进奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="specialBonus"
            label="专项奖"
            rules={[{ required: true, message: '请输入专项奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="mealAllowance"
            label="就餐补贴"
            rules={[{ required: true, message: '请输入就餐补贴（元/月）' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowance"
            label="交通补贴"
            rules={[{ required: true, message: '请输入交通补贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="communicationAllowance"
            label="通讯补贴"
            rules={[{ required: true, message: '请输入通讯补贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="festivalAllowance"
            label="节日慰问金"
            rules={[{ required: true, message: '请输入节日慰问金' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="otherAllowance"
            label="其他补贴"
            rules={[{ required: true, message: '请输入其他补贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="birthdayCard"
            label="生日卡"
            rules={[{ required: true, message: '请输入生日卡' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="coolDrink"
            label="清凉饮料"
            rules={[{ required: true, message: '请输入清凉饮料' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="condolenceGoods"
            label="慰问品"
            rules={[{ required: true, message: '请输入慰问品' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="rent"
            label="房租"
            rules={[{ required: true, message: '请输入房租' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="phoneBill"
            label="话费"
            rules={[{ required: true, message: '请输入话费' }]}
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
