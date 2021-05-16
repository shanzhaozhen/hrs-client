import 'zarm/dist/zarm.css';
import React, { useRef, useState} from 'react';
import type {ReactNode} from 'react';
import { Button, Cell, DateSelect, Icon, Input, Message } from "zarm";
import type { FormInstance} from 'antd';
import { Form } from 'antd';
import ProForm from '@ant-design/pro-form';
import ZarmSelect from "@/components/CustomZarm/ZarmSelect";
import ZarmOtherSelect from "@/components/CustomZarm/ZarmOtherSelect";


const ResumeFill: React.FC = () => {
  const [errors, setErrors] = useState<any>({});

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
              <Input clearable type="text" placeholder="请输入身份证号码" />
            </Form.Item>
          </Cell>
          <Cell title="性别" help={customHelp('sex')}>
            <Form.Item
              name="sex"
              noStyle
            >
              <Input clearable type="text" placeholder="输入身份证号码自动识别性别" disabled />
            </Form.Item>
          </Cell>
          <Cell title="生日日期">
            <Form.Item
              name="birthday"
              trigger="onOk"
              noStyle
            >
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
            <Form.Item
              name="householdType"
              noStyle
            >
              <ZarmSelect
                dataSource={[
                  { label: `1`, value: 1 },
                  { label: `2`, value: 2 }
                ]}
                placeholder="请选择户口类型"
              />
            </Form.Item>
          </Cell>
          <Cell title="民族">
            <Form.Item
              name="nation"
              noStyle
            >
              <ZarmSelect
                placeholder="请选择民族"
              />
            </Form.Item>
          </Cell>
          <Cell title="政治面貌">
            <Form.Item
              name="politics"
              noStyle
            >
              <ZarmSelect
                placeholder="请选择政治面貌"
              />
            </Form.Item>
          </Cell>
          <Cell title="最高学历">
            <Form.Item
              name="education"
              noStyle
            >
              <ZarmSelect
                placeholder="请选择最高学历"
              />
            </Form.Item>
          </Cell>
          <Cell title="学位">
            <Form.Item
              name="degree"
              noStyle
            >
              <ZarmSelect
                placeholder="请选择学位"
              />
            </Form.Item>
          </Cell>
          <Cell title="特长">
            <Form.Item
              name="specialty"
              noStyle
            >
              <Input clearable type="text" placeholder="请输入特长" />
            </Form.Item>
          </Cell>
          <Cell title="爱好">
            <Form.Item
              name="hobby"
              noStyle
            >
              <Input clearable type="text" placeholder="请输入爱好" />
            </Form.Item>
          </Cell>
          <ZarmOtherSelect title="父母赡养情况" />
          <Button block theme="primary" onClick={formRef.current?.submit}>提交</Button>
        </ProForm>
      </div>
    </>
  );
};


export default ResumeFill;
