import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, message, Input, Drawer, Divider, Popconfirm, Modal} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { batchDeleteRole, deleteRole, getRoleByRoleId, getRolePage } from '@/services/role/role';
import type { RoleVO } from '@/services/role/typings';
import type { RoleForm } from '@/services/role/typings';
import UserRelateList from '@/pages/System/UserRelateList';
import { getSortOrder } from "@/utils/common";
import { deleteUserRoles } from "@/services/user-role/user-role";
import type { UserVO } from "@/services/user/typings";

const RoleList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [userRelateListVisible, handleUserRelateListVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({} as RoleVO);
  const actionRef = useRef<ActionType>();
  const userRoleActionRef = useRef<ActionType>();
  const [row, setRow] = useState<RoleVO>();
  const [selectedRowsState, setSelectedRows] = useState<RoleVO[]>([]);
  const [selectedUserRoleRows, setSelectedUserRoleRows] = useState<UserVO[]>([]);


  /**
   * 批量删除角色
   */
  const handleDeleteRole = () => {
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
          await batchDeleteRole(selectedRowsState.map((selectedRow) => selectedRow.id));
          hide();
          message.success('删除成功，即将刷新');
          setSelectedRows([]);
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

  /**
   * 取消用户角色关联
   * @param record
   */
  const handleDeleteRoleUser = async (record: UserVO) => {
    if (record && record.id) {
      await deleteUserRoles({
        userIds: [record.id],
        roleId: updateFormValues.id
      });
      message.success('删除成功！');
      userRoleActionRef.current?.reloadAndRest?.();
    } else {
      message.warn('没有选中有效的角色');
    }
  }

  /**
   * 批量取消用户角色关联
   * @param selectedRows
   */
  const handleBatchDeleteRoleUser = (selectedRows: UserVO[]): Promise<boolean | void> => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '确认',
        icon: <ExclamationCircleOutlined/>,
        content: '确定批量删除勾选中的用户吗',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const hide = message.loading('正在删除');
          if (!selectedRows) return true;
          try {
            await deleteUserRoles({
              userIds: selectedRows.map((selectedRow) => selectedRow.id) || [],
              roleId: updateFormValues.id
            });
            hide();
            message.success('删除成功，即将刷新');
            setSelectedRows([]);
            userRoleActionRef.current?.reloadAndRest?.();
            resolve(true);
            return true;
          } catch (error) {
            hide();
            message.error('删除失败，请重试');
            reject(error);
            return false;
          }
        },
      });
    })
  };

  const columns: ProColumns<RoleVO>[] = [
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
      title: '角色代码',
      dataIndex: 'code',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
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
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                const data = await getRoleByRoleId(record.id);
                setUpdateFormValues(data as RoleForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到角色信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的角色');
              }
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                setUpdateFormValues(record);
                handleUserRelateListVisible(true);
                // message.error(res.message || `没有获取到角色信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的角色');
              }
            }}
          >
            分配角色
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该角色节点?"
            onConfirm={async () => {
              if (record && record.id) {
                await deleteRole(record.id);
                message.success('删除成功！');
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的角色');
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<RoleVO>
        headerTitle="角色管理"
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
          const data = await getRolePage(params, getSortOrder(sorter));
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
          <Button onClick={handleDeleteRole}>批量删除</Button>
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
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UserRelateList
          userRelateListVisible={userRelateListVisible}
          handleUserRelateListVisible={handleUserRelateListVisible}
          userRelateActionRef={userRoleActionRef}
          onCancel={() => {
            setUpdateFormValues({});
            handleUserRelateListVisible(false);
          }}
          tableActionRef={actionRef}
          selectedUserRoleRows={selectedUserRoleRows}
          setSelectedUserRoleRows={setSelectedUserRoleRows}
          handleDeleteRoleUser={handleDeleteRoleUser}
          handleBatchDeleteRoleUser={handleBatchDeleteRoleUser}
          values={updateFormValues}
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
          <ProDescriptions<RoleVO>
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

export default RoleList;
