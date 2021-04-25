import React, {useRef, useState} from 'react';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Input, message, Modal, Space, Tag} from 'antd';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { batchDeleteTransferRecord, deleteTransferRecord, getTransferRecordById, getTransferRecordPage, runTransferRecord, startTransferRecord, stopTransferRecord } from '@/services/transfer-record/transfer-record';
import type { TransferRecordForm, TransferRecordVO } from '@/services/transfer-record/typings';
import {getPageParams, getSortOrder} from "@/utils/common";

const TransferRecordList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({} as TransferRecordVO);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TransferRecordVO[]>([]);

  /**
   * 批量删除调动记录
   */
  const handleDeleteTransferRecord = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的调动记录吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteTransferRecord(selectedRowsState.map((selectedRow) => selectedRow.id));
          hide();
          message.success('删除成功，即将刷新');
          actionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error('删除失败，请重试');
          return false;
        }
      },
    });
  };

  const columns: ProColumns<TransferRecordVO>[] = [
    {
      title: '关键字',
      key: 'keyword',
      hideInTable: true,
      hideInForm: true,
      dataIndex: 'keyword',
      renderFormItem: () => {
        return <Input placeholder="请输入关键字" />;
      },
    },
    {
      title: '员工编号',
      dataIndex: 'staffCode',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '变更前部门',
      dataIndex: 'preDepId',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '变更后部门',
      dataIndex: 'postDepId',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '开启状态',
      dataIndex: 'open',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Tag color={record.open ? "green" : "red"}>
            {record.open ? '开启' : '停止'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
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
                const hide = message.loading('正在执行');
                if (record.open) {
                  await stopTransferRecord(record.id);
                  hide();
                  message.success('调动记录停止成功！')
                } else {
                  await startTransferRecord(record.id);
                  hide();
                  message.success('调动记录开启成功！')
                }
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的调动记录');
              }
            }}
          >
            { record.open ? '停止' : '开启' }
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getTransferRecordById(record.id);
                setUpdateFormValues(data as TransferRecordForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到调动记录信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的调动记录');
              }
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <TableDropdown
            key="actionGroup"
            onSelect={async (key) => {
              if (key === 'run') {
                if (record && record.id) {
                  const hide = message.loading('正在执行');
                  const { data } = await runTransferRecord(record.id)
                  hide();
                  message.success('调动记录执行成功！返回结果已打印在控制台上。')
                  // eslint-disable-next-line no-console
                  console.log(data)
                } else {
                  message.warn('没有选中有效的调动记录');
                }
              } else if (key === 'delete') {
                Modal.confirm({
                  title: '确认',
                  icon: <ExclamationCircleOutlined />,
                  content: '确定该调动记录？',
                  okText: '确认',
                  cancelText: '取消',
                  onOk: async () => {
                    const hide = message.loading('正在删除');
                    try {
                      if (record && record.id) {
                        await deleteTransferRecord(record.id);
                        hide();
                        message.success('删除成功！');
                        actionRef.current?.reloadAndRest?.();
                        return true;
                      }
                      message.warn('没有选中有效的用户');
                      return false;
                    } catch (error) {
                      hide();
                      message.error('删除失败，请重试');
                      return false;
                    }
                  },
                });
              }
            }}
            menus={[
              { key: 'run', name: '执行' },
              { key: 'delete', name: '删除' },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TransferRecordVO>
        headerTitle="定时调动记录"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getTransferRecordPage(getPageParams(params), getSortOrder(sorter));
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
          <Button onClick={handleDeleteTransferRecord}>批量删除</Button>
        </FooterToolbar>
      )}
      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        tableActionRef={actionRef}
      />
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          updateModalVisible={updateModalVisible}
          handleUpdateModalVisible={handleUpdateModalVisible}
          values={updateFormValues}
          onCancel={() => setUpdateFormValues({})}
          tableActionRef={actionRef}
        />
      ) : null}

    </PageContainer>
  );
};

export default TransferRecordList;
