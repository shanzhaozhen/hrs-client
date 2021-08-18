import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { FamilyForm, FamilyVO } from '@/services/family/typings';
import type { FormInstance } from 'antd';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';
import { useOptions } from '@/utils/options';

interface FamilyListProps {
  readonly?: boolean;
  editForm?: FormInstance;
  value?: (FamilyVO | FamilyForm)[];
}

const FamilyList: React.FC<FamilyListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const relationOptions = useOptions('Relation');
  const politicsOptions = useOptions('Politics');

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : [],
  );

  const columns: ProColumns<FamilyForm>[] = [
    {
      title: '姓名',
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
      title: '关系',
      dataIndex: 'relation',
      valueType: 'select',
      fixed: 'left',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      fieldProps: { options: relationOptions },
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
      fieldProps: { options: politicsOptions },
    },
    {
      title: '工作单位',
      dataIndex: 'workCompany',
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
      title: '是否紧急联系人',
      dataIndex: 'isEmergency',
      valueType: 'text',
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
      <ProFormItem name="familyList" trigger="onValuesChange">
        <EditableProTable<FamilyForm>
          dataSource={value}
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          scroll={{ x: 1500 }}
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

export default FamilyList;
