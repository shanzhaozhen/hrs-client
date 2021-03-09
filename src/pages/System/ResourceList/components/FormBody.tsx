import React from 'react';
import { Col, Row } from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { MenuVO } from '@/services/menu/typings';
import { getAllResourceRootTree } from '@/services/resource/resource';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  FormBody.defaultProps = {
    isEdit: false,
  };

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="资源id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="资源名称"
            fieldProps={{ autoComplete: 'off' }}
            rules={[{ required: true, message: '请输入您的资源名称' }]}
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
          <ProFormText width="md" name="path" label="资源路由" />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="pid"
            label="上级路由"
            params={{}}
            showSearch={false}
            placeholder="请选择上级路由"
            request={async () => {
              const data = await getAllResourceRootTree();
              if (data) {
                return data.map((item: MenuVO) => {
                  return {
                    label: item.name + (item.path ? `(${item.path})` : ''),
                    value: item.id,
                  };
                });
              }
              return [];
            }}
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const resourceId = getFieldValue('id');
                  // 编辑状态时，如果密码为空不进行校验
                  if (value && value === resourceId) {
                    throw new Error('上级路由不能选择自己');
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

export default FormBody;
