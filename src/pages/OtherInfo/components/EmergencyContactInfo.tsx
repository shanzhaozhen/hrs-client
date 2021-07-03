import React from 'react';
import {Col, Row} from "antd";
import {ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {getDictionaryChildrenByCode} from "@/services/dictionary/dictionary";
import {useOptions} from "@/utils/options";

interface EmergencyContactInfoProps {
  isView?: boolean;
}

const EmergencyContactInfo: React.FC<EmergencyContactInfoProps> = (props) => {
  const { isView } = props;

  const relationOptions = useOptions('Relation');

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'contactName']}
            label="紧急联系人姓名"
            rules={[{ required: false, message: '请输入紧急联系人姓名' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name={['staffInfo', 'contactRelation']}
            label="紧急联系人关系"
            rules={[{ required: false, message: '请选择紧急联系人关系' }]}
            options={relationOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name={['staffInfo', 'contactPhone']}
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
