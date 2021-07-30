import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { QualificationForm, QualificationVO } from '@/services/qualification/typings';
import type { FormInstance } from 'antd';
import CustomUpload from '@/components/CustomUpload';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';

interface QualificationListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (QualificationVO | QualificationForm)[];
}

const QualificationList: React.FC<QualificationListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : [],
  );

  const columns: ProColumns<QualificationForm>[] = [
    {
      title: '职业资格',
      dataIndex: 'qualification',
      valueType: 'text',
    },
    {
      title: '职业',
      dataIndex: 'profession',
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
      title: '资格等级',
      dataIndex: 'level',
      valueType: 'text',
    },
    {
      title: '工种',
      dataIndex: 'workType',
      valueType: 'text',
    },
    {
      title: '证书编号',
      dataIndex: 'number',
      valueType: 'text',
    },
    {
      title: '获得日期',
      dataIndex: 'obtainDate',
      valueType: 'date',
    },
    {
      title: '评定机构',
      dataIndex: 'issueCompany',
      valueType: 'date',
    },
    {
      title: '是否最高',
      dataIndex: 'highest',
      valueType: 'text',
    },
    {
      title: '证件附件',
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
      hideInTable: readonly,
    },
  ];

  return (
    <>
      <ProFormItem name="qualificationList" trigger="onValuesChange">
        <EditableProTable<QualificationForm>
          dataSource={value}
          rowKey="id"
          toolBarRender={false}
          columns={columns}
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

export default QualificationList;
