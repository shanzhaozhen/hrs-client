import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import {Button, Input, message, Modal} from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  batchDeleteSalaryStaff,
  exportSalaryStaff, generateSalaryStaffTemplate,
  getSalaryStaffById,
  getSalaryStaffPage
} from '@/services/salary-staff/salary-staff';
import type { SalaryStaffForm, SalaryStaffVO } from '@/services/salary-staff/typings';
import { getPageParams, getSortOrder, tableFilter } from "@/utils/common";
import {ExclamationCircleOutlined, ExportOutlined, ImportOutlined, PlusOutlined} from "@ant-design/icons";
import CreateForm from "@/pages/Salary/SalaryStaffList/components/CreateForm";
import ViewForm from "@/pages/Salary/SalaryStaffList/components/ViewForm";
import { useDepartmentList, useDepartmentTree } from "@/utils/department";
import FormTreeSelect from "@/components/FormTreeSelect";
import {downloadFile} from "@/utils/file";
import ImportModal from "@/components/ImportModal";

const SalaryStaffList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<SalaryStaffVO | SalaryStaffForm>({});
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<SalaryStaffVO[]>([]);
  const [importModalVisible, setImportModalVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();

  /**
   * 批量删除员工薪资
   */
  const handleDeleteSalaryStaff = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的员工薪资吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteSalaryStaff(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<SalaryStaffVO>[] = [
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
      renderText: (_, record) => (tableFilter(record.depId, departmentList, '未分配')),
      renderFormItem: () => {
        return <FormTreeSelect treeData={departmentTree} placeholder="请选择部门" />
      }
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
      title: '基础工资',
      dataIndex: 'basicSalary',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '岗位工资',
      dataIndex: 'postSalary',
      valueType: 'digit',
      sorter: true,
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
      render: (text, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getSalaryStaffById(record.id);
                setFormValues(data || {});
                handleViewModalVisible(true);
              } else {
                message.warn('没有选中有效的员工');
              }
            }}
          >
            查看
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<SalaryStaffVO>
        headerTitle="员工薪资"
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
          <Button type="primary" onClick={() => setImportModalVisible(true)}>
            <ImportOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              exportSalaryStaff({
                ...fieldsValue
              }).then(data => {
                downloadFile(data, `员工薪资数据-${new Date().getTime()}.xlsx`)
              })
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getSalaryStaffPage(getPageParams(params), getSortOrder(sorter));
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
           <Button onClick={handleDeleteSalaryStaff}>批量删除</Button>
        </FooterToolbar>
      )}

      <ViewForm
        viewModalVisible={viewModalVisible}
        handleViewModalVisible={handleViewModalVisible}
        values={formValues}
        onCancel={() => setFormValues({})}
      />
      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        tableActionRef={actionRef}
      />

      <ImportModal
        visible={importModalVisible}
        handleVisible={setImportModalVisible}
        haveTemplate={true}
        downloadTemplate={() => {
          generateSalaryStaffTemplate().then(data => {
            downloadFile(data, '员工薪资导入模板.xlsx')
          })
        }}
        description="导入员工薪资"
        uploadProps={{
          action: '/hrs-api/salary-change/import',
          headers: {
            Authorization: localStorage.getItem('ACCESS_TOKEN') || '',
          },
          name: 'file',
          maxCount: 1,
          onChange: ({ file }) => {
            const { status, response } = file;
            if (status === 'done') {
              const { data } = response;
              message.success({
                content: `导入成功：${data}`,
                style: {
                  whiteSpace: 'pre-wrap',
                },
              }).then();
              actionRef.current?.reloadAndRest?.();
            } else if (status === 'error') {
              message.error(`导入失败：${response.message}`).then();
            }
          }
        }}
      />

    </PageContainer>
  );
};

export default SalaryStaffList;
