import React from 'react';
import {Col, Row} from "antd";
import {ProFormText} from "@ant-design/pro-form";

interface PhysicalInfoProps {
  isView?: boolean;
}

const PhysicalInfo: React.FC<PhysicalInfoProps> = (props) => {
  const { isView } = props;

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'physicalCondition']}
            label="本人身体状况"
            rules={[{ required: false, message: '请输入本人身体状况' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'weight']}
            label="体重(KG)"
            rules={[{ required: false, message: '请输入体重(KG)' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'height']}
            label="身高(CM)"
            rules={[{ required: false, message: '请输入身高(CM)' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'vision']}
            label="视力"
            rules={[{ required: false, message: '请输入视力' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'bloodType']}
            label="血型"
            rules={[{ required: false, message: '请输入血型' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'medicalHistory']}
            label="遗传病史或传染病"
            rules={[{ required: false, message: '请输入遗传病史或传染病' }]}
            readonly={isView}
          />
        </Col>
      </Row>
    </>
  );
};

export default PhysicalInfo;
