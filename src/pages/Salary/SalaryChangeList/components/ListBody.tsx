import React, { useRef, useState } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Modal, Popconfirm, Tag } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import {
  getSalaryChangePage,
  getSalaryChangeById,
  deleteSalaryChange,
  batchDeleteSalaryChange,
  runChange,
} from '@/services/salary-change/salary-change';
import type { SalaryChangeVO } from '@/services/salary-change/typings';
import { getPageParams, getSortOrder, tableFilter } from '@/utils/common';
import { useDepartmentList, useDepartmentTree } from '@/utils/department';
import FormTreeSelect from '@/components/FormTreeSelect';
import ViewForm from '@/pages/Salary/SalaryChangeList/components/ViewForm';

interface ListBodyProps {
  staffId?: number;
}

const SalaryChangeListBody: React.FC<ListBodyProps> = (props) => {
  const { staffId } = props;

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SalaryChangeVO>({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<SalaryChangeVO[]>([]);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();

  /**
   * 批量删除调薪记录
   */
  const handleDeleteSalaryChange = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的调薪记录吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteSalaryChange(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<SalaryChangeVO>[] = [
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
      title: '部门',
      dataIndex: 'depId',
      valueType: 'text',
      sorter: true,
      renderText: (_, record) => tableFilter(record.depId, departmentList, '未分配'),
      renderFormItem: () => {
        return (
          <FormTreeSelect
            treeData={departmentTree}
            placeholder="请选择部门"
            treeNodeFilterProp="title"
          />
        );
      },
    },
    {
      title: '员工编号',
      dataIndex: 'staffCode',
      valueType: 'text',
      sorter: 's.staffCode',
      hideInSearch: true,
      render: (dom, record) => {
        return (
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getSalaryChangeById(record.id);
                setFormValues(data || {});
                handleViewModalVisible(true);
              } else {
                message.warn('没有选中有效的调薪记录');
              }
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      valueType: 'text',
      sorter: 's.staffName',
      hideInSearch: true,
    },
    {
      title: '基础工资',
      dataIndex: 'preBasicSalary',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      renderText: (_, record) =>
        record.preBasicSalary === record.postBasicSalary
          ? `${record.preBasicSalary}（不变）`
          : ''.concat(
              record.preBasicSalary === undefined ? '（未定）' : record.preBasicSalary.toString(),
              '=>',
              record.postBasicSalary === undefined ? '（未定）' : record.postBasicSalary.toString(),
            ),
    },
    {
      title: '岗位工资',
      dataIndex: 'prePostSalary',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      renderText: (_, record) =>
        record.prePostSalary === record.postPostSalary
          ? `${record.prePostSalary}（不变）`
          : ''.concat(
              record.prePostSalary === undefined ? '（未定）' : record.prePostSalary.toString(),
              '=>',
              record.postPostSalary === undefined ? '（未定）' : record.postPostSalary.toString(),
            ),
    },
    {
      title: '公积金基数',
      dataIndex: 'prePostSalary',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      renderText: (_, record) =>
        record.preAccumulationFund === record.postAccumulationFund
          ? `${record.preAccumulationFund}（不变）`
          : ''.concat(
              record.preAccumulationFund === undefined
                ? '（未定）'
                : record.preAccumulationFund.toString(),
              '=>',
              record.postAccumulationFund === undefined
                ? '（未定）'
                : record.postAccumulationFund.toString(),
            ),
    },
    {
      title: '生效日期',
      dataIndex: 'effectiveDate',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '是否已执行',
      dataIndex: 'executed',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      render: (_, { executed }) =>
        executed ? <Tag color="success">是</Tag> : <Tag color="default">否</Tag>,
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
      render: (text, record) => (
        <>
          <a
            onClick={async () => {
              const runTask = async (salaryChange: SalaryChangeVO) => {
                if (salaryChange && salaryChange.id) {
                  const hide = message.loading('正在执行');
                  await runChange(salaryChange?.id);
                  hide();
                  message.success('调动执行成功！');
                  actionRef.current?.reloadAndRest?.();
                } else {
                  message.warn('没有选中有效的调薪记录');
                }
              };

              Modal.confirm({
                title: '确认',
                icon: <ExclamationCircleOutlined />,
                content: '确定执行该任务？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  if (record.executed) {
                    Modal.confirm({
                      title: '确认',
                      icon: <ExclamationCircleOutlined />,
                      content: '该任务已被执行，是否继续执行？',
                      okText: '确认',
                      cancelText: '取消',
                      onOk: async () => {
                        await runTask(record);
                      },
                    });
                  } else {
                    await runTask(record);
                  }
                },
              });
            }}
          >
            执行
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getSalaryChangeById(record.id);
                setFormValues(data || {});
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到调薪记录信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的调薪记录');
              }
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该调薪记录?"
            onConfirm={async () => {
              if (record && record.id) {
                await deleteSalaryChange(record.id);
                message.success('删除成功！');
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的调薪记录');
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
    <>
      <ProTable<SalaryChangeVO>
        headerTitle="调薪记录"
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
          const { data } = await getSalaryChangePage(
            getPageParams(params),
            staffId,
            getSortOrder(sorter),
          );
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data: data ? data.records : [],
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data ? data.total : 0,
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
          <Button onClick={handleDeleteSalaryChange}>批量删除</Button>
        </FooterToolbar>
      )}

      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        tableActionRef={actionRef}
        staffId={staffId}
      />

      <UpdateForm
        updateModalVisible={updateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
        values={formValues}
        onCancel={() => setFormValues({})}
        tableActionRef={actionRef}
        staffId={staffId}
      />

      <ViewForm
        viewModalVisible={viewModalVisible}
        handleViewModalVisible={handleViewModalVisible}
        values={formValues}
        onCancel={() => setFormValues({})}
        staffId={staffId}
      />
    </>
  );
};

export default SalaryChangeListBody;
