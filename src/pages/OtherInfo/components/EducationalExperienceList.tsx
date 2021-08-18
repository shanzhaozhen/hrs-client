import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type {
  EducationalExperienceForm,
  EducationalExperienceVO,
} from '@/services/educational-experience/typings';
import type { FormInstance } from 'antd';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';

interface EducationalExperienceListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (EducationalExperienceVO | EducationalExperienceForm)[];
}

const EducationalExperienceList: React.FC<EducationalExperienceListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : [],
  );

  const columns: ProColumns<EducationalExperienceForm>[] = [
    {
      title: '学校',
      dataIndex: 'schoolName',
      valueType: 'text',
      fixed: 'left',
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
      title: '专业',
      dataIndex: 'major',
      valueType: 'text',
    },
    {
      title: '学历',
      dataIndex: 'education',
      valueType: 'text',
    },
    {
      title: '学位',
      dataIndex: 'degree',
      valueType: 'text',
    },
    {
      title: '学位授予日期',
      dataIndex: 'degreeDate',
      valueType: 'date',
    },
    {
      title: '学位授予单位',
      dataIndex: 'degreeCompany',
      valueType: 'text',
    },
    {
      title: '学历证书编号',
      dataIndex: 'educationNumber',
      valueType: 'text',
    },
    {
      title: '学位证书编号',
      dataIndex: 'degreeNumber',
      valueType: 'text',
    },
    {
      title: '是否最高学历',
      dataIndex: 'isHighestEducation',
      valueType: 'text',
    },
    {
      title: '入职学历',
      dataIndex: 'entryEducation',
      valueType: 'text',
    },
    {
      title: '是否入职学历',
      dataIndex: 'isEntryEducation',
      valueType: 'text',
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
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'textarea',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      align: 'center',
      fixed: 'right',
      hideInTable: readonly,
    },
  ];

  return (
    <>
      <ProFormItem name="educationalExperienceList" trigger="onValuesChange">
        <EditableProTable<EducationalExperienceForm>
          dataSource={value}
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          scroll={{ x: 2500 }}
          recordCreatorProps={
            readonly
              ? false
              : {
                  newRecordType: 'dataSource',
                  position: 'bottom',
                  record: () => ({
                    id: new Date().getTime(),
                  }),
                }
          }
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

export default EducationalExperienceList;
