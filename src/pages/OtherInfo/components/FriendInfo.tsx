import React from 'react';
import {Col, Row} from "antd";
import { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import {useOptions} from "@/utils/options";

interface FriendInfoProps {
  isView?: boolean;
}

const FriendInfo: React.FC<FriendInfoProps> = (props) => {
  const { isView } = props;

  const relationOptions = useOptions('Relation');

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="friendName"
            label="亲友姓名"
            rules={[{ required: false, message: '请输入亲友姓名' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="friendRelation"
            label="亲友关系"
            rules={[{ required: false, message: '请选择亲友关系' }]}
            options={relationOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="friendDepartment"
            label="亲友部门"
            rules={[{ required: false, message: '请输入亲友部门' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="friendDuty"
            label="亲友职务"
            rules={[{ required: false, message: '请输入亲友职务' }]}
            readonly={isView}
          />
        </Col>
      </Row>
    </>
  );
};

export default FriendInfo;
