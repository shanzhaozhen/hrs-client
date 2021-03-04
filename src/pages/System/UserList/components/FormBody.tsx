import React from 'react';
import { Col, Row } from 'antd';
import ProForm, { ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { getAllRoles } from '@/services/role/role';
import type { RoleVO } from '@/services/role/typings';
import type { UserForm } from '@/services/user/typings';

interface FormProps {
  isEdit?: boolean;
  handleSubmit: (formData: UserForm) => Promise<boolean | void>;
  initialValues?: UserForm;
}

const FormBody: React.FC<FormProps> = (props) => {
  FormBody.defaultProps = {
    isEdit: false,
  };

  const { isEdit, handleSubmit, initialValues } = props;

  return (
    <>
      <ProForm
        onFinish={handleSubmit}
        // initialValues自动填充默认值
        initialValues={initialValues}
      >
        <ProFormText name="text" label="id" placeholder="用户id" hidden={true} />
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            disabled={isEdit}
            fieldProps={{ autoComplete: 'off' }}
            rules={[{ required: true, message: '请输入您的用户名' }]}
          />
          <ProFormText width="md" name="name" label="姓名" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password
            width="md"
            label="密码"
            name="password"
            fieldProps={{ autoComplete: 'off' }}
            rules={[{ required: true, message: '请输入您的密码' }]}
          />
          <ProFormText.Password
            width="md"
            label="确认密码"
            name="re-password"
            rules={[{ required: true, message: '请输入您的密码' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="nickname" label="昵称" />
          <ProFormSelect
            width="md"
            name="sex"
            label="性别"
            valueEnum={{
              0: { text: '男' },
              1: { text: '女' },
            }}
            placeholder="请选择你的角色"
            rules={[{ message: '请选择您的性别' }]}
          />
        </ProForm.Group>
        <ProFormSelect
          mode="tags"
          name="roleIds"
          label="角色"
          params={{}}
          placeholder="请选择用户角色"
          request={async () => {
            const res = await getAllRoles();
            if (res.code === 0 && res.data) {
              const { data } = res;
              if (data.length) {
                return data.map((item: RoleVO) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                });
              }
            }
            return [];
          }}
        />
        <Row justify="space-between">
          <Col span={6}>
            <ProFormSwitch name="accountNonExpired" label="是否过期" />
          </Col>
          <Col span={6}>
            <ProFormSwitch name="accountNonLocked" label="是否锁定" />
          </Col>
          <Col span={6}>
            <ProFormSwitch name="credentialsNonExpired" label="是否冻结" />
          </Col>
          <Col span={6}>
            <ProFormSwitch name="enabled" label="是否禁用" />
          </Col>
        </Row>
      </ProForm>
    </>
  );
};

export default FormBody;
