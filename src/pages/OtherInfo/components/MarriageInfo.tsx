import React from 'react';
import {Col, Row} from "antd";
import {ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {getDictionaryChildrenByCode} from "@/services/dictionary/dictionary";
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import CustomUpload from "@/components/CustomUpload";

interface MarriageInfoProps {
  isView?: boolean;
}

const MarriageInfo: React.FC<MarriageInfoProps> = (props) => {
  const { isView } = props;

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="maritalStatus"
            label="婚姻状况"
            rules={[{ required: false, message: '请选择婚姻状况' }]}
            request={async ({ keyWords }) => {
              const { data } = await getDictionaryChildrenByCode('MaritalStatus', keyWords);
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
            name="spouseName"
            label="配偶名字"
            placeholder="请输入配偶名字"
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="marriageDate"
            label="结婚日期"
            placeholder="请选择结婚日期"
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="spouseEducation"
            label="配偶学历"
            rules={[{ required: false, message: '请选择配偶学历' }]}
            request={async ({ keyWords }) => {
              const { data } = await getDictionaryChildrenByCode('Education', keyWords);
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
            name="spousePhysicalCondition"
            label="配偶身体状况"
            placeholder="请输入配偶身体状况"
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="fertility"
            label="生育情况"
            placeholder="请输入生育情况"
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="sm"
            name="childrenNumber"
            label="子女人数"
            placeholder="请输入子女人数"
            readonly={isView}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormItem
            label="结婚证件"
            name="marriageCertificate"
          >
            <CustomUpload
              type="ProFormUploadDragger"
              listType="picture"
              readonly={isView}
              maxCount={1}
              description="仅能保存单文件"
            />
          </ProFormItem>
        </Col>
      </Row>
    </>
  );
};

export default MarriageInfo;
