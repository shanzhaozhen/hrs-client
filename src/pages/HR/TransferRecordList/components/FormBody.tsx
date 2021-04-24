import React, {useEffect, useState} from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import MethodParamInfo from "@/pages/System/TaskList/components/MethodParamInfo";

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = (props) => {

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="调动记录id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="调动记录名称"
            placeholder="请输入调动记录名称"
            rules={[{ required: true, message: '请输入调动记录名称' }]}
          />
        </Col>
        <Col span={24}>
          <Form.Item name="paramInfo" label="参数（请以JSON的方式输入）">
            <MethodParamInfo />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSwitch
            name="open"
            label="开启状态"
            checkedChildren="开启"
            unCheckedChildren="停止"
            fieldProps={{defaultChecked: true}}
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
