import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Divider, Input, message, Modal, Popconfirm, Space, Tag } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPageParams, getSortOrder, tableFilter } from '@/utils/common';
import {
  ExclamationCircleOutlined,
  ExportOutlined,
  ImportOutlined,
  KeyOutlined,
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
  freezeAttendanceQuarterByIds,
  freezeAttendanceQuarterByQuarter,
  generateAttendanceQuarterTemplate,
  getAttendanceQuarterById,
  getAttendanceQuarterPage,
} from '@/services/attendance-quarter/attendance-quarter';
import ImportModal from '@/components/ImportModal';
import { ModalForm, ProFormDigit, ProFormSwitch } from '@ant-design/pro-form';

const AttendanceQuarterList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<AttendanceQuarterVO | AttendanceQuarterForm>({});
  const [viewDrawerVisible, handleViewDrawerVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<AttendanceQuarterVO[]>([]);
  const [freezeModalVisible, handleFreezeModalVisible] = useState<boolean>(false);
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

  /**
   * 批量冻结/解冻季度考勤
   */
  const handleFreezeAttendanceQuarter = (freeze: boolean) => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: `确定批量${freeze ? '冻结' : '解冻'}勾选中的季度考勤吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在处理');
        if (!selectedRowsState) return true;
        try {
          const { data } = await freezeAttendanceQuarterByIds({
            attendanceQuarterIds: selectedRowsState.map((selectedRow) => selectedRow.id),
            freeze,
          });
          hide();
          message.success(data);
          actionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error(`${freeze ? '解冻' : '冻结'}失败`);
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
      render: (dom, record) => {
        return (
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
      dataIndex: 'attendanceQuarterRate',
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
      title: '是否冻结',
      dataIndex: 'freeze',
      valueType: 'text',
      align: 'center',
      sorter: true,
      fieldProps: {
        options: [
          { value: true, label: '是' },
          { value: false, label: '否' },
        ],
      },
      render: (_, record) => (
        <Space>{record.freeze ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>}</Space>
      ),
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
                  handleUpdateModalVisible(true);
                } else {
                  message.warn('没有选中有效的季度考勤');
                }
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <a
              onClick={async () => {
                if (record && record.id) {
                  const hide = message.loading('正在处理');
                  const { data } = await freezeAttendanceQuarterByIds({
                    attendanceQuarterIds: [record.id],
                    freeze: !record.freeze,
                  });
                  hide();
                  message.success(data);
                  actionRef.current?.reloadAndRest?.();
                } else {
                  message.warn('没有选中有效的季度考勤');
                }
              }}
            >
              {record.freeze ? '解冻' : '冻结'}
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
          <Button type="primary" onClick={() => handleFreezeModalVisible(true)}>
            <KeyOutlined /> 季度考勤冻结
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
          <Button
            onClick={() => {
              handleFreezeAttendanceQuarter(true);
            }}
          >
            批量冻结
          </Button>
          <Button
            onClick={() => {
              handleFreezeAttendanceQuarter(false);
            }}
          >
            批量解冻
          </Button>
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

      <ModalForm
        title="季度考勤冻结"
        width={360}
        visible={freezeModalVisible}
        initialValues={{ freeze: false }}
        onVisibleChange={handleFreezeModalVisible}
        onFinish={async (fields) => {
          const hide = message.loading('正在处理');
          try {
            const { data } = await freezeAttendanceQuarterByQuarter(fields);
            hide();
            message.success({
              content: data,
              style: {
                whiteSpace: 'pre-wrap',
              },
            });
            actionRef.current?.reloadAndRest?.();
            handleFreezeModalVisible(true);
          } catch (error) {
            hide();
            message.error('添加失败请重试！');
          }
        }}
        modalProps={{
          destroyOnClose: true,
        }}
        submitter={{
          searchConfig: {
            submitText: '提交',
            resetText: '取消',
          },
        }}
      >
        <ProFormDigit
          width="md"
          name="year"
          label="考勤年度"
          rules={[{ required: true, message: '请输入考核年度' }]}
        />
        <ProFormDigit
          width="md"
          name="quarter"
          label="考勤季度"
          rules={[{ required: true, message: '请输入考核季度' }]}
        />
        <ProFormSwitch
          label="请选择冻结或解除冻结"
          checkedChildren="冻结"
          unCheckedChildren="解除冻结"
          name="freeze"
          rules={[{ required: true, message: '请选择冻结或解除冻结' }]}
        />
      </ModalForm>

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
