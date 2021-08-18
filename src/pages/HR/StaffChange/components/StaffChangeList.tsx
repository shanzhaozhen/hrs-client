import React, { useRef, useState } from 'react';
import {
  ExclamationCircleOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Divider, Input, message, Modal, Popconfirm, Tag } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import ViewForm from './ViewForm';
import {
  getStaffChangePage,
  getStaffChangeById,
  deleteStaffChange,
  batchDeleteStaffChange,
  runChange,
  generateStaffChangeTemplate,
  exportStaffChange,
} from '@/services/staff-change/staff-change';
import type { StaffChangeVO } from '@/services/staff-change/typings';
import { getPageParams, getSortOrder, tableFilter } from '@/utils/common';
import { useDepartmentList, useDepartmentTree } from '@/utils/department';
import FormTreeSelect from '@/components/FormTreeSelect';
import { downloadFile } from '@/utils/file';
import ImportModal from '@/components/ImportModal';

interface ListBodyProps {
  staffId?: number;
}

const StaffChangeList: React.FC<ListBodyProps> = (props) => {
  const { staffId } = props;

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<StaffChangeVO>({});
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [selectedRowsState, setSelectedRows] = useState<StaffChangeVO[]>([]);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();

  /**
   * 批量删除调动记录
   */
  const handleDeleteStaffChange = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的调动记录吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteStaffChange(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<StaffChangeVO>[] = [
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
      renderText: (_, record) => {
        if (record.preDepId === record.postDepId) {
          return tableFilter(record.preDepId, departmentList, '未分配');
        }
        return ''.concat(
          tableFilter(record.preDepId, departmentList, '未分配'),
          '=>',
          tableFilter(record.postDepId, departmentList, '未分配'),
        );
      },
      renderFormItem: () => {
        return <FormTreeSelect treeData={departmentTree} placeholder="请选择部门" />;
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
                const { data } = await getStaffChangeById(record.id);
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
      title: '职务',
      dataIndex: 'duty',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      renderText: (_, record) =>
        record.preDuty === record.postDuty
          ? `${record.preDuty}（不变）`
          : ''.concat(record.preDuty || '(无)', '=>', record.postDuty || '(无)'),
    },
    {
      title: '岗位',
      dataIndex: 'prePost',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      renderText: (_, record) =>
        record.prePost === record.postPost
          ? `${record.postPost}（不变）`
          : ''.concat(record.prePost || '(无)', '=>', record.postPost || '(无)'),
    },
    {
      title: '岗位类型',
      dataIndex: 'postType',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      renderText: (_, record) =>
        record.prePostType === record.postPostType
          ? `${record.postPostType}（不变）`
          : ''.concat(record.prePostType || '(无)', '=>', record.postPostType || '(无)'),
    },
    {
      title: '岗位等级',
      dataIndex: 'postLevel',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      renderText: (_, record) =>
        record.prePostLevel === record.postPostLevel
          ? `${record.postPostLevel}（不变）`
          : ''.concat(record.prePostLevel || '(无)', '=>', record.postPostLevel || '(无)'),
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
              const runTask = async (staffChangeVO: StaffChangeVO) => {
                if (staffChangeVO && staffChangeVO.id) {
                  const hide = message.loading('正在执行');
                  await runChange(staffChangeVO?.id);
                  hide();
                  message.success('调动执行成功！');
                  actionRef.current?.reloadAndRest?.();
                } else {
                  message.warn('没有选中有效的调动记录');
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
                const { data } = await getStaffChangeById(record.id);
                setFormValues(data || {});
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到调动记录信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的调动记录');
              }
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该调动记录?"
            onConfirm={async () => {
              if (record && record.id) {
                await deleteStaffChange(record.id);
                message.success('删除成功！');
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的调动记录');
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
      <ProTable<StaffChangeVO>
        headerTitle="调动记录"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => handleImportModalVisible(true)}>
            <ImportOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              exportStaffChange({
                ...fieldsValue,
                staffId,
              }).then((data) => {
                downloadFile(data, `调动记录-${new Date().getTime()}.xlsx`);
              });
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getStaffChangePage(
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
          <Button onClick={handleDeleteStaffChange}>批量删除</Button>
        </FooterToolbar>
      )}
      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
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

      <UpdateForm
        updateModalVisible={updateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
        values={formValues}
        onCancel={() => setFormValues({})}
        tableActionRef={actionRef}
        staffId={staffId}
      />

      <ImportModal
        visible={importModalVisible}
        handleVisible={handleImportModalVisible}
        haveTemplate={true}
        downloadTemplate={() => {
          generateStaffChangeTemplate().then((data) => {
            downloadFile(data, '调动记录导入模板.xlsx');
          });
        }}
        description="导入调动"
        uploadProps={{
          action: '/hrs-api/staff-change/import',
          headers: {
            Authorization: localStorage.getItem('ACCESS_TOKEN') || '',
          },
          name: 'file',
          maxCount: 1,
          onChange: ({ file }) => {
            const { status, response } = file;
            if (status === 'done') {
              const { data } = response;
              message
                .success({
                  content: `导入成功：${data}`,
                  style: {
                    whiteSpace: 'pre-wrap',
                  },
                })
                .then();
              actionRef.current?.reloadAndRest?.();
            } else if (status === 'error') {
              message.error(`导入失败：${response.message}`).then();
            }
          },
        }}
      />
    </>
  );
};

export default StaffChangeList;
