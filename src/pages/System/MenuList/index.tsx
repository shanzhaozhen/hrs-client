import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { deleteMenu, getMenuByMenuId, getAllMenuTree } from '@/services/menu/menu';
import type { MenuVO } from '@/services/menu/typings';
import type { MenuForm } from '@/services/menu/typings';

/**
 *  删除菜单
 * @param selectedRows
 */
const handleDelete = async (selectedRows: MenuVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteMenu(selectedRows.map((row) => row.id));
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
  const [row, setRow] = useState<MenuVO>();
  const [selectedRowsState, setSelectedRows] = useState<MenuVO[]>([]);

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
    // {
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: 48,
    // },
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
      hideInSearch: true,
    },
    {
      title: '排序等级',
      dataIndex: 'priority',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '菜单是否隐藏',
      dataIndex: 'hideInMenu',
      hideInSearch: true,
      render: (_, record) => <Space>{record.hideInMenu ? '是' : '否'}</Space>,
    },
    {
      title: '隐藏子节点',
      dataIndex: 'hideChildrenInMenu',
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
                const data = await getMenuByMenuId(record.id);
                setUpdateFormValues(data as MenuForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到菜单信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的菜单');
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
      <ProTable<MenuVO>
        headerTitle="菜单管理"
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
        request={async (params) => {
          const data = await getAllMenuTree(params);
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data.length,
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
          <ProDescriptions<MenuVO>
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
