import React, {useEffect, useState} from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { StaffVO } from "@/services/staff/typings";

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
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="staffCode"
            label="员工编号"
            readonly={false}
            rules={[{ required: true, message: '请输入员工编号' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="staffName"
            label="员工姓名"
            rules={[{ required: true, message: '请输入员工名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="depId"
            label="部门ID"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="companyState"
            label="在司状态"
            rules={[{ required: true, message: '请输入在司状态' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="duty"
            label="职务"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="post"
            label="岗位"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="postType"
            label="岗位类型"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="sex"
            label="性别"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="nation"
            label="民族"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="birthday"
            label="出生日期"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="workDate"
            label="开始工作时间"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="entryDate"
            label="入职日期"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="politics"
            label="政治面貌"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>




        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="education"
            label="最高学历"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="degree"
            label="学位"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="maritalStatus"
            label="婚姻状况"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="spouseName"
            label="配偶名字"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="marriageCertificate"
            label="结婚证件"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="marriageDate"
            label="结婚日期"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="childrenNumber"
            label="子女人数"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="idNumber"
            label="身份证号码"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="socialSecurityNumber"
            label="社保号"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="birthAddressProvince"
            label="出生地(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="birthAddressCity"
            label="出生地(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="nativeAddressProvince"
            label="籍贯(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="nativeAddressCity"
            label="籍贯(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="householdType"
            label="户口类型"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="registeredAddressProvince"
            label="户口地址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="registeredAddressCity"
            label="户口地址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="registeredAddressArea"
            label="户口地址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="registeredAddressDetail"
            label="户口地址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="homeAddressProvince"
            label="家庭住址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="homeAddressCity"
            label="家庭住址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="homeAddressArea"
            label="家庭住址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="homeAddressDetail"
            label="家庭住址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="currentAddressProvince"
            label="现住地址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="currentAddressCity"
            label="现住地址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="currentAddressArea"
            label="现住地址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="currentAddressDetail"
            label="现住地址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="postalAddressProvince"
            label="邮递地址(省)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="postalAddressCity"
            label="邮递地址(市)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="postalAddressArea"
            label="邮递地址(区)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="postalAddressDetail"
            label="邮递地址(详细)"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="contactName"
            label="紧急联系人姓名"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="contactRelation"
            label="紧急联系人关系"
            rules={[{ required: true, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
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
