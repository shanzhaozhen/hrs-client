import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'antd';
import {ProFormDatePicker, ProFormDigit, ProFormFieldSet, ProFormSelect, ProFormText} from '@ant-design/pro-form';
import type { StaffVO } from "@/services/staff/typings";
import {iconOption} from "@/components/Common/icon";
import {getDictionaryChildrenByCode, getDictionaryChildrenById} from "@/services/dictionary/dictionary";
import RegionSelect from "../../../../components/RegionSelect";

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {

  useEffect(() => {
  }, []);


  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="员工id" hidden={true} />
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="staffCode"
            label="员工编号"
            readonly={false}
            rules={[{ required: true, message: '请输入员工编号' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="staffName"
            label="员工姓名"
            rules={[{ required: true, message: '请输入员工名称' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="depId"
            label="部门ID"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="companyState"
            label="在司状态"
            rules={[{ required: true, message: '请输入在司状态' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('CompanyState', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="duty"
            label="职务"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="post"
            label="岗位"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="postType"
            label="岗位类型"
            rules={[{ required: true, message: '请输入岗位类型' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('PostType', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="sex"
            label="性别"
            options={[
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ]}
            placeholder="请选择性别"
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="nation"
            label="民族"
            rules={[{ required: true, message: '请选择民族' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Nation', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="birthday"
            label="出生日期"
            rules={[{ required: true, message: '请选择出生日期' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="workDate"
            label="开始工作时间"
            rules={[{ required: true, message: '请选择开始工作时间' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="entryDate"
            label="入职日期"
            rules={[{ required: true, message: '请选择入职日期' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="politics"
            label="政治面貌"
            rules={[{ required: true, message: '请选择政治面貌' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Politics', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="education"
            label="最高学历"
            rules={[{ required: true, message: '请选择最高学历' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Education', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="degree"
            label="学位"
            rules={[{ required: true, message: '请选择学位' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Degree', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="maritalStatus"
            label="婚姻状况"
            rules={[{ required: true, message: '请选择婚姻状况' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('MaritalStatus', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="spouseName"
            label="配偶名字"
            placeholder="请输入配偶名字"
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="marriageCertificate"
            label="结婚证件"
            placeholder="请选择结婚证件"
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="marriageDate"
            label="结婚日期"
            placeholder="请选择结婚日期"
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDigit
            width="sm"
            name="childrenNumber"
            label="子女人数"
            placeholder="请输入子女人数"
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="idNumber"
            label="身份证号码"
            rules={[{ required: true, message: '请输入身份证号码' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="phone"
            label="联系电话"
            placeholder="请输入联系电话"
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="socialSecurityNumber"
            label="社保号"
            placeholder="请输入社保号"
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <RegionSelect level={3} />
          <ProFormText
            width="sm"
            name="birthAddressProvince"
            label="出生地(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="birthAddressCity"
            label="出生地(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="nativeAddressProvince"
            label="籍贯(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="nativeAddressCity"
            label="籍贯(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="householdType"
            label="户口类型"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressProvince"
            label="户口地址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressCity"
            label="户口地址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressArea"
            label="户口地址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressDetail"
            label="户口地址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressProvince"
            label="家庭住址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressCity"
            label="家庭住址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressArea"
            label="家庭住址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressDetail"
            label="家庭住址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressProvince"
            label="现住地址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressCity"
            label="现住地址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressArea"
            label="现住地址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressDetail"
            label="现住地址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressProvince"
            label="邮递地址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressCity"
            label="邮递地址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressArea"
            label="邮递地址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressDetail"
            label="邮递地址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactName"
            label="紧急联系人姓名"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactRelation"
            label="紧急联系人关系"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactPhone"
            label="紧急联系人电话"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
