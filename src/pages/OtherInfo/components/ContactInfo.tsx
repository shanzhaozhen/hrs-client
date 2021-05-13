import React from 'react';
import {Col, Row} from "antd";
import { ProFormText } from "@ant-design/pro-form";

interface ContactInfoProps {
  isView?: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = (props) => {
  const { isView } = props;

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="phone"
            label="联系电话"
            placeholder="请输入联系电话"
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homePhone"
            label="家庭电话"
            placeholder="请输入联系电话"
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="qq"
            label="QQ"
            placeholder="请输入联系QQ"
            readonly={isView}
          />
        </Col>
      </Row>
    </>
  );
};

export default ContactInfo;
