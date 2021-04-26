import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, message, Input, Space, Divider, Popconfirm, Modal} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {batchDeleteMenu, deleteMenu, getMenuById, getMenuTree} from '@/services/menu/menu';
import type { MenuVO } from '@/services/menu/typings';
import type { MenuForm } from '@/services/menu/typings';
import * as iconMap from '@ant-design/icons';

const MenuList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState<MenuForm>({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<MenuVO[]>([]);

  /**
   *  删除菜单
   */
  const handleDelete = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined/>,
      content: '确定批量删除勾选中的菜单吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteMenu(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<MenuVO>[] = [
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
      title: '菜单名称',
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
      title: '菜单名称（本地化）',
      dataIndex: 'locale',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      render: (_, record) => (
        <Space>{record.icon && React.createElement(iconMap[record.icon])}</Space>
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
      title: '菜单是否隐藏',
      dataIndex: 'hideInMenu',
      align: 'center',
      hideInSearch: true,
      render: (_, record) => <Space>{record.hideInMenu ? '是' : '否'}</Space>,
    },
    {
      title: '隐藏子节点',
      dataIndex: 'hideChildrenInMenu',
      align: 'center',
      hideInSearch: true,
      render: (_, record) => <Space>{record.hideChildrenInMenu ? '是' : '否'}</Space>,
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
                const { data } = await getMenuById(record.id);
                setUpdateFormValues(data || {});
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到菜单信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的菜单');
              }
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该菜单节点?"
            onConfirm={async () => {
              if (record && record.id) {
                if (record.children && record.children.length > 0) {
                  message.warn('该菜单节点存在子节点，删除已被拒绝');
                  return;
                }
                await deleteMenu(record.id);
                message.success('删除成功！');
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的菜单');
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
      <ProTable<MenuVO>
        headerTitle="菜单管理"
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
          const { data } = await getMenuTree();
          if (data) {
            return {
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              data,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: data.length,
            };
          }
          return {
            success: true,
            data: [],
            total: 0
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

    </PageContainer>
  );
};

export default MenuList;
