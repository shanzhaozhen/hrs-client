import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { getRegionTree } from '@/services/region/region';
import FormTreeSelect from '@/components/FormTreeSelect';
import type { RegionVO } from '@/services/region/typings';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  const [regionTree, setRegionTree] = useState<[]>();

  const loopRegionData = (regionData: RegionVO[]): any =>
    regionData.map(({ id, name, code, children }) => ({
      title: name + (code ? `(${code})` : ''),
      value: id,
      children: children && loopRegionData(children),
    }));

  useEffect(() => {
    getRegionTree()
      .then(({ data }) => {
        setRegionTree(data ? loopRegionData(data) : []);
      })
      .catch(() => {
        setRegionTree([]);
      });
  }, []);

  return (
    <>
      <ProFormText name="id" label="区域id" hidden={true} />
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="区域名称"
            rules={[{ required: true, message: '请输入区域名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="code"
            label="区域编号"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('type') === 1,
                message: '请输入区域路由',
              }),
            ]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <Form.Item
            name="pid"
            label="上级区域"
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const menuId = getFieldValue('id');
                  if (value && value === menuId) {
                    throw new Error('上级区域不能选择自己');
                  }
                },
              }),
            ]}
          >
            <FormTreeSelect treeData={regionTree} style={{ width: 328 }} placeholder="上级区域" />
          </Form.Item>
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit width="md" name="level" label="层级" min={1} />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
