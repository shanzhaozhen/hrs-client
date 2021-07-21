import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { MenuVO } from '@/services/menu/typings';
import { iconOption } from '@/components/Common/icon';
import { getMenuTree } from '@/services/menu/menu';
import FormTreeSelect from '@/components/FormTreeSelect';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  const [menuTree, setMenuTree] = useState<[]>();

  const loopMenuData = (menuData: MenuVO[]): any =>
    menuData.map(({ id, name, path, children }) => ({
      title: name + (path ? `(${path})` : ''),
      value: id,
      children: children && loopMenuData(children),
    }));

  useEffect(() => {
    getMenuTree()
      .then(({ data }) => {
        setMenuTree(data ? loopMenuData(data) : []);
      })
      .catch(() => {
        setMenuTree([]);
      });
  }, []);

  return (
    <>
      <ProFormText name="id" label="菜单id" hidden={true} />
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText width="md" name="locale" label="菜单名称（本地化）" />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="path"
            label="菜单路径"
            rules={[{ required: true, message: '请输入菜单路径' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <Form.Item
            name="pid"
            label="上级菜单"
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const menuId = getFieldValue('id');
                  if (value && value === menuId) {
                    throw new Error('上级菜单不能选择自己');
                  }
                },
              }),
            ]}
          >
            <FormTreeSelect treeData={menuTree} style={{ width: 328 }} placeholder="上级菜单" />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect width="md" name="icon" label="图标" showSearch options={iconOption} />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit width="md" name="priority" label="排序等级" min={1} />
        </Col>
        <Col xl={12} md={12} sm={24}>
          <ProFormSwitch
            name="hideInMenu"
            label="菜单是否隐藏"
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </Col>
        <Col xl={12} md={12} sm={24}>
          <ProFormSwitch
            name="hideChildrenInMenu"
            label="隐藏子节点"
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="props" label="参数" />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="description" label="菜单描述" />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
