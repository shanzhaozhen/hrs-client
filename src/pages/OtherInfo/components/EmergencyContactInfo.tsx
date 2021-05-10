import React from 'react';
import {Col, Row} from "antd";
import {ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {getDictionaryChildrenByCode} from "@/services/dictionary/dictionary";

interface EmergencyContactInfoProps {
  isView?: boolean;
}

const EmergencyContactInfo: React.FC<EmergencyContactInfoProps> = (props) => {
  const { isView } = props;

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactName"
            label="紧急联系人姓名"
            rules={[{ required: false, message: '请输入紧急联系人姓名' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="contactRelation"
            label="紧急联系人关系"
            rules={[{ required: false, message: '请选择紧急联系人关系' }]}
            request={async ({ keyWords }) => {
              const { data } = await getDictionaryChildrenByCode('Relation', keyWords);
              return data ? data.map(item => ({
                value: item.name,
                label: item.name
              })) : []
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactPhone"
            label="紧急联系人电话"
            rules={[{ required: false, message: '请输入部门ID' }]}
            readonly={isView}
          />
        </Col>
      </Row>
    </>
  );
};

export default EmergencyContactInfo;
