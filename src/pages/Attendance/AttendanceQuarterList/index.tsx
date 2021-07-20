import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Divider, Input, message, Modal, Popconfirm } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPageParams, getSortOrder, tableFilter } from '@/utils/common';
import {
  ExclamationCircleOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import CreateForm from '@/pages/Attendance/AttendanceQuarterList/components/CreateForm';
import ViewForm from '@/pages/Attendance/AttendanceQuarterList/components/ViewForm';
import UpdateForm from '@/pages/Attendance/AttendanceQuarterList/components/UpdateForm';
import { useDepartmentList, useDepartmentTree } from '@/utils/department';
import FormTreeSelect from '@/components/FormTreeSelect';
import { downloadFile } from '@/utils/file';
import type {
  AttendanceQuarterForm,
  AttendanceQuarterVO,
} from '@/services/attendance-quarter/typings';
import {
  batchDeleteAttendanceQuarter,
  deleteAttendanceQuarter,
  exportAttendanceQuarter,
  generateAttendanceQuarterTemplate,
  getAttendanceQuarterById,
  getAttendanceQuarterPage,
} from '@/services/attendance-quarter/attendance-quarter';
import ImportModal from '@/components/ImportModal';

const AttendanceQuarterList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<AttendanceQuarterVO | AttendanceQuarterForm>({});
  const [viewDrawerVisible, handleViewDrawerVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<AttendanceQuarterVO[]>([]);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();

  /**
   * 批量删除季度考勤
   */
  const handleDeleteAttendanceQuarter = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的季度考勤吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteAttendanceQuarter(
            selectedRowsState.map((selectedRow) => selectedRow.id),
          );
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

  const columns: ProColumns<AttendanceQuarterVO>[] = [
    {
      title: '关键字',
      key: 'keyword',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
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
      valueType: 'select',
      sorter: 's.depId',
      renderText: (_, record) => tableFilter(record.depId, departmentList, '未分配'),
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
    },
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      valueType: 'text',
      sorter: 's.staffName',
      hideInSearch: true,
    },
    {
      title: '考勤年度',
      dataIndex: 'year',
      valueType: 'digit',
      sorter: true,
    },
    {
      title: '考勤季度',
      dataIndex: 'quarter',
      valueType: 'digit',
      sorter: true,
    },
    {
      title: '应出勤',
      dataIndex: 'shouldAttendanceDays',
      valueType: 'digit',
      sorter: true,
    },
    {
      title: '实出勤',
      dataIndex: 'actualAttendanceDays',
      valueType: 'digit',
      sorter: true,
    },
    {
      title: '出勤率',
      dataIndex: 'month',
      valueType: 'text',
      sorter: true,
      renderText: (_, record) =>
        record.shouldAttendanceDays
          ? `${(((record.actualAttendanceDays || 0) / record.shouldAttendanceDays) * 100).toFixed(
              2,
            )}%`
          : '0%',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
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
          <>
            <a
              onClick={async () => {
                if (record && record.id) {
                  const { data } = await getAttendanceQuarterById(record.id);
                  setFormValues(data || {});
                  handleViewDrawerVisible(true);
                } else {
                  message.warn('没有选中有效的季度考勤');
                }
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
            <a
              onClick={async () => {
                if (record && record.id) {
                  const { data } = await getAttendanceQuarterById(record.id);
                  setFormValues(data || {});
                  handleUpdateModalVisible(true);
                } else {
                  message.warn('没有选中有效的季度考勤');
                }
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除该季度考勤?"
              onConfirm={async () => {
                if (record && record.id) {
                  await deleteAttendanceQuarter(record.id);
                  message.success('删除成功！');
                  actionRef.current?.reloadAndRest?.();
                } else {
                  message.warn('没有选中有效的季度考勤');
                }
              }}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<AttendanceQuarterVO>
        headerTitle="季度考勤"
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
              exportAttendanceQuarter({ ...fieldsValue }).then((data) => {
                downloadFile(data, `季度月度考勤-${new Date().getTime()}.xlsx`);
              });
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getAttendanceQuarterPage(
            getPageParams(params),
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
          <Button onClick={handleDeleteAttendanceQuarter}>批量删除</Button>
        </FooterToolbar>
      )}

      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        tableActionRef={actionRef}
      />

      {formValues && Object.keys(formValues).length ? (
        <>
          <ViewForm
            viewDrawerVisible={viewDrawerVisible}
            handleViewDrawerVisible={handleViewDrawerVisible}
            values={formValues}
            onClose={() => setFormValues({})}
          />
          <UpdateForm
            updateModalVisible={updateModalVisible}
            handleUpdateModalVisible={handleUpdateModalVisible}
            values={formValues}
            onClose={() => setFormValues({})}
            tableActionRef={actionRef}
          />
        </>
      ) : null}

      <ImportModal
        visible={importModalVisible}
        handleVisible={handleImportModalVisible}
        haveTemplate={true}
        downloadTemplate={() => {
          generateAttendanceQuarterTemplate().then((data) => {
            downloadFile(data, '季度考勤导入模板.xlsx');
          });
        }}
        description="导入季度考勤"
        uploadProps={{
          action: '/hrs-api/attendance-quarter/import',
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
    </PageContainer>
  );
};

export default AttendanceQuarterList;
