import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import {Button, Divider, Input, message, Modal} from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {exportStaffSalary, getStaffSalaryById, getStaffSalaryPage, printStaffSalary} from '@/services/salary-staff/salary-staff';
import type { StaffSalaryForm, StaffSalaryVO } from '@/services/salary-staff/typings';
import { getPageParams, getSortOrder, tableFilter } from "@/utils/common";
import { ExportOutlined, ImportOutlined, PlusOutlined } from "@ant-design/icons";
import CreateForm from "@/pages/Salary/SalaryStaffList/components/CreateForm";
import UpdateForm from "@/pages/Salary/SalaryStaffList/components/UpdateForm";
import ViewForm from "@/pages/Salary/SalaryStaffList/components/ViewForm";
import { useDepartmentList, useDepartmentTree } from "@/utils/department";
import FormTreeSelect from "@/components/FormTreeSelect";
import { ProFormUploadDragger } from "@ant-design/pro-form";
import {downloadFile} from "@/utils/file";

const StaffSalaryList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [updateFormValues, setUpdateFormValues] = useState<StaffSalaryVO | StaffSalaryForm>({});
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<StaffSalaryVO[]>([]);
  const [importModalVisible, setImportModalVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();


  // /**
  //  * 批量删除员工
  //  */
  // const handleDeleteStaffSalary = () => {
  //   Modal.confirm({
  //     title: '确认',
  //     icon: <ExclamationCircleOutlined />,
  //     content: '确定批量删除勾选中的员工吗',
  //     okText: '确认',
  //     cancelText: '取消',
  //     onOk: async () => {
  //       const hide = message.loading('正在删除');
  //       if (!selectedRowsState) return true;
  //       try {
  //         await batchDeleteStaffSalary(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<StaffSalaryVO>[] = [
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
      sorter: true,
      renderText: (_, record) => (tableFilter(record.depId, departmentList, '未分配')),
      renderFormItem: () => {
        return <FormTreeSelect treeData={departmentTree} placeholder="请选择部门" />
      }
    },
    {
      title: '员工编号',
      dataIndex: 'salaryStaffCode',
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
      title: '员工姓名',
      dataIndex: 'salaryStaffCode',
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
                const { data } = await getStaffSalaryById(record.id);
                setUpdateFormValues(data || {});
                handleViewModalVisible(true);
              } else {
                message.warn('没有选中有效的员工');
              }
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                const { data } = await getStaffSalaryById(record.id);
                setUpdateFormValues(data || {});
                handleUpdateModalVisible(true);
              } else {
                message.warn('没有选中有效的员工');
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
      <ProTable<StaffSalaryVO>
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
              exportStaffSalary({
                ...fieldsValue
              }).then(data => {
                downloadFile(data, `员工-${new Date().getTime()}.xlsx`)
              })
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              printStaffSalary(fieldsValue.id).then(data => {
                downloadFile(data, `员工-${new Date().getTime()}.docx`)
              })
            }}
          >
            <ExportOutlined /> 打印
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getStaffSalaryPage(getPageParams(params), getSortOrder(sorter));
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
          {/* <Button onClick={handleDeleteStaffSalary}>批量删除</Button> */}
        </FooterToolbar>
      )}

      <ViewForm
        viewModalVisible={viewModalVisible}
        handleViewModalVisible={handleViewModalVisible}
        onCancel={() => setUpdateFormValues({})}
      />
      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        tableActionRef={actionRef}
      />
      <UpdateForm
        updateModalVisible={updateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onCancel={() => setUpdateFormValues({})}
        tableActionRef={actionRef}
      />

      <Modal
        title="导入"
        visible={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        footer={null}
      >
        <div style={{
          textAlign: "right",
          marginBottom: 15
        }}>
          <a href="#" onClick={() => {
            // todo: 员工薪资导入
            console.log('dd')
          }}>
            点击下载
          </a>
          导入模板
          </div>
        <ProFormUploadDragger
          description="导入员工"
          fieldProps={{
            maxCount: 1
          }}
        />
      </Modal>

    </PageContainer>
  );
};

export default StaffSalaryList;
