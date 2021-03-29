import React, {useRef, useState} from 'react';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, Input, message, Modal, Space, Tag} from 'antd';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { batchDeleteTask, deleteTask, getTaskByTaskId, getTaskPage, runTask, startTask, stopTask } from '@/services/task/task';
import type { TaskForm, TaskVO } from '@/services/task/typings';
import {getPageParams, getSortOrder} from "@/utils/common";

const TaskList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({} as TaskVO);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TaskVO>();
  const [selectedRowsState, setSelectedRows] = useState<TaskVO[]>([]);

  /**
   * 批量删除任务
   */
  const handleDeleteTask = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的用户吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteTask(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<TaskVO>[] = [
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
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
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
      title: 'cron表达式',
      dataIndex: 'cron',
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
                  await stopTask(record.id);
                  hide();
                  message.success('任务停止成功！')
                } else {
                  await startTask(record.id);
                  hide();
                  message.success('任务开启成功！')
                }
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的任务');
              }
            }}
          >
            { record.open ? '停止' : '开启' }
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                const data = await getTaskByTaskId(record.id);
                setUpdateFormValues(data as TaskForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到任务信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的任务');
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
                  const data = await runTask(record.id)
                  hide();
                  message.success('任务执行成功！返回结果已打印在控制台上。')
                  // eslint-disable-next-line no-console
                  console.log(data)
                } else {
                  message.warn('没有选中有效的任务');
                }
              } else if (key === 'delete') {
                Modal.confirm({
                  title: '确认',
                  icon: <ExclamationCircleOutlined />,
                  content: '确定该任务？',
                  okText: '确认',
                  cancelText: '取消',
                  onOk: async () => {
                    const hide = message.loading('正在删除');
                    try {
                      if (record && record.id) {
                        await deleteTask(record.id);
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
      <ProTable<TaskVO>
        headerTitle="定时任务"
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
          const data = await getTaskPage(getPageParams(params), getSortOrder(sorter));
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data: data.records,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data.total,
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
          <Button onClick={handleDeleteTask}>批量删除</Button>
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

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TaskVO>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TaskList;
