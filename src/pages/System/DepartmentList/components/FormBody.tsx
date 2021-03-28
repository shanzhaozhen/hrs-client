import React, {useEffect, useState} from 'react';
import {Col, Form, Row} from 'antd';
import {ProFormDigit, ProFormText} from '@ant-design/pro-form';
import { getDepartmentTree } from "@/services/department/department";
import type { DepartmentVO } from "@/services/department/typings";
import FormTreeSelect from "@/components/FormTreeSelect";

interface FormProps {
  isEdit?: boolean;
}

const loopDepartmentData = (departmentList: DepartmentVO[]): any =>
  departmentList.map(({ id, name, children }) => ({
    value: id,
    title: name,
    children: children && loopDepartmentData(children),
  }));

const FormBody: React.FC<FormProps> = () => {

  const [departmentTree, setDepartmentTree] = useState<[]>();

  useEffect(() => {
    getDepartmentTree()
      .then(res => {
        if (res) {
          setDepartmentTree(loopDepartmentData(res));
        } else {
          setDepartmentTree([]);
        }
      })
      .catch(() => {
        setDepartmentTree([]);
      });
  }, []);

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="部门id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="code"
            label="部门代码"
            placeholder="请输入部门代码"
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <Form.Item
            name="pid"
            label="上级部门"
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const menuId = getFieldValue('id');
                  if (value && value === menuId) {
                    throw new Error('上级部门不能选择自己');
                  }
                },
              }),
            ]}
          >
            <FormTreeSelect treeData={departmentTree} placeholder="请选择所属部门" />
          </Form.Item>
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
