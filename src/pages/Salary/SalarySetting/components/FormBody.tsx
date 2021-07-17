import React from 'react';
import { Col, Row } from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView } = props;

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="薪资配置id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="year"
            label="考核年度"
            rules={[{ required: true, message: '请输入考核年度' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="quarter"
            label="考核季度"
            rules={[{ required: true, message: '请输入考核季度' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="appraise"
            label="考核等级"
            rules={[{ required: true, message: '请选择考核等级' }]}
            options={[
              {value: 'A', label: 'A'},
              {value: 'B', label: 'B'},
              {value: 'C', label: 'C'},
              {value: 'D', label: 'D'},
              {value: 'E', label: 'E'},
            ]}
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
    </>
  );
};

export default FormBody;
