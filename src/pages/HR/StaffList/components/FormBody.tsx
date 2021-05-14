import React, {useEffect, useState} from 'react';
import type { FormInstance } from 'antd';
import {Col, Divider, Row, Tabs} from 'antd';
import { ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type {StaffForm, StaffVO} from "@/services/staff/typings";
import { getDictionaryChildrenByCode } from "@/services/dictionary/dictionary";
import RegionSelect from "@/components/RegionSelect";
import type { RegionType } from "@/services/region/typings";
import EducationalExperienceList from "@/pages/OtherInfo/components/EducationalExperienceList";
import WorkExperienceList from "@/pages/OtherInfo/components/WorkExperienceList";
import CertificateList from "@/pages/OtherInfo/components/CertificateList";
import FamilyList from "@/pages/OtherInfo/components/FamilyList";
import {getAllDepartments} from "@/services/department/department";
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import PhotoUpload from "@/components/PhotoUpload";
import DriverInfo from "@/pages/OtherInfo/components/DriverInfo";
import PhysicalInfo from "@/pages/OtherInfo/components/PhysicalInfo";
import ArmyInfo from "@/pages/OtherInfo/components/ArmyInfo";
import MarriageInfo from "@/pages/OtherInfo/components/MarriageInfo";
import EmergencyContactInfo from "@/pages/OtherInfo/components/EmergencyContactInfo";
import ContactInfo from "@/pages/OtherInfo/components/ContactInfo";
import CustomUpload from "@/components/CustomUpload";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  values?: StaffForm | StaffVO;
  workExperienceForm?: FormInstance;
  educationalExperienceForm?: FormInstance;
  certificateForm?: FormInstance;
  familyForm?: FormInstance;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, isEdit, values } = props;

  const [birthAddress, setBirthAddress] = useState<RegionType>({})
  const [nativeAddress, setNativeAddress] = useState<RegionType>({})
  const [registeredAddress, setRegisteredAddress] = useState<RegionType>({})
  const [homeAddress, setHomeAddress] = useState<RegionType>({})
  const [currentAddress, setCurrentAddress] = useState<RegionType>({})
  const [postalAddress, setPostalAddress] = useState<RegionType>({})

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
        <Tabs.TabPane tab="基础信息" key="1" forceRender >
          <Divider orientation="left">在司信息</Divider>
          <Row gutter={24}>
            <Col xl={16} lg={16} md={24}>
              <Row gutter={24}>
                <ProFormText name="id" label="员工id" hidden={true} />
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="staffCode"
                    label="员工编号"
                    rules={[{ required: true, message: '请输入员工编号' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="staffName"
                    label="员工姓名"
                    rules={[{ required: true, message: '请输入员工名称' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormSelect
                    width="sm"
                    name="depId"
                    label="部门"
                    rules={[{ required: false, message: '请选择部门' }]}
                    request={async () => {
                      const { data } = await getAllDepartments();
                      return data ? data.map(item => ({
                        value: item.id,
                        label: item.name
                      })) : []
                    }}
                    readonly={isView}
                    disabled={isEdit}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
                  <ProFormDatePicker
                    width="sm"
                    name="entryDate"
                    label="入职日期"
                    rules={[{ required: false, message: '请选择入职日期' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="socialSecurityNumber"
                    label="社保号"
                    placeholder="请输入社保号"
                    readonly={isView}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={8} md={24}>
              <ProFormItem label="个人照片" name="personalPhoto">
                <PhotoUpload readonly={isView} />
              </ProFormItem>
            </Col>
          </Row>
          <Divider orientation="left">个人信息</Divider>
          <Row gutter={24}>
            <Col xl={8} lg={12} md={24}>
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
            <Col xl={8} lg={12} md={24}>
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
            <Col xl={8} lg={12} md={24}>
              <ProFormDatePicker
                width="sm"
                name="birthday"
                label="出生日期"
                rules={[{ required: false, message: '请选择出生日期' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="idNumber"
                label="身份证号码"
                rules={[{ required: false, message: '请输入身份证号码' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormDatePicker
                width="sm"
                name="workDate"
                label="开始工作时间"
                rules={[{ required: false, message: '请选择开始工作时间' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
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
            <Col xl={8} lg={12} md={24}>
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
            <Col xl={8} lg={12} md={24}>
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
            <Col xl={8} lg={12} md={24}>
              <ProFormItem name="birthAddress" label="出生地">
                <RegionSelect level={2} customValue={birthAddress} readonly={isView} />
              </ProFormItem>
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormItem name="nativeAddress" label="籍贯">
                <RegionSelect level={2} customValue={nativeAddress} readonly={isView} />
              </ProFormItem>
            </Col>
            <Col xl={8} lg={12} md={24}>
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
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="parentalSupport"
                label="父母赡养情况"
                rules={[{ required: false, message: '请输入父母赡养情况' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="specialty"
                label="特长"
                rules={[{ required: false, message: '请输入特长' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="hobby"
                label="爱好"
                rules={[{ required: false, message: '请输入爱好' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={12} lg={12} md={24}>
              <ProFormItem name="registeredAddress" label="户口地址">
                <RegionSelect level={3} customValue={registeredAddress} hasDetail readonly={isView} />
              </ProFormItem>
            </Col>
            <Col xl={12} lg={12} md={24}>
              <ProFormItem name="homeAddress" label="家庭住址">
                <RegionSelect level={3} customValue={homeAddress} hasDetail readonly={isView} />
              </ProFormItem>
            </Col>

            <Col xl={12} lg={12} md={24}>
              <ProFormItem name="currentAddress" label="现住地址">
                <RegionSelect level={3} customValue={currentAddress} hasDetail readonly={isView} />
              </ProFormItem>
            </Col>
            <Col xl={12} lg={12} md={24}>
              <ProFormItem name="postalAddress" label="邮递地址">
                <RegionSelect level={3} customValue={postalAddress} hasDetail readonly={isView} />
              </ProFormItem>
            </Col>
          </Row>
          <Divider orientation="left">联系方式</Divider>
          <ContactInfo isView={isView} />
          <Divider orientation="left">紧急联系人</Divider>
          <EmergencyContactInfo isView={isView} />
          <Divider orientation="left">驾照信息</Divider>
          <DriverInfo isView={isView} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="个人身体情况" key="2">
          <PhysicalInfo isView={isView} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="婚姻状况" key="3" forceRender>
          <MarriageInfo isView={isView} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="服兵役信息" key="4">
          <ArmyInfo isView={isView} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="工作履历" key="5" forceRender>
          <WorkExperienceList
            readonly={isView}
            editForm={props.workExperienceForm}
            value={values?.workExperienceList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="学习经历" key="6" forceRender>
          <EducationalExperienceList
            readonly={isView}
            editForm={props.educationalExperienceForm}
            value={values?.educationalExperienceList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="职称信息" key="7" forceRender>
          <CertificateList
            readonly={isView}
            editForm={props.certificateForm}
            value={values?.certificateList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="家庭信息" key="8" forceRender>
          <FamilyList
            readonly={isView}
            editForm={props.familyForm}
            value={values?.familyList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="其他附件" key="9" forceRender>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24}>
              <ProFormItem
                label="劳动合同"
                name="laborContract"
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
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default FormBody;
