import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { ContractForm, ContractVO } from '@/services/contract/typings';
import type { FormInstance } from 'antd';
import CustomUpload from '@/components/CustomUpload';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';

interface ContractListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (ContractVO | ContractForm)[];
}

const ContractList: React.FC<ContractListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : [],
  );

  const columns: ProColumns<ContractForm>[] = [
    {
      title: '合同名称',
      dataIndex: 'name',
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
      title: '合同编号',
      dataIndex: 'number',
      valueType: 'text',
    },
    {
      title: '业务类型',
      dataIndex: 'type',
      valueType: 'text',
    },
    {
      title: '业务发生日期',
      dataIndex: 'occurrenceDate',
      valueType: 'date',
    },
    {
      title: '合同期限类型',
      dataIndex: 'periodType',
      valueType: 'text',
    },
    {
      title: '合同期限',
      dataIndex: 'period',
      valueType: 'digit',
    },
    {
      title: '合同期限单位',
      dataIndex: 'periodUnit',
      valueType: 'text',
    },
    {
      title: '合同开始日期',
      dataIndex: 'startDate',
      valueType: 'date',
    },
    {
      title: '合同结束日期',
      dataIndex: 'endDate',
      valueType: 'date',
    },
    {
      title: '是否需要试用',
      dataIndex: 'hasProbation',
      valueType: 'text',
    },
    {
      title: '试用期限',
      dataIndex: 'probationTerm',
      valueType: 'digit',
    },
    {
      title: '试用期限单位',
      dataIndex: 'probationTermUnit',
      valueType: 'text',
    },
    {
      title: '试用开始日期',
      dataIndex: 'probationStartDate',
      valueType: 'date',
    },
    {
      title: '试用结束日期',
      dataIndex: 'probationEndDate',
      valueType: 'date',
    },
    {
      title: '合同主体单位',
      dataIndex: 'company',
      valueType: 'text',
    },
    {
      title: '业务发生组织',
      dataIndex: 'organization',
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
      width: 80,
      align: 'center',
      fixed: 'right',
      hideInTable: readonly,
    },
  ];

  return (
    <>
      <ProFormItem name="contractList" trigger="onValuesChange">
        <EditableProTable<ContractForm>
          dataSource={value}
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          scroll={{ x: 3000 }}
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

export default ContractList;
