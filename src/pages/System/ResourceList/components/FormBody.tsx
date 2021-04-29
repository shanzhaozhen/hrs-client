import React, {useEffect, useState} from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { getResourceTree } from '@/services/resource/resource';
import FormTreeSelect from "@/components/FormTreeSelect";
import type { ResourceVO } from "@/services/resource/typings";

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  const [resourceTree, setResourceTree] = useState<[]>();

  const loopResourceData = (resourceData: ResourceVO[]): any =>
    resourceData.map(({ id, name, path, children }) => ({
      title: name + (path ? `(${path})` : ''),
      value: id,
      children: children && loopResourceData(children),
    }));

  useEffect(() => {
    getResourceTree()
      .then(({ data }) => {
        setResourceTree(data ? loopResourceData(data) : []);
      })
      .catch(() => {
        setResourceTree([]);
      });
  }, []);


  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="资源id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="资源名称"
            rules={[{ required: true, message: '请输入资源名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="type"
            label="资源类型"
            options={[
              { label: '分类', value: 0 },
              { label: 'API', value: 1 },
            ]}
            placeholder="请选择资源类型"
            rules={[{ required: true, message: '请选择资源类型' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="path"
            label="资源路由"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('type') === 1,
                message: '请输入资源路由'
              }),
            ]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <Form.Item
            name="pid"
            label="上级资源"
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const menuId = getFieldValue('id');
                  if (value && value === menuId) {
                    throw new Error('上级资源不能选择自己');
                  }
                },
              }),
            ]}
          >
            <FormTreeSelect treeData={resourceTree} placeholder="上级资源" />
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
