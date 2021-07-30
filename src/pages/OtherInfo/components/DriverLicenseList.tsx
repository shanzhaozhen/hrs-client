import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { DriverLicenseForm, DriverLicenseVO } from '@/services/driver-license/typings';
import type { FormInstance } from 'antd';
import CustomUpload from '@/components/CustomUpload';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';

interface DriverLicenseListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (DriverLicenseVO | DriverLicenseForm)[];
}

const DriverLicenseList: React.FC<DriverLicenseListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : [],
  );

  const columns: ProColumns<DriverLicenseForm>[] = [
    {
      title: '准驾车型',
      dataIndex: 'modal',
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
      title: '证件号码',
      dataIndex: 'number',
      valueType: 'text',
    },
    {
      title: '获得日期',
      dataIndex: 'obtainDate',
      valueType: 'date',
    },
    {
      title: '有效期至',
      dataIndex: 'expirationDate',
      valueType: 'date',
    },
    {
      title: '内部驾照',
      dataIndex: 'inside',
      valueType: 'text',
    },
    {
      title: '内部驾照有效期',
      dataIndex: 'insideExpirationDate',
      valueType: 'date',
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
      <ProFormItem name="driverLicenseList" trigger="onValuesChange">
        <EditableProTable<DriverLicenseForm>
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

export default DriverLicenseList;
