import React, {useEffect, useState} from 'react';
import type { FormInstance } from 'antd';
import {Col, Form, Row, Tabs} from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type {StaffForm, StaffVO} from "@/services/staff/typings";
import { getDictionaryChildrenByCode } from "@/services/dictionary/dictionary";
import RegionSelect from "@/components/RegionSelect";
import type { RegionType } from "@/services/region/typings";
import CustomUpload from "@/components/CustomUpload";
import EducationalExperienceList from "@/pages/HR/StaffList/components/EducationalExperienceList";
import WorkExperienceList from "@/pages/HR/StaffList/components/WorkExperienceList";
import CertificateList from "@/pages/HR/StaffList/components/CertificateList";
import FamilyList from "@/pages/HR/StaffList/components/FamilyList";
import FormTreeSelect from "@/components/FormTreeSelect";
import {useDepartmentTree} from "@/utils/department";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  values?: StaffForm | StaffVO;
  workExperienceForm: FormInstance;
  educationalExperienceForm: FormInstance;
  certificateForm: FormInstance;
  familyForm: FormInstance;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, isEdit, values } = props;

  const [birthAddress, setBirthAddress] = useState<RegionType>({})
  const [nativeAddress, setNativeAddress] = useState<RegionType>({})
  const [registeredAddress, setRegisteredAddress] = useState<RegionType>({})
  const [homeAddress, setHomeAddress] = useState<RegionType>({})
  const [currentAddress, setCurrentAddress] = useState<RegionType>({})
  const [postalAddress, setPostalAddress] = useState<RegionType>({})

  const departmentTree = useDepartmentTree();

  useEffect(() => {
    if (values) {
      setBirthAddress({
        province: values.birthAddressProvince,
        city: values.birthAddressCity
      });
      setNativeAddress({
        province: values.nativeAddressProvince,
        city: values.nativeAddressCity
      })
      setRegisteredAddress({
        province: values.registeredAddressProvince,
        city: values.registeredAddressCity,
        area: values.registeredAddressArea,
        detail: values.registeredAddressDetail
      })
      setHomeAddress({
        province: values.homeAddressProvince,
        city: values.homeAddressCity,
        area: values.homeAddressArea,
        detail: values.homeAddressDetail
      })
      setCurrentAddress({
        province: values.currentAddressProvince,
        city: values.currentAddressCity,
        area: values.currentAddressArea,
        detail: values.currentAddressDetail
      })
      setPostalAddress({
        province: values.postalAddressProvince,
        city: values.postalAddressCity,
        area: values.postalAddressArea,
        detail: values.postalAddressDetail
      })
    }
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="基础信息" key="1">
          <Row gutter={24}>
            <ProFormText name="id" label="员工id" hidden={true} />
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="staffCode"
                label="员工编号"
                rules={[{ required: true, message: '请输入员工编号' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="staffName"
                label="员工姓名"
                rules={[{ required: true, message: '请输入员工名称' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <Form.Item
                name="depId"
                label="部门"
                rules={[{ required: false, message: '请选择所属部门' }]}
              >
                <FormTreeSelect treeData={departmentTree} placeholder="请选择所属部门" disabled={isView} />
              </Form.Item>
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="duty"
                label="职务"
                rules={[{ required: false, message: '请选择职务' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('Duty', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
                disabled={isEdit}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="post"
                label="岗位"
                rules={[{ required: false, message: '请选择岗位' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('Post', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
                disabled={isEdit}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="postType"
                label="岗位类型"
                rules={[{ required: false, message: '请选择岗位类型' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('PostType', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
                disabled={isEdit}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="postLevel"
                label="岗位等级"
                rules={[{ required: false, message: '请选择岗位等级' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('PostLevel', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
                disabled={isEdit}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="companyState"
                label="在司状态"
                rules={[{ required: false, message: '请输入在司状态' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('CompanyState', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
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
                rules={[{ required: false, message: '请选择性别' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="nation"
                label="民族"
                rules={[{ required: false, message: '请选择民族' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('Nation', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormDatePicker
                width="sm"
                name="birthday"
                label="出生日期"
                rules={[{ required: false, message: '请选择出生日期' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormDatePicker
                width="sm"
                name="workDate"
                label="开始工作时间"
                rules={[{ required: false, message: '请选择开始工作时间' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormDatePicker
                width="sm"
                name="entryDate"
                label="入职日期"
                rules={[{ required: false, message: '请选择入职日期' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="politics"
                label="政治面貌"
                rules={[{ required: false, message: '请选择政治面貌' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('Politics', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="education"
                label="最高学历"
                rules={[{ required: false, message: '请选择最高学历' }]}
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
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="degree"
                label="学位"
                rules={[{ required: false, message: '请选择学位' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('Degree', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="idNumber"
                label="身份证号码"
                rules={[{ required: false, message: '请输入身份证号码' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="phone"
                label="联系电话"
                placeholder="请输入联系电话"
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="socialSecurityNumber"
                label="社保号"
                placeholder="请输入社保号"
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProForm.Item name="birthAddress" label="出生地">
                <RegionSelect level={2} customValue={birthAddress} readonly={isView} />
              </ProForm.Item>
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProForm.Item name="nativeAddress" label="籍贯">
                <RegionSelect level={2} customValue={nativeAddress} readonly={isView} />
              </ProForm.Item>
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="householdType"
                label="户口类型"
                rules={[{ required: false, message: '请选择户口类型' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('HouseholdType', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
                readonly={isView}
              />
            </Col>
            <Col xl={12} lg={12} md={24}>
              <ProForm.Item name="registeredAddress" label="户口地址">
                <RegionSelect level={3} customValue={registeredAddress} hasDetail readonly={isView} />
              </ProForm.Item>
            </Col>
            <Col xl={12} lg={12} md={24}>
              <ProForm.Item name="homeAddress" label="家庭住址">
                <RegionSelect level={3} customValue={homeAddress} hasDetail readonly={isView} />
              </ProForm.Item>
            </Col>

            <Col xl={12} lg={12} md={24}>
              <ProForm.Item name="currentAddress" label="现住地址">
                <RegionSelect level={3} customValue={currentAddress} hasDetail readonly={isView} />
              </ProForm.Item>
            </Col>
            <Col xl={12} lg={12} md={24}>
              <ProForm.Item name="postalAddress" label="邮递地址">
                <RegionSelect level={3} customValue={postalAddress} hasDetail readonly={isView} />
              </ProForm.Item>
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="contactName"
                label="紧急联系人姓名"
                rules={[{ required: false, message: '请输入紧急联系人姓名' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
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
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="contactPhone"
                label="紧急联系人电话"
                rules={[{ required: false, message: '请输入部门ID' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
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
            <Col xl={7} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="spouseName"
                label="配偶名字"
                placeholder="请输入配偶名字"
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormDatePicker
                width="sm"
                name="marriageDate"
                label="结婚日期"
                placeholder="请选择结婚日期"
                readonly={isView}
              />
            </Col>
            <Col xl={7} lg={12} md={24}>
              <ProFormDigit
                width="sm"
                name="childrenNumber"
                label="子女人数"
                placeholder="请输入子女人数"
                readonly={isView}
              />
            </Col>
            <Col xl={24} lg={24} md={24}>
              <ProForm.Item
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
              </ProForm.Item>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="工作履历" key="2">
          <WorkExperienceList
            readonly={isView}
            editForm={props.workExperienceForm}
            value={values?.workExperienceList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="学习经历" key="3">
          <EducationalExperienceList
            readonly={isView}
            editForm={props.educationalExperienceForm}
            value={values?.educationalExperienceList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="职称信息" key="4">
          <CertificateList
            readonly={isView}
            editForm={props.certificateForm}
            value={values?.certificateList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="家庭信息" key="5">
          <FamilyList
            readonly={isView}
            editForm={props.familyForm}
            value={values?.familyList}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default FormBody;
