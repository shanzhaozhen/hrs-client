import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, message, Input, Divider, Modal, Popconfirm} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { batchDeleteDepartment, deleteDepartment, getDepartmentById, getDepartmentTree } from '@/services/department/department';
import type { DepartmentVO } from '@/services/department/typings';
import type { DepartmentForm } from '@/services/department/typings';
import type { UserVO } from "@/services/user/typings";
import UserRelateList from "@/pages/System/UserRelateList";
import type { PageParams } from "@/services/common/typings";
import type { SortOrder } from "antd/lib/table/interface";
import { getPageParams, getSortOrder } from "@/utils/common";
import {batchUpdateUserDepartment, getUserPageByDepartmentId} from "@/services/user/user";

const DepartmentList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [updateFormValues, setUpdateFormValues] = useState<DepartmentVO | DepartmentForm>({});
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [userDepartmentListVisible, handleUserDepartmentListVisible] = useState<boolean>(false);
  const userDepartmentActionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<DepartmentVO[]>([]);

  /**
   *  删除部门
   */
  const handleDelete = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined/>,
      content: '确定批量删除勾选中的部门吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteDepartment(selectedRowsState.map((selectedRow) => selectedRow.id));
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
   * 批量添加用户部门关联
   * @param selectedUserRoleRows
   */
  const handleBatchAddUserDepartment = async (selectedUserRoleRows: UserVO[]) => {
    const hide = message.loading('正在添加');
    if (!selectedUserRoleRows) return true;
    try {
      const userIds = selectedUserRoleRows.map((user) => user.id);
      await batchUpdateUserDepartment({
        userIds,
        departmentId: updateFormValues.id,
      });
      hide();
      message.success('添加成功');
      userDepartmentActionRef.current?.reloadAndRest?.();
      return true;
    } catch (error) {
      hide();
      message.error('添加失败，请重试');
      return false;
    }
  }

  /**
   * 取消用户部门关联
   * @param record
   */
  const handleDeleteUserDepartment = async (record: UserVO) => {
    if (record && record.id) {
      await batchUpdateUserDepartment({
        userIds: [record.id],
        departmentId: undefined
      });
      message.success('取消关联成功！');
      userDepartmentActionRef.current?.reloadAndRest?.();
    } else {
      message.warn('没有选中有效的部门');
    }
  }

  /**
   * 批量取消用户部门关联
   * @param selectedUserDepartmentRows
   */
  const handleBatchDeleteUserDepartment = (selectedUserDepartmentRows: UserVO[]) => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined/>,
      content: '确定批量取消勾选中的用户与部门的关联关系吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在取消关联成功');
        if (!selectedUserDepartmentRows) return true;
        try {
          await batchUpdateUserDepartment({
            userIds: selectedUserDepartmentRows.map((selectedRow) => selectedRow.id) || [],
            departmentId: undefined
          });
          hide();
          message.success('取消关联成功，即将刷新');
          userDepartmentActionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error('取消关联失败，请重试');
          return false;
        }
      },
    });
  };

  const columns: ProColumns<DepartmentVO>[] = [
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
      title: '部门编号',
      dataIndex: 'code',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
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
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getDepartmentById(record.id);
                setUpdateFormValues(data || {});
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到部门信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的部门');
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
                handleUserDepartmentListVisible(true);
                // message.error(res.message || `没有获取到部门信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的部门');
              }
            }}
          >
            分配部门
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该部门?"
            onConfirm={async () => {
              if (record && record.id) {
                await deleteDepartment(record.id);
                message.success('删除成功！');
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的部门');
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
      <ProTable<DepartmentVO>
        headerTitle="部门管理"
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
        request={async () => {
          const { data } = await getDepartmentTree();
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data: data || [],
            // 不传会使用 data 的长度，如果是分页一定要传
            total: (data && data.length) || 0,
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
          <Button onClick={handleDelete}>批量删除</Button>
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
          userRelateListVisible={userDepartmentListVisible}
          handleUserRelateListVisible={handleUserDepartmentListVisible}
          userRelateActionRef={userDepartmentActionRef}
          onCancel={() => {
            setUpdateFormValues({});
            handleUserDepartmentListVisible(false);
          }}
          handleBatchAddUserRelate={handleBatchAddUserDepartment}
          handleDeleteUserRelate={handleDeleteUserDepartment}
          handleBatchDeleteUserRelate={handleBatchDeleteUserDepartment}
          queryList={async (params: PageParams, sorter: Record<string, SortOrder>) => (await getUserPageByDepartmentId(getPageParams(params), updateFormValues.id, getSortOrder(sorter)))}
          values={updateFormValues}
        />
      ) : null}

    </PageContainer>
  );
};

export default DepartmentList;
