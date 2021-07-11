import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import {Button, Divider, Input, message, Modal} from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {exportSalaryStaff, printSalaryStaff} from '@/services/salary-staff/salary-staff';
import type { SalaryStaffForm, SalaryStaffVO } from '@/services/salary-staff/typings';
import { getPageParams, getSortOrder } from "@/utils/common";
import { ExportOutlined, ImportOutlined, PlusOutlined } from "@ant-design/icons";
import CreateForm from "@/pages/Performance/PerformanceSettingList/components/CreateForm";
import ViewForm from "@/pages/Performance/PerformanceSettingList/components/ViewForm";
import { ProFormUploadDragger } from "@ant-design/pro-form";
import {downloadFile} from "@/utils/file";
import {getPerformanceSettingById, getPerformanceSettingPage} from "@/services/performance-setting/performance-setting";
import UpdateForm from "@/pages/Performance/PerformanceSettingList/components/UpdateForm";

export const onFormValuesChange = (changedValues: any, allValues: any, formRef: any) => {
  if (changedValues.hasOwnProperty('month')) {
    const { month } = changedValues;
    const yearMonth = month[0].split('-');
    const quarter = parseInt(String(yearMonth[1] / 4), 10) + 1;
    formRef.current?.setFieldsValue({
      ...allValues,
      name: `${yearMonth[0]}年第${quarter}季度`,
      startMonth: month[0],
      endMonth: month[1],
      year: yearMonth[0],
      quarter
    });
  }
}

const PerformanceSettingList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<SalaryStaffVO | SalaryStaffForm>({});
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<SalaryStaffVO[]>([]);
  const [importModalVisible, setImportModalVisible] = useState<boolean>(false);

  // /**
  //  * 批量删除员工
  //  */
  // const handleDeleteSalaryStaff = () => {
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
  //         await batchDeleteSalaryStaff(selectedRowsState.map((selectedRow) => selectedRow.id));
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
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '考核年度',
      dataIndex: 'year',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '考核季度',
      dataIndex: 'quarter',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '开始考核月份',
      dataIndex: 'startMonth',
      valueType: 'dateMonth',
      defaultSortOrder: 'descend',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '结束考核月份',
      dataIndex: 'endMonth',
      valueType: 'dateMonth',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
      sorter: true,
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
                const { data } = await getPerformanceSettingById(record.id);
                setFormValues(data || {});
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
                let { data } = await getPerformanceSettingById(record.id);
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
      <ProTable<SalaryStaffVO>
        headerTitle="绩效设置"
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
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              printSalaryStaff(fieldsValue.id).then(data => {
                downloadFile(data, `员工-${new Date().getTime()}.docx`)
              })
            }}
          >
            <ExportOutlined /> 打印
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getPerformanceSettingPage(getPageParams(params), getSortOrder(sorter));
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
          {/* <Button onClick={handleDeleteSalaryStaff}>批量删除</Button> */}
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

export default PerformanceSettingList;
