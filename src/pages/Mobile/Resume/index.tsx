import 'zarm/dist/zarm.css';
import './index.less';
import React, { useRef, useState } from 'react';
import {Cell, ConfigProvider, DateSelect, Input, Panel, Switch, Toast} from "zarm";
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import ProForm from '@ant-design/pro-form';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {CheckOutlined, DownOutlined, UpOutlined} from "@ant-design/icons";
import WorkList from "@/pages/Mobile/Resume/components/WorkList";
import EducationalList from "@/pages/Mobile/Resume/components/EducationalList";
import CertificateList from "@/pages/Mobile/Resume/components/CertificateList";
import FamilyList from "@/pages/Mobile/Resume/components/FamilyList";
import {
  customValidator,
  validateAddress,
  validateEmail,
} from "@/utils/validate";
import {useOptions} from "@/utils/options";
import { customHelp, requiredTitle } from "@/utils/zarm";
import {getBirthdayFromIdNumber, getSexFromIdNumber, validateWorkExperienceList} from "@/utils/resume";
import ZaCellInput from "@/components/CustomZarm/ZaCellInput";
import ZaCellDataSelect from "@/components/CustomZarm/ZaCellDataSelect";
import ZaCellSelect from "@/components/CustomZarm/ZaCellSelect";
import ZaCellOtherSelect from "@/components/CustomZarm/ZaCellOtherSelect";
import ZaCellZaRegionSelect from "@/components/CustomZarm/ZaCellZaRegionSelect";
import ZaCellSwitch from "@/components/CustomZarm/ZaCellSwitch";

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

  const simpleHelp = (currentField: string) => (customHelp(errors, currentField));

  const simpleRules = (currentField: string) => ([{
    validator: async (_: any, value: any) => customValidator(setErrors, currentField, value, true),
  }]);

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
      // if (changedValues.hasOwnProperty('workExperienceList')) {
      //   validateWorkExperienceList(changedValues.workExperienceList, setErrors, false);
      // }
    }
  }

  const defaultValidateTrigger = ['onChange', 'onBlur']

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
      setCurrentPage(origin => (origin > 0 && origin < 10 ? origin + 1 : origin))

      console.log(formRef.current?.getFieldsValue());
    } catch (error) {
      console.log(error)
      Toast.show({
        content: '当前页还没填写完成 ',
        stayTime: 3000,
      });
    }
  }

  // @ts-ignore
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
                <ZaCellInput
                  name="name"
                  title="姓名"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入姓名',
                  }}
                  required={true}
                  help={simpleHelp('name')}
                  rules={simpleRules('name')}
                />
                <ZaCellInput
                  name="idNumber"
                  title="身份证号码"
                  zaInputProps={{
                    type: 'idcard',
                    clearable: true,
                    placeholder: '请输入身份证号码',
                  }}
                  required={true}
                  help={simpleHelp('idNumber')}
                  rules={simpleRules('idNumber')}
                />
                <ZaCellInput
                  name="sex"
                  title="身份证号码"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '输入身份证号码自动识别性别',
                    disabled: true
                  }}
                  help={simpleHelp('sex')}
                />
                <ZaCellDataSelect
                  name="birthday"
                  title='生日日期'
                  zaDateSelectProps={{
                    placeholder: '自动识别生日日期',
                    format: 'yyyy年MM月dd日',
                    mode: 'date',
                    min: '1900-01-01',
                    max: '2027-05-15',
                    hasArrow: false
                  }}
                  trigger="onOk"
                  help={simpleHelp('startDate')}
                />
                <ZaCellSelect
                  name="householdType"
                  title="户口类型"
                  required={true}
                  help={simpleHelp('householdType')}
                  rules={simpleRules('householdType')}
                  zaSelectProps={{
                    dataSource: householdTypeOptions,
                    placeholder: '请选择户口类型'
                  }}
                />
                <ZaCellSelect
                  name="nation"
                  title="民族"
                  required={true}
                  help={simpleHelp('nation')}
                  rules={simpleRules('nation')}
                  zaSelectProps={{
                    dataSource: nationOptions,
                    placeholder: '请选择民族'
                  }}
                />
                <ZaCellSelect
                  name="politics"
                  title="政治面貌"
                  required={true}
                  help={simpleHelp('nation')}
                  rules={simpleRules('nation')}
                  zaSelectProps={{
                    dataSource: politicsOptions,
                    placeholder: '请选择政治面貌'
                  }}
                />
                <ZaCellSelect
                  name="education"
                  title="最高学历"
                  required={true}
                  help={simpleHelp('education')}
                  rules={simpleRules('education')}
                  zaSelectProps={{
                    dataSource: educationOptions,
                    placeholder: '请选择最高学历'
                  }}
                />
                <ZaCellSelect
                  name="degree"
                  title="学位"
                  required={true}
                  help={simpleHelp('degree')}
                  rules={simpleRules('degree')}
                  zaSelectProps={{
                    dataSource: degreeOptions,
                    placeholder: '请选择学位'
                  }}
                />
                <ZaCellInput
                  name="specialty"
                  title="特长"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入特长',
                  }}
                  required={true}
                  help={simpleHelp('specialty')}
                  rules={simpleRules('specialty')}
                />
                <ZaCellInput
                  name="hobby"
                  title="爱好"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入爱好',
                  }}
                  required={true}
                  help={simpleHelp('hobby')}
                  rules={simpleRules('hobby')}
                />
                <ZaCellOtherSelect
                  name="parentalSupport"
                  help={simpleHelp('parentalSupport')}
                  rules={simpleRules('parentalSupport')}
                  zaOtherSelectProps={{
                    title:'父母赡养情况',
                    required: true,
                    dataSource: parentalSupportOptions,
                  }}
                />
                <ZaCellZaRegionSelect
                  name="birthAddress"
                  help={simpleHelp('birthAddress')}
                  rules={[{
                    validator: async (_, birthAddress) => customValidator(setErrors, 'birthAddress', birthAddress, true, () => validateAddress(birthAddress, 2, false), '请选择出生地'),
                  }]}
                  zaRegionSelectProps={{
                    title:'出生地',
                    required: true,
                    level: 2
                  }}
                />
                <ZaCellZaRegionSelect
                  name="nativeAddress"
                  help={simpleHelp('nativeAddress')}
                  rules={[{
                    validator: async (_, birthAddress) => customValidator(setErrors, 'nativeAddress', birthAddress, true, () => validateAddress(birthAddress, 2, false), '请选择籍贯'),
                  }]}
                  zaRegionSelectProps={{
                    title:'出生地',
                    required: true,
                    level: 2
                  }}
                />
                <ZaCellZaRegionSelect
                  name="registeredAddress"
                  help={simpleHelp('registeredAddress')}
                  rules={[{
                    validator: async (_, registeredAddress) => customValidator(setErrors, 'registeredAddress', registeredAddress, false, () => validateAddress(registeredAddress, 3, true), '请填写完整的户口地址'),
                  }]}
                  zaRegionSelectProps={{
                    title:'户口地址',
                    required: true,
                    haveDetail: true,
                    level: 3
                  }}
                />
                <ZaCellZaRegionSelect
                  name="homeAddress"
                  help={simpleHelp('homeAddress')}
                  rules={[{
                    validator: async (_, homeAddress) => customValidator(setErrors, 'homeAddress', homeAddress, false, () => validateAddress(homeAddress, 3, true), '请填写完整的家庭住址'),
                  }]}
                  zaRegionSelectProps={{
                    title:'家庭住址',
                    required: true,
                    haveDetail: true,
                    level: 3
                  }}
                />
                <ZaCellZaRegionSelect
                  name="currentAddress"
                  help={simpleHelp('currentAddress')}
                  rules={[{
                    validator: async (_, currentAddress) => customValidator(setErrors, 'currentAddress', currentAddress, false, () => validateAddress(currentAddress, 3, true), '请填写完整的现住住址'),
                  }]}
                  zaRegionSelectProps={{
                    title:'家庭住址',
                    required: true,
                    haveDetail: true,
                    level: 3
                  }}
                />
                <ZaCellZaRegionSelect
                  name="currentAddress"
                  help={simpleHelp('currentAddress')}
                  rules={[{
                    validator: async (_, currentAddress) => customValidator(setErrors, 'currentAddress', currentAddress, false, () => validateAddress(currentAddress, 3, true), '请填写完整的现住住址'),
                  }]}
                  zaRegionSelectProps={{
                    title:'现住住址',
                    required: true,
                    haveDetail: true,
                    level: 3
                  }}
                />
                <ZaCellZaRegionSelect
                  name="postalAddress"
                  help={simpleHelp('postalAddress')}
                  rules={[{
                    validator: async (_, postalAddress) => customValidator(setErrors, 'postalAddress', postalAddress, false, () => validateAddress(postalAddress, 3, true), '请填写完整的邮递地址'),
                  }]}
                  zaRegionSelectProps={{
                    title:'邮递地址',
                    required: true,
                    haveDetail: true,
                    level: 3
                  }}
                />
                <ZaCellInput
                  name="expectedSalary"
                  title="期望月薪"
                  required={true}
                  zaInputProps={{
                    type: 'number',
                    clearable: true,
                    placeholder: '请输入期望月薪',
                  }}
                  help={simpleHelp('expectedSalary')}
                  rules={simpleRules('expectedSalary')}
                />
                <ZaCellInput
                  name="serviceYears"
                  title="希望服务年限"
                  required={true}
                  zaInputProps={{
                    type: 'number',
                    clearable: true,
                    placeholder: '请输入希望服务年限',
                  }}
                  help={simpleHelp('serviceYears')}
                  rules={simpleRules('serviceYears')}
                />
                <ZaCellInput
                  name="applyFor"
                  title="职称"
                  required={true}
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入职称',
                  }}
                  help={simpleHelp('title')}
                  rules={simpleRules('title')}
                />
                <ZaCellInput
                  name="applyFor"
                  title="职称"
                  required={true}
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入职称',
                  }}
                  help={simpleHelp('title')}
                  rules={simpleRules('title')}
                />
                <ZaCellOtherSelect
                  name="applyFor"
                  help={simpleHelp('applyFor')}
                  rules={simpleRules('applyFor')}
                  zaOtherSelectProps={{
                    title:'应聘途径',
                    required: true,
                    dataSource: applyForOptions,
                  }}
                />
                <ZaCellDataSelect
                  name="workDate"
                  title="开始工作时间"
                  zaDateSelectProps={{
                    placeholder: '请选择开始工作时间',
                    format: 'yyyy年MM月dd日',
                    mode: 'date',
                    min: '1900-01-01',
                    max: '2027-05-15',
                    hasArrow: false
                  }}
                  required={true}
                  trigger="onOk"
                  help={simpleHelp('endDate')}
                  rules={simpleRules('endDate')}
                />
                <ZaCellInput
                  name="phone"
                  title="联系电话"
                  zaInputProps={{
                    type: 'number',
                    clearable: true,
                    placeholder: '请输入联系电话',
                  }}
                  required={true}
                  help={simpleHelp('phone')}
                  rules={simpleRules('phone')}
                />
                <ZaCellInput
                  name="phone"
                  title="家庭电话"
                  zaInputProps={{
                    type: 'number',
                    clearable: true,
                    placeholder: '请输入家庭电话',
                  }}
                  required={true}
                  help={simpleHelp('homePhone')}
                  rules={simpleRules('homePhone')}
                />
                <ZaCellInput
                  name="email"
                  title="邮箱"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入邮箱',
                  }}
                  required={true}
                  help={simpleHelp('homePhone')}
                  rules={[{
                    validator: async (_, email) => customValidator(setErrors, 'email', email, true, () => validateEmail(email), '邮箱格式输入不正确'),
                  }]}
                />
                <ZaCellInput
                  name="qq"
                  title="QQ"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入QQ',
                  }}
                  help={simpleHelp('qq')}
                />
                <ZaCellInput
                  name="emergencyContactName"
                  title="紧急联系人"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入紧急联系人',
                  }}
                  required={true}
                  help={simpleHelp('emergencyContactName')}
                  rules={simpleRules('emergencyContactName')}
                />
                <ZaCellSelect
                  name="emergencyContactRelation"
                  title="紧急联系人关系"
                  required={true}
                  help={simpleHelp('emergencyContactRelation')}
                  rules={simpleRules('emergencyContactRelation')}
                  zaSelectProps={{
                    dataSource: relationOptions,
                    placeholder: '请选择紧急联系人关系'
                  }}
                />
                <ZaCellInput
                  name="emergencyContactPhone"
                  title="紧急联系人电话"
                  zaInputProps={{
                    type: 'number',
                    clearable: true,
                    placeholder: '请输入紧急联系人电话',
                  }}
                  required={true}
                  help={simpleHelp('emergencyContactPhone')}
                  rules={simpleRules('emergencyContactPhone')}
                />
                <ZaCellSwitch
                  name="willJoin"
                  title="是否愿意加入人才库"
                  required={true}
                  help={simpleHelp('fullTime')}
                  rules={simpleRules('fullTime')}
                  zaSwitchProps={{
                    defaultChecked: true,
                    checked: true
                  }}
                />
              </Panel>
              <Panel title="个人身体情况" className={currentPage === 2 ? 'page-show' : 'page-hide'}>
                <ZaCellInput
                  name="physicalCondition"
                  title="本人身体状况"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入本人身体状况',
                  }}
                  required={true}
                  help={simpleHelp('physicalCondition')}
                  rules={simpleRules('physicalCondition')}
                />
                <ZaCellInput
                  name="weight"
                  title="体重(KG)"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入您的体重(KG)',
                  }}
                  required={true}
                  help={simpleHelp('weight')}
                  rules={simpleRules('weight')}
                />
                <ZaCellInput
                  name="height"
                  title="身高(CM)"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入您的身高(CM)',
                  }}
                  required={true}
                  help={simpleHelp('height')}
                  rules={simpleRules('height')}
                />
                <ZaCellInput
                  name="height"
                  title="视力"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入您的视力，如5.0',
                  }}
                  required={true}
                  help={simpleHelp('vision')}
                  rules={simpleRules('vision')}
                />
                <ZaCellOtherSelect
                  name="bloodType"
                  help={simpleHelp('bloodType')}
                  rules={simpleRules('bloodType')}
                  zaOtherSelectProps={{
                    title:'血型',
                    required: true,
                    dataSource: bloodTypeOptions,
                  }}
                />
              </Panel>
              <Panel title="婚育情况" className={currentPage === 3 ? 'page-show' : 'page-hide'}>
                <ZaCellSelect
                  name="maritalStatus"
                  title="婚姻状况"
                  required={true}
                  help={simpleHelp('maritalStatus')}
                  rules={simpleRules('maritalStatus')}
                  zaSelectProps={{
                    dataSource: maritalStatusOptions,
                    placeholder: '请选择婚姻状况'
                  }}
                />
                {
                  !formMaritalStatus && (
                    <>
                      <ZaCellDataSelect
                        name="marriageDate"
                        title="结婚日期"
                        zaDateSelectProps={{
                          placeholder: '请选择结婚日期',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        help={simpleHelp('marriageDate')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'marriageDate', value, !formMaritalStatus),
                        }]}
                      />
                      <ZaCellInput
                        name="spouseName"
                        title="配偶名字"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入您的配偶名字',
                        }}
                        required={true}
                        help={simpleHelp('spouseName')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'spouseName', value, !formMaritalStatus),
                        }]}
                      />
                      <ZaCellInput
                        name="spousePhysicalCondition"
                        title="配偶身体状况"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入您的配偶身体状况',
                        }}
                        required={true}
                        help={simpleHelp('spousePhysicalCondition')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'spousePhysicalCondition', value, !formMaritalStatus),
                        }]}
                      />
                      <ZaCellSelect
                        name="fertility"
                        title="生育情况"
                        required={true}
                        help={simpleHelp('fertility')}
                        rules={simpleRules('fertility')}
                        zaSelectProps={{
                          dataSource: [{label: '已育', value: '已育'}, {label: '未育', value: '未育'}],
                          placeholder: '请输入生育情况'
                        }}
                      />
                      {
                        formFertility && (
                          <>
                            <ZaCellInput
                              name="childrenNumber"
                              title="子女人数"
                              zaInputProps={{
                                type: 'number',
                                clearable: true,
                                placeholder: '请输入您的配偶身体状况',
                              }}
                              required={true}
                              help={simpleHelp('childrenNumber')}
                              rules={[{
                                validator: async (_, value) => customValidator(setErrors, 'childrenNumber', value, formFertility),
                              }]}
                            />
                          </>
                        )
                      }
                      {/*
                        todo: 附件
                        <Cell title="结婚证件">
                          <Form.Item
                            name="marriageCertificate"
                            noStyle
                          >
                            <Input clearable type="text" placeholder="请输入结婚证件" />
                          </Form.Item>
                        </Cell>
                       */}
                    </>
                  )
                }
              </Panel>
              <Panel title="亲友信息" className={currentPage === 4 ? 'page-show' : 'page-hide'}>
                <ZaCellSwitch
                  name="haveFriend"
                  title="是否有亲友在司"
                  required={true}
                  help={simpleHelp('haveFriend')}
                  rules={simpleRules('haveFriend')}
                />
                {
                  formHaveFriend && (
                    <>
                      <ZaCellInput
                        name="friendName"
                        title="亲友姓名"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入您亲友的姓名',
                        }}
                        required={true}
                        help={simpleHelp('childrenNumber')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'childrenNumber', value, formFertility),
                        }]}
                      />
                      <ZaCellSelect
                        name="friendRelation"
                        title="亲友关系"
                        required={true}
                        help={simpleHelp('friendRelation')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'friendRelation', value, formHaveFriend),
                        }]}
                        zaSelectProps={{
                          dataSource: relationOptions,
                          placeholder: '请选择亲友关系'
                        }}
                      />
                      <ZaCellInput
                        name="friendDepartment"
                        title="亲友部门"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入亲友部门',
                        }}
                        required={true}
                        help={simpleHelp('friendDepartment')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'friendDepartment', value, formHaveFriend),
                        }]}
                      />
                      <ZaCellInput
                        name="friendDuty"
                        title="亲友职务"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入亲友职务',
                        }}
                        required={true}
                        help={simpleHelp('friendDuty')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'friendDuty', value, formHaveFriend),
                        }]}
                      />
                    </>
                  )
                }
              </Panel>
              <Panel title="驾驶证信息" className={currentPage === 5 ? 'page-show' : 'page-hide'}>
                <ZaCellInput
                  name="driverLicenseType"
                  title="驾驶证类型"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入驾驶证类型',
                  }}
                />
                <ZaCellDataSelect
                  name="driverLicenseDate"
                  title="驾驶证领证时间"
                  zaDateSelectProps={{
                    placeholder: '请选择驾驶证领证时间',
                    format: 'yyyy年MM月dd日',
                    mode: 'date',
                    min: '1900-01-01',
                    max: '2027-05-15',
                    hasArrow: false
                  }}
                  trigger="onOk"
                />
                <ZaCellInput
                  name="driveYear"
                  title="驾龄"
                  zaInputProps={{
                    type: 'number',
                    clearable: true,
                    placeholder: '请输入驾龄',
                  }}
                />
                <ZaCellInput
                  name="driveLines"
                  title="熟悉的驾驶路线"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入熟悉的驾驶路线',
                  }}
                />
                <ZaCellInput
                  name="vehicleType"
                  title="驾驶车种"
                  zaInputProps={{
                    type: 'text',
                    clearable: true,
                    placeholder: '请输入驾驶车种',
                  }}
                />
              </Panel>
              <Panel title="服兵役信息" className={currentPage === 6 ? 'page-show' : 'page-hide'}>
                <ZaCellSwitch
                  name="inArmy"
                  title="是否有服过兵役"
                  required={true}
                  help={simpleHelp('inArmy')}
                  rules={simpleRules('inArmy')}
                />
                {
                  formInArmy && (
                    <>
                      <ZaCellInput
                        name="troopBase"
                        title="部队驻扎地"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入部队驻扎地',
                        }}
                        required={true}
                        help={simpleHelp('troopBase')}
                        validateTrigger={defaultValidateTrigger}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'troopBase', value, true),
                        }]}
                      />
                      <ZaCellDataSelect
                        name="enlistmentDate"
                        title="入伍时间"
                        zaDateSelectProps={{
                          placeholder: '请选择入伍时间',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        help={simpleHelp('enlistmentDate')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'enlistmentDate', value, true),
                        }]}
                      />
                      <ZaCellDataSelect
                        name="dischargeDate"
                        title="退伍时间"
                        zaDateSelectProps={{
                          placeholder: '请选择退伍时间',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        help={simpleHelp('dischargeDate')}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'dischargeDate', value, true),
                        }]}
                      />
                      <ZaCellInput
                        name="dischargeRank"
                        title="退伍时军衔"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入退伍时军衔',
                        }}
                        required={true}
                        help={simpleHelp('dischargeRank')}
                        validateTrigger={defaultValidateTrigger}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'dischargeRank', value, true),
                        }]}
                      />
                      <ZaCellInput
                        name="honour"
                        title="立功/贡献"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入立功/贡献',
                        }}
                        required={true}
                        help={simpleHelp('honour')}
                        validateTrigger={defaultValidateTrigger}
                        rules={[{
                          validator: async (_, value) => customValidator(setErrors, 'honour', value, true),
                        }]}
                      />
                    </>
                  )
                }
              </Panel>
              <Panel title="工作履历" className={currentPage === 7 ? 'page-show' : 'page-hide'}>
                <WorkList errors={errors} setErrors={setErrors} />
              </Panel>
              <Panel title="教育经历" className={currentPage === 8 ? 'page-show' : 'page-hide'}>
                <EducationalList errors={errors} setErrors={setErrors} />
              </Panel>
              <Panel title="证书信息" className={currentPage === 9 ? 'page-show' : 'page-hide'}>
                <CertificateList errors={errors} setErrors={setErrors} />
              </Panel>
              <Panel title="家庭信息" className={currentPage === 10 ? 'page-show' : 'page-hide'}>
                <FamilyList errors={errors} setErrors={setErrors} />
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
