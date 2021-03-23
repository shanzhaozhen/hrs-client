import React from 'react';
import { Col, Row } from 'antd';
import {ProFormSwitch, ProFormText, ProFormTextArea} from '@ant-design/pro-form';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="任务id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="任务名称"
            placeholder="请输入任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="code"
            label="cron表达式"
            placeholder="请输入cron表达式"
            rules={[{ required: true, message: '请输入cron表达式' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSwitch
            name="accountNonExpired"
            label="开启状态"
            checkedChildren="开启"
            unCheckedChildren="停止"
            fieldProps={{ defaultChecked: true }}
          />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="description" label="描述" />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
