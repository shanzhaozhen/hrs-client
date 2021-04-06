import React, {useEffect, useState} from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { getStaffTree } from '@/services/staff/staff';
import FormTreeSelect from "@/components/FormTreeSelect";
import type { StaffVO } from "@/services/staff/typings";

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  const [staffTree, setStaffTree] = useState<[]>();

  const loopStaffData = (staffData: StaffVO[]): any =>
    staffData.map(({ id, name, path, children }) => ({
      title: name + (path ? `(${path})` : ''),
      value: id,
      children: children && loopStaffData(children),
    }));

  useEffect(() => {
    getStaffTree()
      .then((res) => {
        if (res) {
          setStaffTree(loopStaffData(res));
        } else {
          setStaffTree([]);
        }
      })
      .catch(() => {
        setStaffTree([]);
      });
  }, []);


  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="员工id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="员工名称"
            rules={[{ required: true, message: '请输入员工名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="type"
            label="员工类型"
            options={[
              { label: '分类', value: 0 },
              { label: 'API', value: 1 },
            ]}
            placeholder="请选择员工类型"
            rules={[{ required: true, message: '请选择员工类型' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="path"
            label="员工路由"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('type') === 1,
                message: '请输入员工路由'
              }),
            ]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <Form.Item
            name="pid"
            label="上级员工"
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const menuId = getFieldValue('id');
                  if (value && value === menuId) {
                    throw new Error('上级员工不能选择自己');
                  }
                },
              }),
            ]}
          >
            <FormTreeSelect treeData={staffTree} placeholder="上级员工" />
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
