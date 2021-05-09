import React, {useEffect, useState} from 'react';
import type { FormInstance } from 'antd';
import {Col, Divider, Row, Tabs} from 'antd';
import { ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import type {ResumeForm, ResumeVO} from "@/services/resume/typings";
import { getDictionaryChildrenByCode } from "@/services/dictionary/dictionary";
import RegionSelect from "@/components/RegionSelect";
import type { RegionType } from "@/services/region/typings";
import CustomUpload from "@/components/CustomUpload";
import EducationalExperienceList from "@/pages/OtherInfo/components/EducationalExperienceList";
import WorkExperienceList from "@/pages/OtherInfo/components/WorkExperienceList";
import CertificateList from "@/pages/OtherInfo/components/CertificateList";
import FamilyList from "@/pages/OtherInfo/components/FamilyList";
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import PhotoUpload from "@/components/PhotoUpload";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  values?: ResumeForm | ResumeVO;
  workExperienceForm?: FormInstance;
  educationalExperienceForm?: FormInstance;
  certificateForm?: FormInstance;
  familyForm?: FormInstance;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, values } = props;

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
        <Tabs.TabPane tab="基础信息" key="1">
          <Divider orientation="left">个人信息</Divider>
          <Row gutter={24}>
            <Col xl={16} lg={16} md={24}>
              <Row gutter={24}>
                <ProFormText name="id" label="简历id" hidden={true} />
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '请输入姓名' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
                  <ProFormDatePicker
                    width="sm"
                    name="birthday"
                    label="出生日期"
                    rules={[{ required: false, message: '请选择出生日期' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="idNumber"
                    label="身份证号码"
                    rules={[{ required: false, message: '请输入身份证号码' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormItem name="birthAddress" label="出生地">
                    <RegionSelect level={2} customValue={birthAddress} readonly={isView} />
                  </ProFormItem>
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormItem name="nativeAddress" label="籍贯">
                    <RegionSelect level={2} customValue={nativeAddress} readonly={isView} />
                  </ProFormItem>
                </Col>
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
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
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="specialty"
                    label="特长"
                    rules={[{ required: false, message: '请输入特长' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="hobby"
                    label="爱好"
                    rules={[{ required: false, message: '请输入爱好' }]}
                    readonly={isView}
                  />
                </Col>
                <Col xl={12} lg={24} md={24}>
                  <ProFormText
                    width="sm"
                    name="parentalSupport"
                    label="父母赡养情况"
                    rules={[{ required: false, message: '请输入父母赡养情况' }]}
                    readonly={isView}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
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
            </Col>
            <Col xl={8} lg={8} md={24}>
              <ProFormItem label="个人照片" name="personalPhoto">
                <PhotoUpload readonly={isView} />
              </ProFormItem>
            </Col>
          </Row>
          <Divider orientation="left">求职信息</Divider>
          <Row gutter={24}>
            <Col xl={8} lg={12} md={24}>
              <ProFormDigit
                width="sm"
                name="expectedSalary"
                label="期望月薪"
                rules={[{ required: false, message: '请输入期望月薪' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormDigit
                width="sm"
                name="serviceYears"
                label="希望服务年限"
                rules={[{ required: false, message: '请输入希望服务年限' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="title"
                label="职称"
                rules={[{ required: false, message: '请输入职称' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormSelect
                width="sm"
                name="applyFor"
                label="应聘途径"
                rules={[{ required: false, message: '请选择应聘途径' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('ApplyFor', keyWords);
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
                name="workDate"
                label="开始工作时间"
                rules={[{ required: false, message: '请选择开始工作时间' }]}
                readonly={isView}
              />
            </Col>
          </Row>
          <Divider orientation="left">联系方式</Divider>
          <Row gutter={24}>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="phone"
                label="联系电话"
                placeholder="请输入联系电话"
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="email"
                label="邮箱"
                placeholder="请输入邮箱"
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="qq"
                label="QQ"
                placeholder="请输入联系QQ"
                readonly={isView}
              />
            </Col>
          </Row>
          <Divider orientation="left">紧急联系人</Divider>
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
                rules={[{ required: false, message: '请输入紧急联系人电话' }]}
                readonly={isView}
              />
            </Col>
          </Row>
          <Divider orientation="left">亲友在司信息</Divider>
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
          <Divider orientation="left">驾照信息</Divider>
          <Row gutter={24}>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="driverLicenseType"
                label="驾驶证类型"
                rules={[{ required: false, message: '请输入驾驶证类型' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormDatePicker
                width="sm"
                name="workDate"
                label="驾驶证领证时间"
                rules={[{ required: false, message: '请输入驾驶证领证时间' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormDigit
                width="sm"
                name="driveYear"
                label="驾龄"
                rules={[{ required: false, message: '请输入驾龄' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="driveLines"
                label="熟悉的驾驶路线"
                rules={[{ required: false, message: '请输入熟悉的驾驶路线' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="vehicleType"
                label="驾驶车种"
                rules={[{ required: false, message: '请输入驾驶车种' }]}
                readonly={isView}
              />
            </Col>
          </Row>
          <Divider/>
          <Row gutter={24}>
            <Col xl={8} md={12} sm={24}>
              <ProFormSwitch
                name="willJoin"
                label="是否愿意加入人才库"
                checkedChildren="是"
                unCheckedChildren="否"
                fieldProps={{ defaultChecked: true }}
                readonly={isView}
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="个人身体情况" key="2">
          <Row gutter={24}>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="physicalCondition"
                label="本人身体状况"
                rules={[{ required: false, message: '请输入本人身体状况' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="weight"
                label="体重(KG)"
                rules={[{ required: false, message: '请输入体重(KG)' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="height"
                label="身高(CM)"
                rules={[{ required: false, message: '请输入身高(CM)' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="vision"
                label="视力"
                rules={[{ required: false, message: '请输入视力' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="bloodType"
                label="血型"
                rules={[{ required: false, message: '请输入血型' }]}
                readonly={isView}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormText
                width="sm"
                name="medicalHistory"
                label="遗传病史或传染病"
                rules={[{ required: false, message: '请输入遗传病史或传染病' }]}
                readonly={isView}
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="婚姻状况" key="3">
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
              <ProFormDatePicker
                width="sm"
                name="marriageDate"
                label="结婚日期"
                placeholder="请选择结婚日期"
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
              <ProFormSelect
                width="sm"
                name="fertility"
                label="生育情况"
                rules={[{ required: false, message: '请选择生育情况' }]}
                request={async ({ keyWords }) => {
                  const { data } = await getDictionaryChildrenByCode('Fertility', keyWords);
                  return data ? data.map(item => ({
                    value: item.name,
                    label: item.name
                  })) : []
                }}
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
        </Tabs.TabPane>
        <Tabs.TabPane tab="服兵役信息" key="4">
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
        </Tabs.TabPane>
        <Tabs.TabPane tab="工作履历" key="5">
          <WorkExperienceList
            readonly={isView}
            editForm={props.workExperienceForm}
            value={values?.workExperienceList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="学习经历" key="6">
          <EducationalExperienceList
            readonly={isView}
            editForm={props.educationalExperienceForm}
            value={values?.educationalExperienceList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="职称信息" key="7">
          <CertificateList
            readonly={isView}
            editForm={props.certificateForm}
            value={values?.certificateList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="家庭信息" key="8">
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
