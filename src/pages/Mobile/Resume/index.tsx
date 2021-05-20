import 'zarm/dist/zarm.css';
import './index.less';
import React, { useRef, useState } from 'react';
import { Cell, ConfigProvider, DateSelect, Input, Panel, Switch } from "zarm";
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import ProForm from '@ant-design/pro-form';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import ZaOtherSelect from "@/components/CustomZarm/ZaOtherSelect";
import ZaRegionSelect from "@/components/CustomZarm/ZaRegionSelect";
import {CheckOutlined, DownOutlined, UpOutlined} from "@ant-design/icons";
import WorkList from "@/pages/Mobile/Resume/components/WorkList";
import EducationalList from "@/pages/Mobile/Resume/components/EducationalList";
import CertificateList from "@/pages/Mobile/Resume/components/CertificateList";
import FamilyList from "@/pages/Mobile/Resume/components/FamilyList";
import {customValidator, validateAddress, validateEmail, validateIdNumber, validatePhoneNumber} from "@/utils/validate";
import {useOptions} from "@/utils/options";
import {customHelp, requiredTitle} from "@/utils/zarm";

const ResumeFill: React.FC = () => {
  const [ errors, setErrors ] = useState<any>({});
  const [ currentPage, setCurrentPage ] = useState<number>(1);

  const formRef = useRef<FormInstance>();

  const householdTypeOptions = useOptions('HouseholdType');
  const nationOptions = useOptions('Nation');
  const politicsOptions = useOptions('Politics');
  const educationOptions = useOptions('Education');
  const degreeOptions = useOptions('Degree');
  const parentalSupportOptions = useOptions('ParentalSupport');
  const relationOptions = useOptions('Relation');
  const maritalStatusOptions = useOptions('MaritalStatus');
  const applyForOptions = useOptions('ApplyFor');

  const onFormValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues && changedValues.idNumber) {
      const { idNumber } = changedValues
      formRef.current?.setFieldsValue({
        ...allValues,
        sex: idNumber.slice(14, 17) % 2 ? '男' : '女',
        birthday: idNumber.length > 13 ? new Date(`${idNumber.substring(6, 10)}-${idNumber.substring(10, 12)}-${idNumber.substring(12, 14)}`) : ''
      });
    }
  }


  return (
    <>
      <ConfigProvider primaryColor="#1890ff">
        <div className="za-page">
          <div>
            <ProForm
              formRef={formRef}
              onValuesChange={onFormValuesChange}
              initialValues={{
                name: '12',
                idNumber: '440',
                workList: [{}, {}]
              }}
              submitter={{
                submitButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
              }}
              onFinish={async (value) => {
                console.log(value)
              }}
            >
              <Panel title="基础信息" className={currentPage === 1 ? 'page-show' : 'page-hide'}>
                <Cell title={requiredTitle('姓名')} help={customHelp(errors, 'name')}>
                  <Form.Item
                    name="name"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'name', value, true),
                    }]}
                  >
                    <Input clearable type="text" placeholder="请输入姓名" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('身份证号码')} help={customHelp(errors, 'idNumber')}>
                  <Form.Item
                    name="idNumber"
                    noStyle
                    rules={[{
                      validator: async (_, idNumber) => customValidator(setErrors, 'idNumber', idNumber, true, () => validateIdNumber(idNumber), '身份证号码校验不通过'),
                    }]}
                  >
                    <Input clearable type="idcard" placeholder="请输入身份证号码" />
                  </Form.Item>
                </Cell>
                <Cell title="性别" help={customHelp(errors, 'sex')}>
                  <Form.Item name="sex" noStyle>
                    <Input clearable type="text" placeholder="输入身份证号码自动识别性别" disabled />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('生日日期')}>
                  <Form.Item name="birthday" trigger="onOk" noStyle>
                    <DateSelect
                      title="选择生日日期"
                      placeholder="自动识别生日日期"
                      format="yyyy年MM月dd日"
                      mode="date"
                      min="1900-01-01"
                      max="2027-05-15"
                      hasArrow={false}
                      disabled
                    />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('户口类型')} help={customHelp(errors, 'householdType')}>
                  <Form.Item
                    name="householdType"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'householdType', value, true),
                    }]}
                  >
                    <ZaSelect dataSource={householdTypeOptions} placeholder="请选择户口类型"/>
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('民族')} help={customHelp(errors, 'nation')}>
                  <Form.Item
                    name="nation"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'nation', value, true),
                    }]}
                  >
                    <ZaSelect dataSource={nationOptions} placeholder="请选择民族"/>
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('政治面貌')} help={customHelp(errors, 'politics')}>
                  <Form.Item
                    name="politics"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'politics', value, true),
                    }]}
                  >
                    <ZaSelect dataSource={politicsOptions} placeholder="请选择政治面貌"/>
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('最高学历')} help={customHelp(errors, 'education')}>
                  <Form.Item
                    name="education"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'education', value, true),
                    }]}
                  >
                    <ZaSelect dataSource={educationOptions} placeholder="请选择最高学历"/>
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('学位')} help={customHelp(errors, 'degree')}>
                  <Form.Item
                    name="degree"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'degree', value, true),
                    }]}
                  >
                    <ZaSelect dataSource={degreeOptions} placeholder="请选择学位"/>
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('特长')} help={customHelp(errors, 'specialty')}>
                  <Form.Item
                    name="specialty"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'specialty', value, true),
                    }]}
                  >
                    <Input clearable type="text" placeholder="请输入特长" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('爱好')} help={customHelp(errors, 'hobby')}>
                  <Form.Item
                    name="hobby"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'hobby', value, true),
                    }]}
                  >
                    <Input clearable type="text" placeholder="请输入爱好" />
                  </Form.Item>
                </Cell>
                <Form.Item
                  name="parentalSupport"
                  noStyle
                  rules={[{
                    validator: async (_, value) => customValidator(setErrors, 'parentalSupport', value, true),
                  }]}
                >
                  <ZaOtherSelect title={requiredTitle('父母赡养情况')} dataSource={parentalSupportOptions}/>
                </Form.Item>
                <Form.Item
                  name="birthAddress"
                  noStyle
                  rules={[{
                    validator: async (_, birthAddress) => customValidator(setErrors, 'birthAddress', birthAddress, true, () => validateAddress(birthAddress, 2, false), '不能为空'),
                  }]}
                >
                  <ZaRegionSelect title="出生地" required={true} help={customHelp(errors, 'birthAddress')} level={2} />
                </Form.Item>
                <Form.Item
                  name="nativeAddress"
                  noStyle
                  rules={[{
                    validator: async (_, nativeAddress) => customValidator(setErrors, 'nativeAddress', nativeAddress, true, () => validateAddress(nativeAddress, 2, false), '不能为空'),
                  }]}
                >
                  <ZaRegionSelect title="籍贯" required={true} help={customHelp(errors, 'nativeAddress')} level={2}/>
                </Form.Item>
                <Form.Item
                  name="registeredAddress"
                  noStyle
                  rules={[{
                    validator: async (_, registeredAddress) => customValidator(setErrors, 'registeredAddress', registeredAddress, true, () => validateAddress(registeredAddress, 3, true), '不能为空'),
                  }]}
                >
                  <ZaRegionSelect title="户口地址" required={true} help={customHelp(errors, 'registeredAddress')} level={3} haveDetail />
                </Form.Item>
                <Form.Item
                  name="homeAddress"
                  noStyle
                  rules={[{
                    validator: async (_, homeAddress) => customValidator(setErrors, 'homeAddress', homeAddress, true, () => validateAddress(homeAddress, 3, true), '不能为空'),
                  }]}
                >
                  <ZaRegionSelect title="家庭住址" required={true} help={customHelp(errors, 'homeAddress')} level={3} haveDetail />
                </Form.Item>
                <Form.Item
                  name="currentAddress"
                  noStyle
                  rules={[{
                    validator: async (_, currentAddress) => customValidator(setErrors, 'currentAddress', currentAddress, true, () => validateAddress(currentAddress, 3, true), '不能为空'),
                  }]}
                >
                  <ZaRegionSelect title="现住住址" required={true} help={customHelp(errors, 'currentAddress')} level={3} haveDetail />
                </Form.Item>
                <Form.Item
                  name="postalAddress"
                  noStyle
                  rules={[{
                    validator: async (_, postalAddress) => customValidator(setErrors, 'postalAddress', postalAddress, true, () => validateAddress(postalAddress, 3, true), '不能为空'),
                  }]}
                >
                  <ZaRegionSelect title="邮递地址" required={true} help={customHelp(errors, 'postalAddress')} level={3} haveDetail />
                </Form.Item>
                <Cell title={requiredTitle('期望月薪')} help={customHelp(errors, 'expectedSalary')}>
                  <Form.Item
                    name="expectedSalary"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'expectedSalary', value, true),
                    }]}
                  >
                    <Input clearable type="price" placeholder="请输入期望月薪" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('希望服务年限')} help={customHelp(errors, 'serviceYears')}>
                  <Form.Item
                    name="serviceYears"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'serviceYears', value, true),
                    }]}
                  >
                    <Input clearable type="number" placeholder="请输入希望服务年限" />
                  </Form.Item>
                </Cell>
                <Cell title="职称">
                  <Form.Item name="title" noStyle>
                    <Input clearable type="text" placeholder="请输入职称" />
                  </Form.Item>
                </Cell>
                <Form.Item
                  name="applyFor"
                  noStyle
                  rules={[{
                    validator: async (_, value) => customValidator(setErrors, 'applyFor', value, true),
                  }]}
                >
                  <ZaOtherSelect title={requiredTitle('应聘途径')} dataSource={applyForOptions} />
                </Form.Item>
                <Cell title="开始工作时间">
                  <Form.Item name="workDate" trigger="onOk" noStyle>
                    <DateSelect
                      title={requiredTitle('请选择开始工作时间')}
                      placeholder="请选择开始工作时间"
                      format="yyyy年MM月dd日"
                      mode="date"
                      min="1900-01-01"
                      max="2027-05-15"
                      hasArrow={false}
                    />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('联系电话')} help={customHelp(errors, 'phone')}>
                  <Form.Item
                    name="phone"
                    noStyle
                    rules={[{
                      validator: async (_, phone) => customValidator(setErrors, 'phone', phone, true, () => validatePhoneNumber(phone)),
                    }]}
                  >
                    <Input clearable type="number" placeholder="请输入联系电话" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('家庭电话')} help={customHelp(errors, 'homePhone')}>
                  <Form.Item name="homePhone" noStyle>
                    <Input clearable type="number" placeholder="请输入家庭电话" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('邮箱')} help={customHelp(errors, 'email')}>
                  <Form.Item
                    name="email"
                    noStyle
                    rules={[{
                      validator: async (_, email) => customValidator(setErrors, 'email', email, true, () => validateEmail(email), '邮箱格式输入不正确'),
                    }]}
                  >
                    <Input clearable type="text" placeholder="请输入邮箱" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('QQ')} help={customHelp(errors, 'qq')}>
                  <Form.Item name="qq" noStyle>
                    <Input clearable type="number" placeholder="请输入QQ" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('紧急联系人')} help={customHelp(errors, 'emergencyContactName')}>
                  <Form.Item
                    name="emergencyContactName"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'emergencyContactName', value, true),
                    }]}
                  >
                    <Input clearable type="text" placeholder="请输入紧急联系人" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('紧急联系人关系')} help={customHelp(errors, 'emergencyContactRelation')}>
                  <Form.Item
                    name="emergencyContactRelation"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'emergencyContactRelation', value, true),
                    }]}
                  >
                    <ZaSelect dataSource={relationOptions} placeholder="请选择紧急联系人关系"/>
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('紧急联系人电话')} help={customHelp(errors, 'emergencyContactPhone')}>
                  <Form.Item
                    name="emergencyContactPhone"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'emergencyContactPhone', value, true),
                    }]}
                  >
                    <Input clearable type="number" placeholder="请输入紧急联系人电话" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('是否愿意加入人才库')} help={customHelp(errors, 'willJoin')}>
                  <Form.Item
                    name="willJoin"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'willJoin', value, true),
                    }]}
                  >
                    <Switch defaultChecked />
                  </Form.Item>
                </Cell>
              </Panel>
              <Panel title="个人身体情况" className={currentPage === 2 ? 'page-show' : 'page-hide'}>
                <Cell title="本人身体状况">
                  <Form.Item name="physicalCondition" noStyle>
                    <Input clearable type="text" placeholder="请输入本人身体状况" />
                  </Form.Item>
                </Cell>
                <Cell title="体重(KG)">
                  <Form.Item name="weight" noStyle>
                    <Input clearable type="price" placeholder="请输入您的体重(KG)" />
                  </Form.Item>
                </Cell>
                <Cell title="身高(CM)">
                  <Form.Item name="height" noStyle>
                    <Input clearable type="price" placeholder="请输入您的身高(CM)" />
                  </Form.Item>
                </Cell>
                <Cell title="视力">
                  <Form.Item name="vision" noStyle>
                    <Input clearable type="price" placeholder="请输入您的视力度数" />
                  </Form.Item>
                </Cell>
                <Cell title="血型">
                  <Form.Item name="bloodType" noStyle>
                    <Input clearable type="text" placeholder="请输入血型" />
                  </Form.Item>
                </Cell>
              </Panel>
              <Panel title="婚育情况" className={currentPage === 3 ? 'page-show' : 'page-hide'}>
                <Cell title="婚姻状况">
                  <Form.Item name="maritalStatus" noStyle>
                    <ZaSelect dataSource={maritalStatusOptions} placeholder="请选择婚姻状况"/>
                  </Form.Item>
                </Cell>
                <Cell title="结婚日期">
                  <Form.Item name="marriageDate" trigger="onOk" noStyle>
                    <DateSelect
                      title="请选择结婚日期"
                      placeholder="请选择结婚日期"
                      format="yyyy年MM月dd日"
                      mode="date"
                      min="1900-01-01"
                      max="2027-05-15"
                      hasArrow={false}
                    />
                  </Form.Item>
                </Cell>
                <Cell title="配偶名字">
                  <Form.Item name="spouseName" noStyle>
                    <Input clearable type="text" placeholder="请输入配偶名字" />
                  </Form.Item>
                </Cell>
                <Cell title="配偶身体状况">
                  <Form.Item name="spousePhysicalCondition" noStyle>
                    <Input clearable type="text" placeholder="请输入配偶身体状况" />
                  </Form.Item>
                </Cell>
                <Cell title="生育情况">
                  <Form.Item name="fertility" noStyle>
                    <Input clearable type="text" placeholder="请输入生育情况" />
                  </Form.Item>
                </Cell>
                <Cell title="子女人数">
                  <Form.Item name="childrenNumber" noStyle>
                    <Input clearable type="number" placeholder="请输入子女人数" />
                  </Form.Item>
                </Cell>
                <Cell title="结婚证件">
                  <Form.Item name="marriageCertificate" noStyle>
                    <Input clearable type="text" placeholder="请输入结婚证件" />
                  </Form.Item>
                </Cell>
              </Panel>
              <Panel title="亲友信息" className={currentPage === 4 ? 'page-show' : 'page-hide'}>
                <Cell title="是否有亲友在司">
                  <Form.Item name="haveFriend" noStyle>
                    <Switch />
                  </Form.Item>
                </Cell>
                <Cell title="亲友姓名">
                  <Form.Item name="friendName" noStyle>
                    <Input clearable type="text" placeholder="请输入亲友姓名" />
                  </Form.Item>
                </Cell>
                <Cell title="亲友关系">
                  <Form.Item name="friendRelation" noStyle>
                    <ZaSelect dataSource={relationOptions} placeholder="请选择亲友关系"/>
                  </Form.Item>
                </Cell>
                <Cell title="亲友部门">
                  <Form.Item name="friendDepartment" noStyle>
                    <Input clearable type="text" placeholder="请输入亲友部门" />
                  </Form.Item>
                </Cell>
                <Cell title="亲友职务">
                  <Form.Item name="friendDuty" noStyle>
                    <Input clearable type="text" placeholder="请输入亲友职务" />
                  </Form.Item>
                </Cell>
              </Panel>
              <Panel title="驾驶证信息" className={currentPage === 5 ? 'page-show' : 'page-hide'}>
                <Cell title="驾驶证类型">
                  <Form.Item name="driverLicenseType" noStyle>
                    <Input clearable type="text" placeholder="请输入驾驶证类型" />
                  </Form.Item>
                </Cell>
                <Cell title="驾驶证领证时间">
                  <Form.Item name="birthday" trigger="onOk" noStyle>
                    <DateSelect
                      title="请选择驾驶证领证时间"
                      placeholder="请选择驾驶证领证时间"
                      format="yyyy年MM月dd日"
                      mode="date"
                      min="1900-01-01"
                      max="2027-05-15"
                      hasArrow={false}
                    />
                  </Form.Item>
                </Cell>
                <Cell title="驾龄">
                  <Form.Item name="driveYear" noStyle>
                    <Input clearable type="number" placeholder="请输入驾龄" />
                  </Form.Item>
                </Cell>
                <Cell title="熟悉的驾驶路线">
                  <Form.Item name="driveLines" noStyle>
                    <Input clearable type="text" placeholder="请输入熟悉的驾驶路线" />
                  </Form.Item>
                </Cell>
                <Cell title="驾驶车种">
                  <Form.Item name="vehicleType" noStyle>
                    <Input clearable type="text" placeholder="请输入驾驶车种" />
                  </Form.Item>
                </Cell>
              </Panel>
              <Panel title="服兵役信息" className={currentPage === 6 ? 'page-show' : 'page-hide'}>
                <Cell title="部队驻扎地">
                  <Form.Item name="troopBase" noStyle>
                    <Input clearable type="text" placeholder="请输入部队驻扎地" />
                  </Form.Item>
                </Cell>
                <Cell title="入伍时间">
                  <Form.Item name="enlistmentDate" trigger="onOk" noStyle>
                    <DateSelect
                      title="请选择入伍时间"
                      placeholder="请选择入伍时间"
                      format="yyyy年MM月dd日"
                      mode="date"
                      min="1900-01-01"
                      max="2027-05-15"
                      hasArrow={false}
                    />
                  </Form.Item>
                </Cell>
                <Cell title="退伍时间">
                  <Form.Item name="dischargeDate" trigger="onOk" noStyle>
                    <DateSelect
                      title="请选择退伍时间"
                      placeholder="请选择退伍时间"
                      format="yyyy年MM月dd日"
                      mode="date"
                      min="1900-01-01"
                      max="2027-05-15"
                      hasArrow={false}
                    />
                  </Form.Item>
                </Cell>
                <Cell title="退伍时军衔">
                  <Form.Item name="dischargeRank" noStyle>
                    <Input clearable type="text" placeholder="请输入退伍时军衔" />
                  </Form.Item>
                </Cell>
                <Cell title="立功/贡献">
                  <Form.Item name="honour" noStyle>
                    <Input clearable type="text" placeholder="请输入服役期间立功/贡献" />
                  </Form.Item>
                </Cell>
              </Panel>
              <Panel title="工作履历" className={currentPage === 7 ? 'page-show' : 'page-hide'}>
                <WorkList />
              </Panel>
              <Panel title="教育经历" className={currentPage === 8 ? 'page-show' : 'page-hide'}>
                <EducationalList />
              </Panel>
              <Panel title="证书信息" className={currentPage === 9 ? 'page-show' : 'page-hide'}>
                <CertificateList />
              </Panel>
              <Panel title="家庭信息" className={currentPage === 10 ? 'page-show' : 'page-hide'}>
                <FamilyList />
              </Panel>
            </ProForm>
          </div>
          <div className="za-tab-bar" style={{ borderTop: '1px solid #ebedf0' }}>
            {
              currentPage > 1 ? (
                <div className="za-tab-bar__item">
                  <div className="za-tab-bar__icon">
                    <UpOutlined />
                  </div>
                  <div className="za-tab-bar__title" onClick={() => { setCurrentPage(origin => (origin > 1 && origin < 11 ? origin - 1 : origin)) }}>上一页</div>
                </div>
              ) : null
            }
            {
              currentPage < 10 ? (
                <div className="za-tab-bar__item">
                  <div className="za-tab-bar__icon">
                    <DownOutlined />
                  </div>
                  <div className="za-tab-bar__title" onClick={() => { setCurrentPage(origin => (origin > 0 && origin < 10 ? origin + 1 : origin)) }}>下一页</div>
                </div>
              ) : null
            }
            {
              currentPage === 10 ? (
                <div className="za-tab-bar__item">
                  <div className="za-tab-bar__icon">
                    <CheckOutlined />
                  </div>
                  <div className="za-tab-bar__title" onClick={formRef.current?.submit}>提交</div>
                </div>
              ) : null
            }
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};


export default ResumeFill;
