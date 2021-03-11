import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { getAllMenuTree } from '@/services/menu/menu';
import type { MenuVO } from '@/services/menu/typings';
import FormTree from '@/components/FormTree';
import { getAllResourceTree } from '@/services/resource/resource';

interface FormProps {
  isEdit?: boolean;
}

const loopMenuData = (menuData: MenuVO[]): any =>
  menuData.map(({ id, name, children }) => ({
    title: name,
    key: id,
    children: children && loopMenuData(children),
  }));

const FormBody: React.FC<FormProps> = () => {
  const [menuTree, setMenuTree] = useState<[]>();
  const [resourceTree, setResourcesTree] = useState<[]>();

  useEffect(() => {
    getAllMenuTree()
      .then((res) => {
        if (res) {
          setMenuTree(loopMenuData(res));
        } else {
          setMenuTree([]);
        }
      })
      .catch(() => {
        setMenuTree([]);
      });

    getAllResourceTree()
      .then((res) => {
        if (res) {
          setResourcesTree(loopMenuData(res));
        } else {
          setResourcesTree([]);
        }
      })
      .catch(() => {
        setResourcesTree([]);
      });
  }, []);

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="角色id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="角色名称"
            fieldProps={{ autoComplete: 'off' }}
            rules={[{ required: true, message: '请输入您的角色名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="identification"
            label="标识名称"
            rules={[{ required: true, message: '请输入您的标识名称' }]}
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
