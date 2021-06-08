import 'zarm/dist/zarm.css';
import './index.less';
import React, { useRef, useState } from 'react';
import {Cell, ConfigProvider, DateSelect, Input, Panel, Switch, Toast} from "zarm";
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
import {getBirthdayFromIdNumber, getSexFromIdNumber, validateWorkExperienceList} from "@/utils/resume";

const ResumeFill: React.FC = () => {
  const [ errors, setErrors ] = useState<any>({});
  const [ currentPage, setCurrentPage ] = useState<number>(8);
  const [ formMaritalStatus, setFormMaritalStatus ] = useState<boolean>(true);
  const [ formHaveFriend, setFormHaveFriend ] = useState<boolean>(false);
  const [ formFertility, setFormFertility ] = useState<boolean>(false);
  const [ formInArmy, setFormInArmy ] = useState<boolean>(false);

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
  const bloodTypeOptions = useOptions('BloodType');

  const onFormValuesChange = (changedValues: any, allValues: any) => {
    console.log('我变了')
    console.log(changedValues, allValues)
    if (changedValues) {
      const { idNumber, maritalStatus, fertility, haveFriend, inArmy } = changedValues;

      if (changedValues.hasOwnProperty('idNumber')) {
        formRef.current?.setFieldsValue({
          ...allValues,
          sex: getSexFromIdNumber(idNumber),
          birthday: getBirthdayFromIdNumber(idNumber)
        });
      }
      if (changedValues.hasOwnProperty('maritalStatus')) {
        setFormMaritalStatus(!maritalStatus || maritalStatus === '未婚');
      }
      if (changedValues.hasOwnProperty('fertility')) {
        setFormFertility(fertility === '已育')
      }
      if (changedValues.hasOwnProperty('haveFriend')) {
        setFormHaveFriend(!!haveFriend);
      }
      if (changedValues.hasOwnProperty('inArmy')) {
        setFormInArmy(!!inArmy);
      }
      if (changedValues.hasOwnProperty('workExperienceList')) {
        validateWorkExperienceList(changedValues.workExperienceList, setErrors, false);
      }
    }
  }

  const pageFields = [
    ['name', 'idNumber', 'sex', 'birthday', 'householdType', 'nation', 'politics', 'education', 'degree', 'specialty', 'hobby', 'parentalSupport', 'birthAddress', 'nativeAddress', 'registeredAddress', 'homeAddress', 'currentAddress', 'postalAddress', 'expectedSalary', 'serviceYears', 'title', 'applyFor', 'workDate', 'phone', 'homePhone', 'email', 'qq', 'emergencyContactName', 'emergencyContactRelation', 'emergencyContactPhone', 'willJoin'],
    ['physicalCondition', 'weight', 'height', 'vision', 'bloodType'],
    ['maritalStatus', 'marriageDate', 'spouseName', 'spousePhysicalCondition', 'fertility', 'childrenNumber', 'marriageCertificate'],
    ['haveFriend', 'friendName', 'friendRelation', 'friendDepartment', 'friendDuty'],
    ['driverLicenseType', 'driverLicenseDate', 'driveYear', 'driveLines', 'vehicleType'],
    ['troopBase', 'enlistmentDate', 'dischargeDate', 'dischargeRank', 'honour'],
    ['workExperienceList']
  ];

  const nextPage = async () => {
    try {
      if (currentPage > 0 && currentPage < 7) {
        await formRef.current?.validateFields(pageFields[currentPage - 1]);
      } else if (currentPage) {
        const currentValues = formRef.current?.getFieldsValue();
        validateWorkExperienceList(currentValues.workExperienceList, setErrors, true);
      }
      // setCurrentPage(origin => (origin > 0 && origin < 10 ? origin + 1 : origin))

      console.log(formRef.current?.getFieldsValue());
    } catch (error) {
      console.log(error)
      Toast.show({
        content: '当前页还没填写完成 ',
        stayTime: 3000,
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
              initialValues={{}}
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
                try {
                  console.log(value)
                } catch (error) {
                  console.log(error)
                }
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
                  <ZaOtherSelect title="父母赡养情况" required={true} dataSource={parentalSupportOptions}/>
                </Form.Item>
                <Form.Item
                  name="birthAddress"
                  noStyle
                  rules={[{
                    validator: async (_, birthAddress) => customValidator(setErrors, 'birthAddress', birthAddress, true, () => validateAddress(birthAddress, 2, false), '请选择出生地'),
                  }]}
                >
                  <ZaRegionSelect title="出生地" required={true} help={customHelp(errors, 'birthAddress')} level={2} />
                </Form.Item>
                <Form.Item
                  name="nativeAddress"
                  noStyle
                  rules={[{
                    validator: async (_, nativeAddress) => customValidator(setErrors, 'nativeAddress', nativeAddress, true, () => validateAddress(nativeAddress, 2, false), '请选择籍贯'),
                  }]}
                >
                  <ZaRegionSelect title="籍贯" required={true} help={customHelp(errors, 'nativeAddress')} level={2}/>
                </Form.Item>
                <Form.Item
                  name="registeredAddress"
                  noStyle
                  rules={[{
                    validator: async (_, registeredAddress) => customValidator(setErrors, 'registeredAddress', registeredAddress, false, () => validateAddress(registeredAddress, 3, true), '请填写完整的户口地址'),
                  }]}
                >
                  <ZaRegionSelect title="户口地址" required={true} help={customHelp(errors, 'registeredAddress')} level={3} haveDetail />
                </Form.Item>
                <Form.Item
                  name="homeAddress"
                  noStyle
                  rules={[{
                    validator: async (_, homeAddress) => customValidator(setErrors, 'homeAddress', homeAddress, false, () => validateAddress(homeAddress, 3, true), '请填写完整的家庭住址'),
                  }]}
                >
                  <ZaRegionSelect title="家庭住址" required={true} help={customHelp(errors, 'homeAddress')} level={3} haveDetail />
                </Form.Item>
                <Form.Item
                  name="currentAddress"
                  noStyle
                  rules={[{
                    validator: async (_, currentAddress) => customValidator(setErrors, 'currentAddress', currentAddress, false, () => validateAddress(currentAddress, 3, true), '请填写完整的现住住址'),
                  }]}
                >
                  <ZaRegionSelect title="现住住址" required={true} help={customHelp(errors, 'currentAddress')} level={3} haveDetail />
                </Form.Item>
                <Form.Item
                  name="postalAddress"
                  noStyle
                  rules={[{
                    validator: async (_, postalAddress) => customValidator(setErrors, 'postalAddress', postalAddress, false, () => validateAddress(postalAddress, 3, true), '请填写完整的邮递地址'),
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
                  <ZaOtherSelect title="应聘途径" required={true} dataSource={applyForOptions} help={customHelp(errors, 'applyFor')}/>
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
                    <Switch defaultChecked checked />
                  </Form.Item>
                </Cell>
              </Panel>
              <Panel title="个人身体情况" className={currentPage === 2 ? 'page-show' : 'page-hide'}>
                <Cell title={requiredTitle('本人身体状况')} help={customHelp(errors, 'physicalCondition')}>
                  <Form.Item
                    name="physicalCondition"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'physicalCondition', value, true),
                    }]}
                  >
                    <Input clearable type="text" placeholder="请输入本人身体状况" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('体重(KG)')} help={customHelp(errors, 'weight')}>
                  <Form.Item
                    name="weight"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'weight', value, true),
                    }]}
                  >
                    <Input clearable type="price" placeholder="请输入您的体重(KG)" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('身高(CM)')} help={customHelp(errors, 'height')}>
                  <Form.Item
                    name="height"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'height', value, true),
                    }]}
                  >
                    <Input clearable type="price" placeholder="请输入您的身高(CM)" />
                  </Form.Item>
                </Cell>
                <Cell title={requiredTitle('视力')} help={customHelp(errors, 'vision')}>
                  <Form.Item
                    name="vision"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'vision', value, true),
                    }]}
                  >
                    <Input clearable type="price" placeholder="请填写您的视力，如5.0" />
                  </Form.Item>
                </Cell>
                <Form.Item
                  name="bloodType"
                  noStyle
                  rules={[{
                    validator: async (_, value) => customValidator(setErrors, 'bloodType', value, true),
                  }]}
                >
                  <ZaOtherSelect title="血型" required={true} dataSource={bloodTypeOptions} help={customHelp(errors, 'bloodType')} />
                </Form.Item>
              </Panel>
              <Panel title="婚育情况" className={currentPage === 3 ? 'page-show' : 'page-hide'}>
                <Cell title={requiredTitle('婚姻状况')} help={customHelp(errors, 'maritalStatus')}>
                  <Form.Item
                    name="maritalStatus"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'maritalStatus', value, true),
                    }]}
                  >
                    <ZaSelect dataSource={maritalStatusOptions} placeholder="请选择婚姻状况"/>
                  </Form.Item>
                </Cell>
                {
                  !formMaritalStatus && (
                    <>
                      <Cell title={requiredTitle('结婚日期')} help={customHelp(errors, 'marriageDate')}>
                        <Form.Item
                          name="marriageDate"
                          trigger="onOk"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'marriageDate', value, !formMaritalStatus),
                          }]}
                        >
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
                      <Cell title={requiredTitle('配偶名字')} help={customHelp(errors, 'spouseName')}>
                        <Form.Item
                          name="spouseName"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'spouseName', value, !formMaritalStatus),
                          }]}
                        >
                          <Input clearable type="text" placeholder="请输入配偶名字" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('配偶身体状况')} help={customHelp(errors, 'spousePhysicalCondition')}>
                        <Form.Item
                          name="spousePhysicalCondition"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'spousePhysicalCondition', value, !formMaritalStatus),
                          }]}
                        >
                          <Input clearable type="text" placeholder="请输入配偶身体状况" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('生育情况')} help={customHelp(errors, 'fertility')}>
                        <Form.Item
                          name="fertility"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'fertility', value, !formMaritalStatus),
                          }]}
                        >
                          <ZaSelect dataSource={[{label: '已育', value: '已育'}, {label: '未育', value: '未育'}]} placeholder="请输入生育情况" />
                        </Form.Item>
                      </Cell>
                      {
                        formFertility && (
                          <>
                            <Cell title={requiredTitle('子女人数')} help={customHelp(errors, 'childrenNumber')}>
                              <Form.Item
                                name="childrenNumber"
                                noStyle
                                rules={[{
                                  validator: async (_, value) => customValidator(setErrors, 'marriageDate', value, formFertility),
                                }]}
                              >
                                <Input clearable type="number" placeholder="请输入子女人数" />
                              </Form.Item>
                            </Cell>
                          </>
                        )
                      }
                      <Cell title="结婚证件">
                        <Form.Item
                          name="marriageCertificate"
                          noStyle
                        >
                          <Input clearable type="text" placeholder="请输入结婚证件" />
                        </Form.Item>
                      </Cell>
                    </>
                  )
                }
              </Panel>
              <Panel title="亲友信息" className={currentPage === 4 ? 'page-show' : 'page-hide'}>
                <Cell title={requiredTitle('是否有亲友在司')} help={customHelp(errors, 'childrenNumber')}>
                  <Form.Item
                    name="haveFriend"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'haveFriend', value, true),
                    }]}
                  >
                    <Switch />
                  </Form.Item>
                </Cell>
                {
                  formHaveFriend && (
                    <>
                      <Cell title={requiredTitle('亲友姓名')} help={customHelp(errors, 'friendName')}>
                        <Form.Item
                          name="friendName"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'friendName', value, formHaveFriend),
                          }]}
                        >
                          <Input clearable type="text" placeholder="请输入亲友姓名" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('亲友关系')} help={customHelp(errors, 'friendRelation')}>
                        <Form.Item
                          name="friendRelation"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'friendRelation', value, formHaveFriend),
                          }]}
                        >
                          <ZaSelect dataSource={relationOptions} placeholder="请选择亲友关系"/>
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('亲友部门')} help={customHelp(errors, 'friendDepartment')}>
                        <Form.Item
                          name="friendDepartment"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'friendDepartment', value, formHaveFriend),
                          }]}
                        >
                          <Input clearable type="text" placeholder="请输入亲友部门" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('亲友职务')} help={customHelp(errors, 'friendDuty')}>
                        <Form.Item
                          name="friendDuty"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'friendDuty', value, formHaveFriend),
                          }]}
                        >
                          <Input clearable type="text" placeholder="请输入亲友职务" />
                        </Form.Item>
                      </Cell>
                    </>
                  )
                }
              </Panel>
              <Panel title="驾驶证信息" className={currentPage === 5 ? 'page-show' : 'page-hide'}>
                <Cell title="驾驶证类型">
                  <Form.Item name="driverLicenseType" noStyle>
                    <Input clearable type="text" placeholder="请输入驾驶证类型" />
                  </Form.Item>
                </Cell>
                <Cell title="驾驶证领证时间">
                  <Form.Item name="driverLicenseDate" trigger="onOk" noStyle>
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
                <Cell title={requiredTitle('是否有服过兵役')} help={customHelp(errors, 'inArmy')}>
                  <Form.Item
                    name="inArmy"
                    noStyle
                    rules={[{
                      validator: async (_, value) => customValidator(setErrors, 'inArmy', value, true),
                    }]}
                  >
                    <Switch />
                  </Form.Item>
                </Cell>
                {
                  formInArmy && (
                    <>
                      <Cell title={requiredTitle('部队驻扎地')} help={customHelp(errors, 'troopBase')}>
                        <Form.Item
                          name="troopBase"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'troopBase', value, true),
                          }]}
                        >
                          <Input clearable type="text" placeholder="请输入部队驻扎地" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('入伍时间')} help={customHelp(errors, 'enlistmentDate')}>
                        <Form.Item
                          name="enlistmentDate"
                          trigger="onOk"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'enlistmentDate', value, true),
                          }]}
                        >
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
                      <Cell title={requiredTitle("退伍时间")} help={customHelp(errors, 'dischargeDate')}>
                        <Form.Item
                          name="dischargeDate"
                          trigger="onOk"
                          noStyle
                          rules={[{
                            validator: async (_, value) => customValidator(setErrors, 'dischargeDate', value, true),
                          }]}
                        >
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
                    </>
                  )
                }
              </Panel>
              <Panel title="工作履历" className={currentPage === 7 ? 'page-show' : 'page-hide'}>
                <WorkList formErrors={errors} />
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
                  <div className="za-tab-bar__title" onClick={() => nextPage()}>下一页</div>
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
