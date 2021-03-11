import React from 'react';
import { Col, Row } from 'antd';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { getAllMenu } from '@/services/menu/menu';
import type { MenuVO } from '@/services/menu/typings';
import { iconOption } from '@/components/Common/icon';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="菜单id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="菜单名称"
            rules={[{ required: true, message: '请输入您的菜单名称' }]}
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
            rules={[{ required: true, message: '请输入您的菜单路径' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="pid"
            label="上级菜单"
            params={{}}
            showSearch={false}
            placeholder="请选择上级菜单"
            request={async () => {
              const data = await getAllMenu();
              if (data) {
                return data.map((item: MenuVO) => {
                  return {
                    label: `${item.name}(${item.path})`,
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
                    throw new Error('上级菜单不能选择自己');
                  }
                },
              }),
            ]}
          />
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
