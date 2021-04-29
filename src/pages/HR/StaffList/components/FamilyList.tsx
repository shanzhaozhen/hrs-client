import React, {useState} from 'react';
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";
import type { FamilyForm, FamilyVO } from "@/services/family/typings";
import ProForm from "@ant-design/pro-form";
import {getDictionaryChildrenByCode} from "@/services/dictionary/dictionary";
import type { FormInstance } from "antd";

interface FamilyListProps {
  staffId?: number;
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
      title: '学校',
      dataIndex: 'schoolName',
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
      title: '开始日期',
      dataIndex: 'startDate',
      valueType: 'date',
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      valueType: 'date',
    },
    {
      title: '学历',
      dataIndex: 'education',
      valueType: 'text',
      request: async ({ keyWords }) => {
        const { data } = await getDictionaryChildrenByCode('Education', keyWords);
        return data ? data.map(item => ({
          value: item.name,
          label: item.name
        })) : []
      }
    },
    {
      title: '专业',
      dataIndex: 'major',
      valueType: 'text',
    },
    {
      title: '学制',
      dataIndex: 'studyYears',
      valueType: 'digit',
    },
    {
      title: '是否全日制',
      dataIndex: 'fullTime',
      valueType: 'switch',
      render: (_, {fullTime}) => (fullTime ? '是' : '否'),
    },
    {
      title: '证明人姓名',
      dataIndex: 'witnessName',
      valueType: 'text',
    },
    {
      title: '证明人电话',
      dataIndex: 'witnessPhone',
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
