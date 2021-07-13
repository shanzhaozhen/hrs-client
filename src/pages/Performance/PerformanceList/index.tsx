import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import {Button, Divider, Input, message, Modal, Popconfirm} from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { exportSalaryStaff } from '@/services/salary-staff/salary-staff';
import type { SalaryStaffForm, SalaryStaffVO } from '@/services/salary-staff/typings';
import { getPageParams, getSortOrder, tableFilter } from "@/utils/common";
import {ExclamationCircleOutlined, ExportOutlined, ImportOutlined, PlusOutlined} from "@ant-design/icons";
import CreateForm from "@/pages/Performance/PerformanceList/components/CreateForm";
import ViewForm from "@/pages/Performance/PerformanceList/components/ViewForm";
import UpdateForm from "@/pages/Performance/PerformanceList/components/UpdateForm";
import { useDepartmentList, useDepartmentTree } from "@/utils/department";
import FormTreeSelect from "@/components/FormTreeSelect";
import { ProFormUploadDragger } from "@ant-design/pro-form";
import {downloadFile} from "@/utils/file";
import type { PerformanceVO } from "@/services/performance/typings";
import {
  batchDeletePerformance,
  deletePerformance,
  generatePerformanceTemplate,
  getPerformanceById,
  getPerformancePage
} from "@/services/performance/performance";
import CustomUpload from "@/components/CustomUpload";

export const onFormValuesChange = (changedValues: any, allValues: any, formRef: any) => {
  if (changedValues.hasOwnProperty('performanceSetting')) {
    const { performanceSetting } = changedValues
    if (performanceSetting) {
      const yearAndQuarter = performanceSetting.match(/\d+(.\d+)?/g)
      if (yearAndQuarter.length === 2) {
        formRef.current?.setFieldsValue({
          ...allValues,
          year: yearAndQuarter[0],
          quarter: yearAndQuarter[1]
        });
      }
    }
  }
}

const PerformanceList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<SalaryStaffVO | SalaryStaffForm>({});
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<SalaryStaffVO[]>([]);
  const [importModalVisible, setImportModalVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();

  /**
   * 批量删除员工
   */
  const handleDeletePerformance = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的员工吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeletePerformance(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<PerformanceVO>[] = [
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
      dataIndex: 's.depId',
      valueType: 'select',
      sorter: true,
      renderText: (_, record) => (tableFilter(record.depId, departmentList, '未分配')),
      renderFormItem: () => {
        return <FormTreeSelect treeData={departmentTree} placeholder="请选择部门" />
      }
    },
    {
      title: '员工编号',
      dataIndex: 's.staffCode',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
      renderText: (_, record) => record.staffCode,
    },
    {
      title: '员工姓名',
      dataIndex: 's.staffName',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
      renderText: (_, record) => record.staffName,
    },
    {
      title: '考核年度',
      dataIndex: 'year',
      valueType: 'digit',
      sorter: true,
    },
    {
      title: '考核季度',
      dataIndex: 'quarter',
      valueType: 'digit',
      sorter: true,
    },
    {
      title: '考核等级',
      dataIndex: 'appraise',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
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
                  const { data } = await getPerformanceById(record.id);
                  setFormValues(data || {});
                  handleViewModalVisible(true);
                } else {
                  message.warn('没有选中有效的绩效评价');
                }
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
            <a
              onClick={async () => {
                if (record && record.id) {
                  let { data } = await getPerformanceById(record.id);
                  if (data) {
                    data = {
                      ...data,
                      // @ts-ignore
                      month: [data.startMonth, data.endMonth]
                    }
                  }
                  setFormValues(data || {});
                  handleUpdateModalVisible(true);
                } else {
                  message.warn('没有选中有效的绩效评价');
                }
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除该绩效评价?"
              onConfirm={async () => {
                if (record && record.id) {
                  await deletePerformance(record.id);
                  message.success('删除成功！');
                  actionRef.current?.reloadAndRest?.();
                } else {
                  message.warn('没有选中有效的绩效评价');
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
      <ProTable<PerformanceVO>
        headerTitle="绩效评价"
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
                downloadFile(data, `员工-${new Date().getTime()}.xlsx`)
              })
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getPerformancePage(getPageParams(params), getSortOrder(sorter));
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
           <Button onClick={handleDeletePerformance}>批量删除</Button>
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
            viewModalVisible={viewModalVisible}
            handleViewModalVisible={handleViewModalVisible}
            values={formValues}
            onCancel={() => setFormValues({})}
          />
          <UpdateForm
            updateModalVisible={updateModalVisible}
            handleUpdateModalVisible={handleUpdateModalVisible}
            values={formValues}
            onCancel={() => setFormValues({})}
            tableActionRef={actionRef}
          />
        </>
      ) : null}

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
            generatePerformanceTemplate().then(data => {
              downloadFile(data, '绩效评价导入模板.xlsx')
            })
          }}>
            点击下载
          </a>
          导入模板
          </div>
        <CustomUpload
          type="ProFormUploadDragger"
          maxCount={1}
          paramName="file"
          action="/hrs-api/performance/import"
          description="导入绩效评价"
        />
      </Modal>

    </PageContainer>
  );
};

export default PerformanceList;
