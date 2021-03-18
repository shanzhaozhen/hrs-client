import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { batchDeleteDepartment, getDepartmentByDepartmentId, getDepartmentTree } from '@/services/department/department';
import type { DepartmentVO } from '@/services/department/typings';
import type { DepartmentForm } from '@/services/department/typings';

/**
 *  删除部门
 * @param selectedRows
 */
const handleDelete = async (selectedRows: DepartmentVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await batchDeleteDepartment(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const DepartmentList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [userDepartmentListVisible, handleUserDepartmentListVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<DepartmentVO>();
  const [selectedRowsState, setSelectedRows] = useState<DepartmentVO[]>([]);

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
                const data = await getDepartmentByDepartmentId(record.id);
                setUpdateFormValues(data as DepartmentForm);
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
          const data = await getDepartmentTree();
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data.length,
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
      {/* {updateFormValues && Object.keys(updateFormValues).length ? (
        <UserDepartmentList
          userDepartmentListVisible={userDepartmentListVisible}
          handleUserDepartmentListVisible={handleUserDepartmentListVisible}
          onCancel={() => {
            setUpdateFormValues({});
            handleUserDepartmentListVisible(false);
          }}
          tableActionRef={actionRef}
          values={updateFormValues}
        />
      ) : null} */}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<DepartmentVO>
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

export default DepartmentList;
