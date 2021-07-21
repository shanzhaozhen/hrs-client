import React from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import FormTree from '@/components/FormTree';
import { useMenuTree } from '@/utils/menu';
import { useResourcesTree } from '@/utils/resources';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  const menuTree = useMenuTree();
  const resourceTree = useResourcesTree();

  return (
    <>
      <ProFormText name="id" label="角色id" hidden={true} />
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="code"
            label="角色代码"
            rules={[{ required: true, message: '请输入角色代码' }]}
          />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="description" label="描述" />
        </Col>
        <Col span={24}>
          <Form.Item name="menuIds" label="菜单分配">
            <FormTree treeData={menuTree} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="resourceIds" label="资源分配">
            <FormTree treeData={resourceTree} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
