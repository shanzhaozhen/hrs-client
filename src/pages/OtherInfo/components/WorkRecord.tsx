import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { WorkRecordForm, WorkRecordVO } from '@/services/work-record/typings';
import type { FormInstance } from 'antd';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';

interface WorkRecordListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (WorkRecordVO | WorkRecordForm)[];
}

const WorkRecordList: React.FC<WorkRecordListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : [],
  );

  const columns: ProColumns<WorkRecordForm>[] = [
    {
      title: '组织',
      dataIndex: 'organization',
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
      title: '人员类别',
      dataIndex: 'category',
      valueType: 'text',
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      valueType: 'date',
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      valueType: 'date',
    },
    {
      title: '部门',
      dataIndex: 'department',
      valueType: 'text',
    },
    {
      title: '岗位',
      dataIndex: 'post',
      valueType: 'text',
    },
    {
      title: '岗位序列',
      dataIndex: 'postType',
      valueType: 'text',
    },
    {
      title: '职务',
      dataIndex: 'duty',
      valueType: 'text',
    },
    {
      title: '职务类别',
      dataIndex: 'dutyType',
      valueType: 'text',
    },
    {
      title: '异动事件',
      dataIndex: 'changeEvent',
      valueType: 'text',
    },
    {
      title: '异动类型',
      dataIndex: 'changeType',
      valueType: 'text',
    },
    {
      title: '异动原因',
      dataIndex: 'changeReason',
      valueType: 'text',
    },
    {
      title: '试用',
      dataIndex: 'trial',
      valueType: 'text',
    },
    {
      title: '试用类型',
      dataIndex: 'trialType',
      valueType: 'text',
    },
    {
      title: '部门详情',
      dataIndex: 'departmentDetails',
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
      <ProFormItem name="workRecordList" trigger="onValuesChange">
        <EditableProTable<WorkRecordForm>
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

export default WorkRecordList;
