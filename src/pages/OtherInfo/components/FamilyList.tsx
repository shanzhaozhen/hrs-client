import React, {useState} from 'react';
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";
import type { FamilyForm, FamilyVO } from "@/services/family/typings";
import ProForm from "@ant-design/pro-form";
import {getDictionaryChildrenByCode} from "@/services/dictionary/dictionary";
import type { FormInstance } from "antd";

interface FamilyListProps {
  readonly?: boolean;
  editForm: FormInstance;
  value?: (FamilyVO | FamilyForm)[];
}

const FamilyList: React.FC<FamilyListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : []
  );

  const columns: ProColumns<FamilyForm>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '关系',
      dataIndex: 'relation',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      request: async ({ keyWords }) => {
        const { data } = await getDictionaryChildrenByCode('Relation', keyWords);
        return data ? data.map(item => ({
          value: item.name,
          label: item.name
        })) : []
      }
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      valueType: 'date',
    },
    {
      title: '政治面貌',
      dataIndex: 'politics',
      valueType: 'text',
      request: async ({ keyWords }) => {
        const { data } = await getDictionaryChildrenByCode('Politics', keyWords);
        return data ? data.map(item => ({
          value: item.name,
          label: item.name
        })) : []
      }
    },
    {
      title: '工作单位',
      dataIndex: 'workUnit',
      valueType: 'text',
    },
    {
      title: '职务',
      dataIndex: 'duty',
      valueType: 'text',
    },
    {
      title: '移动电话',
      dataIndex: 'mobilePhone',
      valueType: 'text',
    },
    {
      title: '固话',
      dataIndex: 'landlinePhone',
      valueType: 'text',
    },
    {
      title: '操作',
      valueType: 'option',
      hideInTable: readonly,
    },
  ];

  return (
    <>
      <ProForm.Item
        label="家庭成员"
        name="familyList"
        trigger="onValuesChange"
      >
        <EditableProTable<FamilyForm>
          dataSource={value}
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          recordCreatorProps={readonly ? false : {
            newRecordType: 'dataSource',
            position: 'bottom',
            record: () => ({
              id: new Date().getTime(),
            }),
          }}
          editable={{
            type: 'multiple',
            form: editForm,
            editableKeys,
            onChange: setEditableRowKeys,
            actionRender: (row, _, dom) => {
              return [dom.delete];
            },
          }}
        />
      </ProForm.Item>
    </>
  );
};

export default FamilyList;
