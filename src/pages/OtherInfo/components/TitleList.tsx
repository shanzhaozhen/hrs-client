import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { TitleForm, TitleVO } from '@/services/title/typings';
import type { FormInstance } from 'antd';
import CustomUpload from '@/components/CustomUpload';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';

interface TitleListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (TitleVO | TitleForm)[];
}

const TitleList: React.FC<TitleListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : [],
  );

  const columns: ProColumns<TitleForm>[] = [
    {
      title: '职称',
      dataIndex: 'title',
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
      title: '职称等级',
      dataIndex: 'level',
      valueType: 'text',
    },
    {
      title: '证书编号',
      dataIndex: 'number',
      valueType: 'text',
    },
    {
      title: '评定日期',
      dataIndex: 'evaluationDate',
      valueType: 'date',
    },
    {
      title: '终止日期',
      dataIndex: 'endDate',
      valueType: 'date',
    },
    {
      title: '评定机构',
      dataIndex: 'issueCompany',
      valueType: 'text',
    },
    {
      title: '是否最高',
      dataIndex: 'highest',
      valueType: 'text',
    },
    {
      title: '附件',
      dataIndex: 'fileId',
      valueType: 'text',
      renderFormItem: (_, { recordKey }) => {
        return <CustomUpload type={'ProFormUploadButton'} value={recordKey} />;
      },
      render: (_, { fileId }) => {
        return <CustomUpload type={'ProFormUploadButton'} value={fileId} readonly={true} />;
      },
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
      <ProFormItem name="titleList" trigger="onValuesChange">
        <EditableProTable<TitleForm>
          dataSource={value}
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          scroll={{ x: 1800 }}
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

export default TitleList;
