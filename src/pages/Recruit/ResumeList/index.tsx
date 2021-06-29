import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import {Button, Divider, Input, message, Modal} from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {exportResume, getResumeById, getResumePage, printResume} from '@/services/resume/resume';
import type { ResumeForm, ResumeVO } from '@/services/resume/typings';
import { getPageParams, getSortOrder } from "@/utils/common";
import { ExportOutlined, ImportOutlined } from "@ant-design/icons";
import UpdateForm from "@/pages/Recruit/ResumeList/components/UpdateForm";
import ViewForm from "@/pages/Recruit/ResumeList/components/ViewForm";
import { ProFormUploadDragger } from "@ant-design/pro-form";
import {downloadFile} from "@/utils/file";
import JobView from "@/pages/Recruit/ResumeList/components/JobView";

const ResumeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [updateFormValues, setUpdateFormValues] = useState<ResumeVO | ResumeForm>({});
  const [viewDrawerVisible, handleViewDrawerVisible] = useState<boolean>(false);
  const [updateDrawerVisible, handleUpdateDrawerVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<ResumeVO[]>([]);
  const [importModalVisible, setImportModalVisible] = useState<boolean>(false);
  const [jobViewVisible, handleJobViewVisible] = useState<boolean>(false);


  const columns: ProColumns<ResumeVO>[] = [
    {
      title: '关键字',
      key: 'keyword',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      dataIndex: 'keyword',
      renderFormItem: () => {
        return <Input placeholder="请输入关键字" />;
      },
    },
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
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
      title: '性别',
      dataIndex: 'sex',
      valueType: 'text',
      valueEnum: {
        0: { text: '男' },
        1: { text: '女' },
      },
    },
    {
      title: '身份证号码',
      dataIndex: 'idNumber',
      valueType: 'text',
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
      sorter: true,
      defaultSortOrder: 'descend',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'lastModifiedDate',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (text, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getResumeById(record.id);
                setUpdateFormValues(data || {});
                handleViewDrawerVisible(true);
              } else {
                message.warn('没有选中有效的员工');
              }
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getResumeById(record.id);
                setUpdateFormValues(data || {});
                handleUpdateDrawerVisible(true);
              } else {
                message.warn('没有选中有效的员工');
              }
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<ResumeVO>
        headerTitle="员工"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => setImportModalVisible(true)}>
            <ImportOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              console.log(fieldsValue);
              exportResume({
                ...fieldsValue
              }).then(data => {
                downloadFile(data, `简历-${new Date().getTime()}.xlsx`)
              })
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              console.log(fieldsValue);
              // handleJobViewVisible(true)
              printResume(2345234523411).then(data => {
                downloadFile(data, `员工-${new Date().getTime()}.docx`)
              })

            }}
          >
            <ExportOutlined /> 打印
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getResumePage(getPageParams(params), getSortOrder(sorter));
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data: data ? data.records : [],
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data ? data.total : 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          {/* <Button onClick={handleDeleteResume}>批量删除</Button> */}
        </FooterToolbar>
      )}

      <ViewForm
        viewDrawerVisible={viewDrawerVisible}
        handleViewDrawerVisible={handleViewDrawerVisible}
        values={updateFormValues}
        onCancel={() => setUpdateFormValues({})}
      />
      <UpdateForm
        updateDrawerVisible={updateDrawerVisible}
        handleUpdateDrawerVisible={handleUpdateDrawerVisible}
        values={updateFormValues}
        onCancel={() => setUpdateFormValues({})}
        tableActionRef={actionRef}
      />
      <JobView
        jobViewVisible={jobViewVisible}
        handleJobViewVisible={handleJobViewVisible}
        resumeId={1}
      />

      <Modal
        title="导入"
        visible={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        footer={null}
      >
        <div style={{
          textAlign: "right",
          marginBottom: 15
        }}>
          <a href="#" onClick={() => {
            console.log('dd')
          }}>
            点击下载
          </a>
          导入模板
          </div>
        <ProFormUploadDragger
          description="导入员工"
          fieldProps={{
            maxCount: 1
          }}
        />
      </Modal>

    </PageContainer>
  );
};

export default ResumeList;
