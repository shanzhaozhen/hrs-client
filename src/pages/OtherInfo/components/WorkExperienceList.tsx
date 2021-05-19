import React, {useState} from 'react';
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";
import type { WorkExperienceForm, WorkExperienceVO } from "@/services/work-experience/typings";
import type { FormInstance } from "antd";
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import {getDictionaryChildrenByCode} from "@/services/dictionary/dictionary";

interface WorkExperienceListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (WorkExperienceVO | WorkExperienceForm)[];
}

const WorkExperienceList: React.FC<WorkExperienceListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : []
  );

  const columns: ProColumns<WorkExperienceForm>[] = [
    {
      title: '工作单位',
      dataIndex: 'workUnit',
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
      title: '职务/岗位',
      dataIndex: 'duty',
      valueType: 'text',
    },
    {
      title: '单位性质',
      dataIndex: 'unitType',
      valueType: 'select',
      request: async ({ keyWords }) => {
        const { data } = await getDictionaryChildrenByCode('UnitType', keyWords);
        return data ? data.map(item => ({
          value: item.name,
          label: item.name
        })) : []
      }
    },
    {
      title: '月薪',
      dataIndex: 'salary',
      valueType: 'digit',
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
      <ProFormItem
        name="workExperienceList"
        trigger="onValuesChange"
      >
        <EditableProTable<WorkExperienceForm>
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
      </ProFormItem>
    </>
  );
};

export default WorkExperienceList;
