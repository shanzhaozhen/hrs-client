import React from 'react';
import {Col, Row} from "antd";
import {ProFormDatePicker, ProFormText} from "@ant-design/pro-form";

interface ArmyInfoProps {
  isView?: boolean;
}

const ArmyInfo: React.FC<ArmyInfoProps> = (props) => {
  const { isView } = props;

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="troopBase"
            label="部队驻扎地"
            rules={[{ required: false, message: '请输入部队驻扎地' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="enlistmentDate"
            label="入伍时间"
            rules={[{ required: false, message: '请选择入伍时间' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="dischargeDate"
            label="退伍时间"
            rules={[{ required: false, message: '请选择退伍时间' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="dischargeRank"
            label="退伍时军衔"
            rules={[{ required: false, message: '请输入退伍时军衔' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="honour"
            label="立功"
            rules={[{ required: false, message: '请输入立功' }]}
            readonly={isView}
          />
        </Col>
      </Row>
    </>
  );
};

export default ArmyInfo;
