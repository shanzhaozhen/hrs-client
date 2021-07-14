import React, { useState } from 'react';
import type {MutableRefObject} from 'react';
import type { FormInstance } from 'antd';
import { Col, Row } from 'antd';
import {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';
import StaffSelect from "@/components/StaffSelect";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, formRef } = props;

  const [staffSelectVisible, setStaffSelectVisible] = useState<boolean>(false);

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="绩效设置id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="名称"
            placeholder="可先填写考核月份自动生成"
            rules={[{ required: true, message: '请输入名称' }]}
            readonly={isView}
          />
        </Col>
        {
          !isView && (
            <Col xl={12} lg={12} md={24}>
              <ProFormDateRangePicker
                width="md"
                name="month"
                label="考核起止月份"
                fieldProps={{
                  picker: 'month',
                  format: 'YYYY-MM',
                }}
                rules={[{ required: true, message: '请选择考核起止月份' }]}
              />
            </Col>
          )
        }
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker.Month
            width="md"
            name="startMonth"
            label="开始考核月份"
            rules={[{ required: true, message: '请选择开始考核月份' }]}
            readonly={isView}
            hidden={!isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker.Month
            width="md"
            name="endMonth"
            label="结束考核月份"
            rules={[{ required: true, message: '请选择结束考核月份' }]}
            readonly={isView}
            hidden={!isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="year"
            label="考核年度"
            rules={[{ required: true, message: '请输入考核年度' }]}
            min={1000}
            max={9999}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="quarter"
            label="考核季度"
            rules={[{ required: true, message: '请输入考核季度' }]}
            min={1}
            max={12}
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
        handleStaffSelectVisible={setStaffSelectVisible}
        onSelectAction={(selectValue) => {
          const currentFormValue = formRef?.current.getFieldsValue();
          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            depId: selectValue.depId,
          })
          setStaffSelectVisible(false);
        }}
      />
    </>
  );
};

export default FormBody;
