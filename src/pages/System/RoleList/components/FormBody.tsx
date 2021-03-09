import React from 'react';
import { Col, Row } from 'antd';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = (props) => {
  FormBody.defaultProps = {
    isEdit: false,
  };

  const { isEdit } = props;

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="角色id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="角色名称"
            disabled={isEdit}
            fieldProps={{ autoComplete: 'off' }}
            rules={[{ required: true, message: '请输入您的角色名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="标识名称"
            rules={[{ required: true, message: '请输入您的标识名称' }]}
          />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="description" label="描述" />
        </Col>
      </Row>
    </>
  );
};

export default FormBody;
