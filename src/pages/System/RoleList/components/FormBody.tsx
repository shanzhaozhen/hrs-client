import React, { useEffect, useState } from 'react';
import { Col, Row, Tree } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { getAllMenuTree } from '@/services/menu/menu';
import type { MenuVO } from '@/services/menu/typings';

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
  FormBody.defaultProps = {
    isEdit: false,
  };

  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

  const [menuTree, setMenuTree] = useState<[]>();

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
  }, []);

  const onCheck = (checkedKeysValue: React.Key[] | any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue.checked);
  };

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
          {/* <ProFormText name="menuIds" label="菜单选择" /> */}
          <ProForm.Item
            label="菜单选择"
            name="menuIds"
            valuePropName="checkedKeys"
            trigger="onCheck"
          >
            <Tree
              checkable
              checkStrictly
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={menuTree}
            />
          </ProForm.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormBody;
