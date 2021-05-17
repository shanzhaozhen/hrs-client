import 'zarm/dist/zarm.css';
// import './index.less';
import React, { useRef, useState} from 'react';
import type {ReactNode} from 'react';
import {Button, Cell, Collapse, DateSelect, Icon, Input, Message, Switch} from "zarm";
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import ProForm from '@ant-design/pro-form';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import ZaOtherSelect from "@/components/CustomZarm/ZaOtherSelect";
import ZaRegionSelect from "@/components/CustomZarm/ZaRegionSelect";
import type {CollapseItemKey} from "zarm/types/collapse/PropsType";

const ResumeFill: React.FC = () => {
  const [errors, setErrors] = useState<any>({});
  const [ activeKey, setActiveKey ] = useState<CollapseItemKey | CollapseItemKey[] | undefined>("1");
  const [ activeKey1, setActiveKey1 ] = useState<CollapseItemKey | CollapseItemKey[] | undefined>("work1");


  const formRef = useRef<FormInstance>();


  const customValidator = async (currentField: string, value: any, require: boolean, customRule?: () => boolean, customRuleTip?: string) => {
    if (require && !value) {
      setErrors((origin: any) => ({
        ...origin,
        [currentField]: '不能为空'
      }))
      throw new Error('不能为空');
    }

    if (customRule && !customRule()) {
      setErrors((origin: any) => ({
        ...origin,
        [currentField]: customRuleTip || '输入有误'
      }))
      throw new Error(customRuleTip);
    }

    setErrors((origin: any) => ({
      ...origin,
      [currentField]: undefined
    }))
  }

  const customHelp = (currentField: string | number) => {
    return (
      <>
        {
          errors && errors[currentField] ? (
            <Message
              theme="danger"
              icon={<Icon type="warning-round" size="sm" />}
            >
              {errors[currentField] ? errors[currentField] : '输入有误'}
            </Message>
          ) : null
        }
      </>
    )
  }

  const requiredTitle = (title?: ReactNode) => {
    return (
      <>
        <span style={{color: "red"}}>*</span>
        {title}
      </>
    );
  }

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
      <div>
        <ProForm
          formRef={formRef}
          onValuesChange={onFormValuesChange}
          initialValues={{
            // hobby1: 222
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
          <Collapse
            activeKey={activeKey}
            animated
            multiple={false}
            onChange={(changeActiveKey) => {
              setActiveKey(changeActiveKey);
            }}
          >
            <Collapse.Item key="1" title="基础信息" animated>
              <Cell title={requiredTitle('姓名')} help={customHelp('name')}>
                <Form.Item
                  name="name"
                  noStyle
                  rules={[{
                    validator: async (_, value) => customValidator('name', value, true),
                  }]}
                >
                  <Input clearable type="text" placeholder="请输入姓名" />
                </Form.Item>
              </Cell>
              <Cell title={requiredTitle('身份证号码')} help={customHelp('idNumber')}>
                <Form.Item
                  name="idNumber"
                  noStyle
                  rules={[{
                    validator: async (_, value) => customValidator('idNumber', value, true),
                  }]}
                >
                  <Input clearable type="idcard" placeholder="请输入身份证号码" />
                </Form.Item>
              </Cell>
              <Cell title="性别" help={customHelp('sex')}>
                <Form.Item name="sex" noStyle>
                  <Input clearable type="text" placeholder="输入身份证号码自动识别性别" disabled />
                </Form.Item>
              </Cell>
              <Cell title="生日日期">
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
              <Cell title="户口类型">
                <Form.Item name="householdType" noStyle>
                  <ZaSelect placeholder="请选择户口类型"
                  />
                </Form.Item>
              </Cell>
              <Cell title="民族">
                <Form.Item name="nation" noStyle>
                  <ZaSelect placeholder="请选择民族"/>
                </Form.Item>
              </Cell>
              <Cell title="政治面貌">
                <Form.Item name="politics" noStyle>
                  <ZaSelect placeholder="请选择政治面貌"/>
                </Form.Item>
              </Cell>
              <Cell title="最高学历">
                <Form.Item name="education" noStyle>
                  <ZaSelect placeholder="请选择最高学历"/>
                </Form.Item>
              </Cell>
              <Cell title="学位">
                <Form.Item name="degree" noStyle>
                  <ZaSelect placeholder="请选择学位"/>
                </Form.Item>
              </Cell>
              <Cell title="特长">
                <Form.Item name="specialty" noStyle>
                  <Input clearable type="text" placeholder="请输入特长" />
                </Form.Item>
              </Cell>
              <Cell title="爱好">
                <Form.Item name="hobby" noStyle>
                  <Input clearable type="text" placeholder="请输入爱好" />
                </Form.Item>
              </Cell>
              <Form.Item name="parentalSupport" noStyle>
                <ZaOtherSelect
                  title="父母赡养情况"
                  dataSource={[
                    { label: `1`, value: 1 },
                    { label: `2`, value: 2 }
                  ]}
                />
              </Form.Item>
              <Form.Item name="birthAddress" noStyle>
                <ZaRegionSelect
                  title="出生地"
                  level={3}
                  haveDetail
                />
              </Form.Item>
              <Form.Item name="nativeAddress" noStyle>
                <ZaRegionSelect
                  title="籍贯"
                  level={2}
                  haveDetail
                />
              </Form.Item>
              <Form.Item name="registeredAddress" noStyle>
                <ZaRegionSelect
                  title="户口地址"
                  level={3}
                  haveDetail
                />
              </Form.Item>
              <Form.Item name="homeAddress" noStyle>
                <ZaRegionSelect
                  title="家庭住址"
                  level={3}
                  haveDetail
                />
              </Form.Item>
              <Form.Item name="currentAddress" noStyle>
                <ZaRegionSelect
                  title="现住地址"
                  level={3}
                  haveDetail
                />
              </Form.Item>
              <Form.Item name="postalAddress" noStyle>
                <ZaRegionSelect
                  title="邮递地址"
                  level={3}
                  haveDetail
                />
              </Form.Item>
              <Cell title="期望月薪">
                <Form.Item name="expectedSalary" noStyle>
                  <Input clearable type="price" placeholder="请输入期望月薪" />
                </Form.Item>
              </Cell>
              <Cell title="希望服务年限">
                <Form.Item name="serviceYears" noStyle>
                  <Input clearable type="number" placeholder="请输入希望服务年限" />
                </Form.Item>
              </Cell>
              <Cell title="职称">
                <Form.Item name="title" noStyle>
                  <Input clearable type="text" placeholder="请输入职称" />
                </Form.Item>
              </Cell>
              <Form.Item name="applyFor" noStyle>
                <ZaOtherSelect
                  title="应聘途径"
                  dataSource={[
                    { label: `1`, value: 1 },
                    { label: `2`, value: 2 }
                  ]}
                />
              </Form.Item>
              <Cell title="开始工作时间">
                <Form.Item name="workDate" trigger="onOk" noStyle>
                  <DateSelect
                    title="请选择开始工作时间"
                    placeholder="请选择开始工作时间"
                    format="yyyy年MM月dd日"
                    mode="date"
                    min="1900-01-01"
                    max="2027-05-15"
                    hasArrow={false}
                    disabled
                  />
                </Form.Item>
              </Cell>
              <Cell title="联系电话">
                <Form.Item name="phone" noStyle>
                  <Input clearable type="number" placeholder="请输入联系电话" />
                </Form.Item>
              </Cell>
              <Cell title="家庭电话">
                <Form.Item name="homePhone" noStyle>
                  <Input clearable type="number" placeholder="请输入家庭电话" />
                </Form.Item>
              </Cell>
              <Cell title="邮箱">
                <Form.Item name="email" noStyle>
                  <Input clearable type="text" placeholder="请输入邮箱" />
                </Form.Item>
              </Cell>
              <Cell title="QQ">
                <Form.Item name="qq" noStyle>
                  <Input clearable type="number" placeholder="请输入QQ" />
                </Form.Item>
              </Cell>
              <Cell title="紧急联系人">
                <Form.Item name="emergencyContactName" noStyle>
                  <Input clearable type="text" placeholder="请输入紧急联系人" />
                </Form.Item>
              </Cell>
              <Cell title="紧急联系人关系">
                <Form.Item name="emergencyContactRelation" noStyle>
                  <ZaSelect placeholder="请选择紧急联系人关系"/>
                </Form.Item>
              </Cell>
              <Cell title="紧急联系人电话">
                <Form.Item name="emergencyContactPhone" noStyle>
                  <Input clearable type="number" placeholder="请输入紧急联系人电话" />
                </Form.Item>
              </Cell>
              <Cell title="是否愿意加入人才库">
                <Form.Item name="willJoin" noStyle>
                  <Switch defaultChecked />
                </Form.Item>
              </Cell>
            </Collapse.Item>
            <Collapse.Item key="2" title="个人身体情况" animated>
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
            </Collapse.Item>
            <Collapse.Item key="3" title="婚育状况" animated>
              <Cell title="婚姻状况">
                <Form.Item name="maritalStatus" noStyle>
                  <ZaSelect placeholder="请选择婚姻状况"/>
                </Form.Item>
              </Cell>
              <Cell title="结婚日期">
                <Form.Item
                  name="marriageDate"
                  trigger="onOk"
                  noStyle
                >
                  <DateSelect
                    title="请选择结婚日期"
                    placeholder="请选择结婚日期"
                    format="yyyy年MM月dd日"
                    mode="date"
                    min="1900-01-01"
                    max="2027-05-15"
                    hasArrow={false}
                    disabled
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
            </Collapse.Item>
            <Collapse.Item key="4" title="亲友信息" animated>
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
                  <ZaSelect placeholder="请选择亲友关系"/>
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
            </Collapse.Item>
            <Collapse.Item key="5" title="驾驶证信息" animated>
              <Cell title="驾驶证类型">
                <Form.Item
                  name="driverLicenseType"
                  noStyle
                >
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
                    disabled
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
            </Collapse.Item>
            <Collapse.Item key="6" title="服兵役信息" animated>
              <Cell title="部队驻扎地">
                <Form.Item name="troopBase" noStyle>
                  <Input clearable type="number" placeholder="请输入部队驻扎地" />
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
                    disabled
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
                    disabled
                  />
                </Form.Item>
              </Cell>
              <Cell title="退伍时军衔">
                <Form.Item name="dischargeRank" noStyle>
                  <Input clearable type="number" placeholder="请输入退伍时军衔" />
                </Form.Item>
              </Cell>
              <Cell title="立功/贡献">
                <Form.Item name="honour" noStyle>
                  <Input clearable type="number" placeholder="请输入服役期间立功/贡献" />
                </Form.Item>
              </Cell>
            </Collapse.Item>
            <Collapse.Item key="7" title="工作履历" animated>
              <Collapse
                activeKey={activeKey1}
                animated
                multiple
                onChange={(changeActiveKey) => {
                  setActiveKey1(changeActiveKey);
                }}
              >
                <Collapse.Item key="work1" title="第一项" animated>
                  <Cell title="婚姻状况">
                    <Form.Item name="maritalStatus" noStyle>
                      <ZaSelect placeholder="请选择婚姻状况"/>
                    </Form.Item>
                  </Cell>
                  <Cell title="结婚日期">
                    <Form.Item
                      name="marriageDate"
                      trigger="onOk"
                      noStyle
                    >
                      <DateSelect
                        title="请选择结婚日期"
                        placeholder="请选择结婚日期"
                        format="yyyy年MM月dd日"
                        mode="date"
                        min="1900-01-01"
                        max="2027-05-15"
                        hasArrow={false}
                        disabled
                      />
                    </Form.Item>
                  </Cell>
                  <Cell title="配偶名字">
                    <Form.Item name="spouseName" noStyle>
                      <Input clearable type="text" placeholder="请输入配偶名字" />
                    </Form.Item>
                  </Cell>
                </Collapse.Item>
              </Collapse>
            </Collapse.Item>
            <Collapse.Item key="8" title="教育经历" animated>
            </Collapse.Item>
            <Collapse.Item key="9" title="证书信息" animated>
            </Collapse.Item>
            <Collapse.Item key="10" title="家庭信息" animated>
            </Collapse.Item>
          </Collapse>
          <Button block theme="primary" onClick={formRef.current?.submit}>提交</Button>
        </ProForm>
      </div>
    </>
  );
};


export default ResumeFill;
