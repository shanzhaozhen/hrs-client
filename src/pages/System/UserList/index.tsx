import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { deleteUser, queryUserList } from '@/services/user/user';
import type { UserVO } from '@/services/user/typings';

/**
 *  删除用户
 * @param selectedRows
 */
const handleDelete = async (selectedRows: UserVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser(selectedRows.map((row) => row.id));
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
  const [row, setRow] = useState<UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<UserVO[]>([]);
  const columns: ProColumns<UserVO>[] = [
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
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
      sorter: true,
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
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        0: { text: '男' },
        1: { text: '女' },
      },
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'roleIds',
      valueType: 'text',
      hideInSearch: true,
      // hideInTable: true,
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
            onClick={() => {
              handleUpdateModalVisible(true);

              setUpdateFormValues(record);
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
      <ProTable<UserVO>
        headerTitle="用户管理"
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
          const res = await queryUserList(params, sorter);

          if (res.code === 0 && res.data) {
            return {
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              data: res.data.records,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: res.data.total,
            };
          }
          return {
            success: false,
            data: [],
            total: 0,
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
        onCancel={() => handleCreateModalVisible(false)}
        createModalVisible={createModalVisible}
      />
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={() => {
            return updateFormValues;
          }}
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
          <ProDescriptions<UserVO>
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
