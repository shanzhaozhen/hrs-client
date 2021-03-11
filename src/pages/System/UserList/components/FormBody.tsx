import React from 'react';
import { Col, Row } from 'antd';
import { ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { getAllRoles } from '@/services/role/role';
import type { RoleVO } from '@/services/role/typings';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isEdit } = props;

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="用户id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            disabled={isEdit}
            fieldProps={{ autoComplete: 'off' }}
            rules={[{ required: true, message: '请输入您的用户名' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText width="md" name="name" label="姓名" />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText.Password
            width="md"
            label="密码"
            name="password"
            fieldProps={{ autoComplete: 'off' }}
            rules={[
              {
                required: !isEdit,
                validator: async (rule, value) => {
                  // 编辑模式时不为空才判断
                  if (isEdit && !value) return;

                  // 密码不能小于六位，至少含字母、数字、特殊字符其中的2种！
                  const regExp = new RegExp(
                    /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[/\\?.,~!@#$%^&*()_+={}|:<>[\]]).*$/,
                  );
                  if (!regExp.test(value)) {
                    throw new Error('密码长度为6-20位，且含字母、数字、特殊字符！');
                  }
                },
              },
            ]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText.Password
            width="md"
            label="确认密码"
            name="re-password"
            rules={[
              { required: !isEdit },
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const password = getFieldValue('password');

                  // 编辑状态时，如果密码为空不进行校验
                  if (isEdit && !password) return;

                  if (!value) {
                    throw new Error('确认密码不能为空');
                  }

                  if (password !== value) {
                    throw new Error('两次输入的密码不一致');
                  }
                },
              }),
            ]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText width="md" name="nickname" label="昵称" />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="sex"
            label="性别"
            options={[
              { label: '男', value: 0 },
              { label: '女', value: 1 },
            ]}
            placeholder="请选择您的性别"
            rules={[{ message: '请选择您的性别' }]}
          />
        </Col>
        <Col span={24}>
          <ProFormSelect
            mode="multiple"
            name="roleIds"
            label="角色"
            params={{}}
            showSearch={false}
            placeholder="请选择用户角色"
            request={async () => {
              const data = await getAllRoles();
              if (data) {
                return data.map((item: RoleVO) => ({
                  label: item.name,
                  value: item.id,
                }));
              }
              return [];
            }}
          />
        </Col>
        <Col xl={6} md={12} sm={24}>
          <ProFormSwitch
            name="accountNonExpired"
            label="是否过期"
            checkedChildren="未过期"
            unCheckedChildren="已过期"
          />
        </Col>
        <Col xl={6} md={12} sm={24}>
          <ProFormSwitch
            name="accountNonLocked"
            label="是否锁定"
            checkedChildren="开启"
            unCheckedChildren="锁定"
          />
        </Col>
        <Col xl={6} md={12} sm={24}>
          <ProFormSwitch
            name="credentialsNonExpired"
            label="密码过期"
            checkedChildren="未过期"
            unCheckedChildren="已过期"
          />
        </Col>
        <Col xl={6} md={12} sm={24}>
          <ProFormSwitch
            name="enabled"
            label="是否禁用"
            checkedChildren="可用"
            unCheckedChildren="禁用"
          />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
