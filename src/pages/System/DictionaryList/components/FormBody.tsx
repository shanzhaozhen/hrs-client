import React from 'react';
import { Col, Row } from 'antd';
import { ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

interface FormProps {
  isEdit?: boolean;
}

const FormBody: React.FC<FormProps> = () => {
  // const [dictionaryTree, setDictionaryTree] = useState<any[]>([]);
  //
  // useEffect(() => {
  //   getDictionaryRootList()
  //     .then(res => {
  //       if (res) {
  //         setDictionaryTree(res.map(({ id, name, pid }) => ({
  //           key: id,
  //           value: id,
  //           title: name,
  //           pid,
  //           isLeaf: false
  //         })));
  //       } else {
  //         setDictionaryTree([]);
  //       }
  //     })
  //     .catch(() => {
  //       setDictionaryTree([]);
  //     });
  // }, []);
  //
  // const updateDictionaryTreeData = (list: DataNode[], key: React.Key, children: any[]): DataNode[] => {
  //   return list.map(node => {
  //     if (node.key === key) {
  //       if (children && children.length > 0) {
  //         return {
  //           ...node,
  //           children,
  //         };
  //       }
  //       return {
  //         ...node,
  //         isLeaf: true,
  //       };
  //     }
  //     if (node.children) {
  //       return {
  //         ...node,
  //         children: updateDictionaryTreeData(node.children, key, children),
  //       };
  //     }
  //     return node;
  //   });
  // }
  //
  // const onLoadDictionaryTreeData = async ({ key }: any) => {
  //   const { data } = await getDictionaryChildrenById(key);
  //
  //   setDictionaryTree(origin => updateDictionaryTreeData(origin, key, data.map(({ id, name }) => ({
  //     key: id,
  //     value: id,
  //     title: name,
  //     isLeaf: false
  //   }))));
  // }

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="字典id" hidden={true} />
        <ProFormText name="pid" label="父节点" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="name"
            label="字典名称"
            rules={[{ required: true, message: '请输入字典名称' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="code"
            label="字典编码"
            placeholder="请输入字典编码"
            rules={[{ required: true, message: '请输入字典编码' }]}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="express"
            label="字典表达值"
            placeholder="请输入字典表达值"
            rules={[{ required: false, message: '请输入字典编码' }]}
          />
        </Col>
        {/* <Col xl={12} lg={12} md={24}>
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
            <FormTreeSelect loadData={onLoadDictionaryTreeData} treeData={dictionaryTree} placeholder="上级字典" />
          </Form.Item>
        </Col> */}
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit width="md" name="priority" label="排序等级" min={1} />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="description" label="描述" />
        </Col>
      </Row>
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
