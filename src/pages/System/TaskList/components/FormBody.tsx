import type { MutableRefObject } from 'react';
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Col, Form, Row } from 'antd';
import { ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { getBeanInfoByName, getBeanInfoList } from '@/services/bean/bean';
import MethodParamInfo from '@/pages/System/TaskList/components/MethodParamInfo';
import type { MethodInfo } from '@/services/bean/typings';

interface FormProps {
  isEdit?: boolean;
  formRef: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { formRef } = props;

  const [beanNameOptions, setBeanNameOptions] = useState<any[]>();
  const [methodOptions, setMethodOptions] = useState<any[]>();

  const toMethodSimpleName = (value: MethodInfo) => {
    let { methodName } = value;
    const { paramTypes } = value;
    methodName += '(';
    if (paramTypes && paramTypes.length > 0) {
      paramTypes.forEach((item, index) => {
        const splits = item.split('.');
        methodName += splits[splits.length - 1];
        if (index < paramTypes.length - 1) {
          methodName += ', ';
        }
      });
    }
    return `${methodName})`;
  };

  const getMethodOptions = async (beanName: string) => {
    const { data } = await getBeanInfoByName(beanName);
    if (data && data.methods) {
      const options = data.methods.map((method) => {
        return {
          label: toMethodSimpleName(method),
          value: JSON.stringify(method),
        };
      });
      setMethodOptions(options);
    }
  };

  const beanSelectOnchange = async (changeValue: string) => {
    if (changeValue) {
      await getMethodOptions(changeValue);
    } else {
      setMethodOptions([]);
    }
    // 清除方法选中的值
    const value = formRef.current.getFieldsValue();
    value.methodInfo = null;
    value.paramInfo = null;
    formRef.current.setFieldsValue(value);
  };

  const methodSelectOnchange = (changeValue: string) => {
    if (changeValue) {
      const method = JSON.parse(changeValue);
      if (method) {
        const { paramTypes } = method;
        const methodParams = [];
        if (paramTypes && paramTypes.length > 0) {
          for (let i = 0; i < paramTypes.length; i += 1) {
            methodParams.push({
              paramType: paramTypes[i],
              paramValue: '',
            });
          }
        }
        const formValue = formRef.current.getFieldsValue();
        formValue.paramInfo = JSON.stringify(methodParams);
        formRef.current.setFieldsValue(formValue);
      }
    }
  };

  useEffect(() => {
    getBeanInfoList().then(({ data }) => {
      setBeanNameOptions(
        data
          ? data.map(({ beanName }) => ({
              label: beanName,
              value: beanName,
            }))
          : [],
      );
    });

    if (formRef) {
      const fieldValue = formRef.current.getFieldValue('beanName');
      if (fieldValue) {
        getMethodOptions(fieldValue).then();
      }
    }
  }, []);

  return (
    <>
      <ProFormText name="id" label="任务id" hidden={true} />
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="任务名称"
            placeholder="请输入任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="cron"
            label="cron表达式"
            placeholder="请输入cron表达式"
            rules={[{ required: true, message: '请输入cron表达式' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            name="beanName"
            label="Bean名称"
            showSearch={true}
            placeholder="请选择Bean"
            options={beanNameOptions}
            rules={[{ required: true, message: '请选择Bean名称' }]}
            fieldProps={{ onChange: beanSelectOnchange }}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            name="methodInfo"
            label="方法名"
            showSearch={true}
            placeholder="请选择Bean"
            options={methodOptions}
            rules={[{ required: true, message: '请选择方法名' }]}
            fieldProps={{ onChange: methodSelectOnchange }}
          />
        </Col>
        <Col span={24}>
          <Form.Item name="paramInfo" label="参数（请以JSON的方式输入）">
            <MethodParamInfo />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSwitch
            name="open"
            label="开启状态"
            checkedChildren="开启"
            unCheckedChildren="停止"
            fieldProps={{ defaultChecked: true }}
          />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="description" label="描述" />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
