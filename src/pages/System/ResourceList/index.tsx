import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Tag, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  deleteResources,
  getResourceByResourceId,
  getAllResourceTree,
} from '@/services/resource/resource';
import type { ResourceVO } from '@/services/resource/typings';
import type { ResourceForm } from '@/services/resource/typings';

/**
 *  删除资源
 * @param selectedRows
 */
const handleDelete = async (selectedRows: ResourceVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteResources(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<ResourceVO>();
  const [selectedRowsState, setSelectedRows] = useState<ResourceVO[]>([]);

  const columns: ProColumns<ResourceVO>[] = [
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
      title: '资源路由',
      dataIndex: 'path',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
      align: 'center',
      valueEnum: {
        0: { text: '分类' },
        1: { text: 'API' },
      },
      render: (_, record) => (
        <Space>
          {record.type === 0 ? <Tag color="blue">分类</Tag> : <Tag color="green">API</Tag>}
        </Space>
      ),
    },
    {
      title: '排序等级',
      dataIndex: 'priority',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
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
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                const data = await getResourceByResourceId(record.id);
                setUpdateFormValues(data as ResourceForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到资源信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的资源');
              }
            }}
          >
            修改
          </a>
          {/* <Divider type="vertical" /> */}
          {/* <a href="">订阅警报</a> */}
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ResourceVO>
        headerTitle="资源管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        // options={{
        //   search: true,
        // }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sorter) => {
          const data = await getAllResourceTree(params, sorter);
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data: data || [],
            // 不传会使用 data 的长度，如果是分页一定要传
            total: (data && data.length) || 0,
          };
          // return {
          //   success: false,
          //   data: [],
          //   total: 0,
          // };
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
          <Button
            onClick={async () => {
              await handleDelete(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
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
          <ProDescriptions<ResourceVO>
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

export default TableList;
