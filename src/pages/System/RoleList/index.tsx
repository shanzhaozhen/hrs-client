import React, {useRef, useState} from 'react';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, Input, message, Modal, Popconfirm} from 'antd';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {batchDeleteRole, deleteRole, getRoleById, getRolePage} from '@/services/role/role';
import type {RoleForm, RoleVO} from '@/services/role/typings';
import UserRelateList from '@/pages/System/UserRelateList';
import {getPageParams, getSortOrder} from "@/utils/common";
import {addUserRole, deleteUserRoles} from "@/services/user-role/user-role";
import type {UserVO} from "@/services/user/typings";
import type { SortOrder } from "antd/lib/table/interface";
import type { PageParams } from '@/services/common/typings';
import { getUserPageByRoleId } from '@/services/user/user';


const RoleList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [userRelateListVisible, handleUserRelateListVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({} as RoleVO);
  const actionRef = useRef<ActionType>();
  const userRoleActionRef = useRef<ActionType>();
  const [row, setRow] = useState<RoleVO>();
  const [selectedRowsState, setSelectedRows] = useState<RoleVO[]>([]);

  /**
   * 批量删除角色
   */
  const handleDeleteRole = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的角色吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteRole(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  /**
   * 批量添加用户角色关联
   * @param selectedUserRoleRows
   */
  const handleBatchAddUserRole = async (selectedUserRoleRows: UserVO[]) => {
    const hide = message.loading('正在添加');
    if (!selectedUserRoleRows) return true;
    try {
      const userIds = selectedUserRoleRows.map((user) => user.id);
      await addUserRole({
        userIds,
        roleId: updateFormValues.id,
      });
      hide();
      message.success('添加成功');
      userRoleActionRef.current?.reloadAndRest?.();
      return true;
    } catch (error) {
      hide();
      message.error('添加失败，请重试');
      return false;
    }
  }

  /**
   * 取消用户角色关联
   * @param record
   */
  const handleDeleteUserRole = async (record: UserVO) => {
    if (record && record.id) {
      await deleteUserRoles({
        userIds: [record.id],
        roleId: updateFormValues.id
      });
      message.success('取消关联成功！');
      userRoleActionRef.current?.reloadAndRest?.();
    } else {
      message.warn('没有选中有效的角色');
    }
  }

  /**
   * 批量取消用户角色关联
   * @param selectedUserRoleRows
   */
  const handleBatchDeleteUserRole = (selectedUserRoleRows: UserVO[]) => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined/>,
      content: '确定批量取消勾选中的用户与角色的关联关系吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在取消关联成功');
        if (!selectedUserRoleRows) return true;
        try {
          await deleteUserRoles({
            userIds: selectedUserRoleRows.map((selectedRow) => selectedRow.id) || [],
            roleId: updateFormValues.id
          });
          hide();
          message.success('取消关联成功，即将刷新');
          userRoleActionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error('取消关联失败，请重试');
          return false;
        }
      },
    });
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
                const data = await getRoleById(record.id);
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
          const data = await getRolePage(getPageParams(params), getSortOrder(sorter));
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
          handleBatchAddUserRelate={handleBatchAddUserRole}
          handleDeleteUserRelate={handleDeleteUserRole}
          handleBatchDeleteUserRelate={handleBatchDeleteUserRole}
          queryList={async (params: PageParams, sorter: Record<string, SortOrder>) => (await getUserPageByRoleId(getPageParams(params), updateFormValues.id, getSortOrder(sorter)))}
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
        {row?.id && (
          <ProDescriptions<RoleVO>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default RoleList;
