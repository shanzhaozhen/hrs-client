import React, {useEffect, useState} from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { getRegionTree } from '@/services/region/region';
import FormTreeSelect from "@/components/FormTreeSelect";
import type { RegionVO } from "@/services/region/typings";

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
      .then(res => {
        if (res) {
          setRegionTree(loopRegionData(res));
        } else {
          setRegionTree([]);
        }
      })
      .catch(() => {
        setRegionTree([]);
      });
  }, []);


  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="区域id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="区域名称"
            rules={[{ required: true, message: '请输入区域名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="type"
            label="区域类型"
            options={[
              { label: '分类', value: 0 },
              { label: 'API', value: 1 },
            ]}
            placeholder="请选择区域类型"
            rules={[{ required: true, message: '请选择区域类型' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="path"
            label="区域路由"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('type') === 1,
                message: '请输入区域路由'
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
            <FormTreeSelect treeData={regionTree} placeholder="上级区域" />
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
