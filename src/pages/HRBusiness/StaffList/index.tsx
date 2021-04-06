import React, {useRef, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Input, message } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { getStaffById, getStaffPage } from '@/services/staff/staff';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import {getPageParams, getSortOrder} from "@/utils/common";

const StaffList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<StaffVO>();
  const [selectedRowsState, setSelectedRows] = useState<StaffVO[]>([]);

  // /**
  //  * 批量删除简历
  //  */
  // const handleDeleteStaff = () => {
  //   Modal.confirm({
  //     title: '确认',
  //     icon: <ExclamationCircleOutlined />,
  //     content: '确定批量删除勾选中的简历吗',
  //     okText: '确认',
  //     cancelText: '取消',
  //     onOk: async () => {
  //       const hide = message.loading('正在删除');
  //       if (!selectedRowsState) return true;
  //       try {
  //         await batchDeleteStaff(selectedRowsState.map((selectedRow) => selectedRow.id));
  //         hide();
  //         message.success('删除成功，即将刷新');
  //         actionRef.current?.reloadAndRest?.();
  //         return true;
  //       } catch (error) {
  //         hide();
  //         message.error('删除失败，请重试');
  //         return false;
  //       }
  //     },
  //   });
  // };

  const columns: ProColumns<StaffVO>[] = [
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
      title: '部门',
      dataIndex: 'depId',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '员工编号',
      dataIndex: 'staffCode',
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
      title: '姓名',
      dataIndex: 'staffCode',
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
      title: '性别',
      dataIndex: 'sex',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '职务',
      dataIndex: 'duty',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '岗位',
      dataIndex: 'post',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '入职日期',
      dataIndex: 'entryDate',
      valueType: 'date',
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
                // const data = await getStaffById(record.id);
                // setUpdateFormValues(data as StaffForm);
                // handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到简历信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的简历');
              }
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                // const data = await getStaffById(record.id);
                // setUpdateFormValues(data as StaffForm);
                // handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到简历信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的简历');
              }
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<StaffVO>
        headerTitle="简历"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
          //   <PlusOutlined /> 新建
          // </Button>,
        ]}
        request={async (params, sorter) => {
          const data = await getStaffPage(getPageParams(params), getSortOrder(sorter));
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
          {/* <Button onClick={handleDeleteStaff}>批量删除</Button> */}
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.staffName && (
          <ProDescriptions<StaffVO>
            column={2}
            title={row?.staffName}
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

export default StaffList;