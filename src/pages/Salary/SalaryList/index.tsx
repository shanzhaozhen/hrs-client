import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import {Button, Divider, Input, message, Modal, Popconfirm, Space, Tag} from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPageParams, getSortOrder, tableFilter } from "@/utils/common";
import {
  ExclamationCircleOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import CreateForm from "@/pages/Salary/SalaryList/components/CreateForm";
import ViewForm from "@/pages/Salary/SalaryList/components/ViewForm";
import UpdateForm from "@/pages/Salary/SalaryList/components/UpdateForm";
import { useDepartmentList, useDepartmentTree } from "@/utils/department";
import FormTreeSelect from "@/components/FormTreeSelect";
import {downloadFile} from "@/utils/file";
import type {SalaryForm, SalaryVO} from "@/services/salary/typings";
import {
  batchDeleteSalary,
  deleteSalary,
  exportSalary,
  generateSalaryTemplate,
  getSalaryById,
  getSalaryPage
} from "@/services/salary/salary";
import ImportModal from "@/components/ImportModal";

export const onFormValuesChange = (changedValues: any, allValues: any, formRef: any) => {
  if (changedValues.hasOwnProperty('salarySetting')) {
    const { salarySetting } = changedValues
    if (salarySetting) {
      const yearAndQuarter = salarySetting.match(/\d+(.\d+)?/g)
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

const SalaryList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<SalaryVO | SalaryForm>({});
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<SalaryVO[]>([]);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();

  /**
   * 批量删除薪资发放
   */
  const handleDeleteSalary = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的薪资发放吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteSalary(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<SalaryVO>[] = [
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
      title: '发放月份',
      dataIndex: 'month',
      valueType: 'dateMonth',
      sorter: true,
    },
    {
      title: '发薪类型',
      dataIndex: 'type',
      valueType: 'text',
      sorter: true,
    },
    {
      title: '基础工资',
      dataIndex: 'basicSalary',
      valueType: 'digit',
      align: "right",
      sorter: true,
    },
    {
      title: '岗位工资',
      dataIndex: 'postSalary',
      valueType: 'digit',
      align: "right",
      sorter: true,
    },
    {
      title: '应发工资',
      dataIndex: 'shouldSalary',
      valueType: 'digit',
      align: "right",
      sorter: true,
    },
    {
      title: '实发工资',
      dataIndex: 'actualSalary',
      valueType: 'digit',
      align: "right",
      sorter: true,
    },
    {
      title: '是否冻结',
      dataIndex: 'freeze',
      valueType: 'text',
      align: "center",
      sorter: true,
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          {record.freeze ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>}
        </Space>
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
      hideInTable: true,
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastModifiedDate',
      valueType: 'dateTime',
      sorter: true,
      defaultSortOrder: 'descend',
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
                  const { data } = await getSalaryById(record.id);
                  setFormValues(data || {});
                  handleViewModalVisible(true);
                } else {
                  message.warn('没有选中有效的薪资发放');
                }
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
            <a
              onClick={async () => {
                if (record && record.id) {
                  let { data } = await getSalaryById(record.id);
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
                  message.warn('没有选中有效的薪资发放');
                }
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除该薪资发放?"
              onConfirm={async () => {
                if (record && record.id) {
                  await deleteSalary(record.id);
                  message.success('删除成功！');
                  actionRef.current?.reloadAndRest?.();
                } else {
                  message.warn('没有选中有效的薪资发放');
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
      <ProTable<SalaryVO>
        headerTitle="薪资发放"
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
          <Button type="primary" onClick={() => {}}>
            <ThunderboltOutlined /> 薪资生成
          </Button>,
          <Button type="primary" onClick={() => handleImportModalVisible(true)}>
            <ImportOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              exportSalary({ ...fieldsValue }).then(data => {
                downloadFile(data, `薪资发放数据-${new Date().getTime()}.xlsx`)
              })
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getSalaryPage(getPageParams(params), getSortOrder(sorter));
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
           <Button onClick={handleDeleteSalary}>批量删除</Button>
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
          generateSalaryTemplate().then(data => {
            downloadFile(data, '薪资发放导入模板.xlsx')
          })
        }}
        description="导入薪资发放"
        uploadProps={{
          action: '/hrs-api/salary/import',
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

export default SalaryList;
