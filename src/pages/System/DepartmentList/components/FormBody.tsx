import React from 'react';
import { Col, Row } from 'antd';
import {ProFormDigit, ProFormSelect, ProFormText} from '@ant-design/pro-form';
import { getAllDepartments } from "@/services/department/department";
import type { DepartmentVO } from "@/services/department/typings";

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="部门id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="部门名称"
            fieldProps={{ autoComplete: 'off' }}
            rules={[{ required: true, message: '请输入您的部门名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="code"
            label="部门代码"
            rules={[{ message: '请输入您的部门代码' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="pid"
            label="上级部门"
            params={{}}
            showSearch={false}
            placeholder="请选择上级部门"
            request={async () => {
              const data = await getAllDepartments();
              if (data) {
                return data.map((item: DepartmentVO) => {
                  return {
                    label: item.name + (item.code ? `${(item.code)}`: ''),
                    value: item.id,
                  };
                });
              }
              return [];
            }}
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const menuId = getFieldValue('id');

                  // 编辑状态时，如果密码为空不进行校验
                  if (value && value === menuId) {
                    throw new Error('上级部门不能选择自己');
                  }
                },
              }),
            ]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit width="md" name="priority" label="排序等级" min={1} />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
