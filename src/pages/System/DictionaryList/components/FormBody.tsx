import React, {useEffect, useState} from 'react';
import { Col, Form, Row } from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { getDictionaryTree } from '@/services/dictionary/dictionary';
import FormTreeSelect from "@/components/FormTreeSelect";
import type { DictionaryVO } from "@/services/dictionary/typings";

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  const [dictionaryTree, setDictionaryTree] = useState<[]>();

  const loopDictionaryData = (dictionaryData: DictionaryVO[]): any =>
    dictionaryData.map(({ id, name, path, children }) => ({
      title: name + (path ? `(${path})` : ''),
      value: id,
      children: children && loopDictionaryData(children),
    }));

  useEffect(() => {
    getDictionaryTree()
      .then((res) => {
        if (res) {
          setDictionaryTree(loopDictionaryData(res));
        } else {
          setDictionaryTree([]);
        }
      })
      .catch(() => {
        setDictionaryTree([]);
      });
  }, []);


  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="字典id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="字典名称"
            rules={[{ required: true, message: '请输入您的字典名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="type"
            label="字典类型"
            options={[
              { label: '分类', value: 0 },
              { label: 'API', value: 1 },
            ]}
            placeholder="请选择字典类型"
            rules={[{ required: true, message: '请选择字典类型' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="path"
            label="字典路由"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('type') === 1,
                message: '请输入字典路由'
              }),
            ]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <Form.Item
            name="pid"
            label="上级字典"
            rules={[
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  const menuId = getFieldValue('id');
                  if (value && value === menuId) {
                    throw new Error('上级字典不能选择自己');
                  }
                },
              }),
            ]}
          >
            <FormTreeSelect treeData={dictionaryTree} placeholder="上级字典" />
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
