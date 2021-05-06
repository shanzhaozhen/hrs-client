import React, {useState} from 'react';
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";
import type { CertificateForm, CertificateVO } from "@/services/certificate/typings";
import ProForm from "@ant-design/pro-form";
import { getDictionaryChildrenByCode } from "@/services/dictionary/dictionary";
import type { FormInstance } from "antd";
import CustomUpload from "@/components/CustomUpload";

interface CertificateListProps {
  readonly?: boolean;
  editForm: FormInstance;
  value?: (CertificateVO | CertificateForm)[];
}

const CertificateList: React.FC<CertificateListProps> = (props) => {
  const { readonly, editForm, value } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    !readonly && value ? value.map((item) => item.id) : []
  );

  const columns: ProColumns<CertificateForm>[] = [
    {
      title: '证件名称',
      dataIndex: 'name',
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
      title: '证件类型',
      dataIndex: 'type',
      valueType: 'select',
      request: async ({ keyWords }) => {
        const { data } = await getDictionaryChildrenByCode('CertificateType', keyWords);
        return data ? data.map(item => ({
          value: item.name,
          label: item.name
        })) : []
      }
    },
    {
      title: '证件号',
      dataIndex: 'number',
      valueType: 'text',
    },
    {
      title: '取证日期',
      dataIndex: 'obtainDate',
      valueType: 'date',
    },
    {
      title: '发证单位',
      dataIndex: 'issueUnit',
      valueType: 'text',
    },
    {
      title: '证件附件',
      dataIndex: 'files',
      valueType: 'text',
      renderFormItem: () => {
        return (
          <CustomUpload
            type="ProFormUploadButton"
            listType="picture"
            readonly={readonly}
            maxCount={1}
            description="仅能保存单文件"
          />
        )
      }
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
        label="证书"
        name="certificateList"
        trigger="onValuesChange"
      >
        <EditableProTable<CertificateForm>
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

export default CertificateList;