import React, {useState} from 'react';
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";
import type { EducationalExperienceForm, EducationalExperienceVO } from "@/services/educational-experience/typings";
import ProForm from "@ant-design/pro-form";

interface EducationalExperienceListProps {
  staffId?: number;
  readonly?: boolean;
  value?: EducationalExperienceVO[];
}

const EducationalExperienceList: React.FC<EducationalExperienceListProps> = (props) => {
  const { readonly, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : []
  );

  const columns: ProColumns<EducationalExperienceForm>[] = [
    {
      title: '学校',
      dataIndex: 'schoolName',
      valueType: 'text',
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
        label="学习经历"
        name="educationalExperienceList"
        trigger="onValuesChange"
      >
        <EditableProTable<EducationalExperienceForm>
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

export default EducationalExperienceList;
