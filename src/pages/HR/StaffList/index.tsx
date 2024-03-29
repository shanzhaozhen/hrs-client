import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Divider, Input, message } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  exportStaff,
  generateStaffTemplate,
  getStaffById,
  getStaffPage,
} from '@/services/staff/staff';
import type { StaffForm, StaffVO } from '@/services/staff/typings';
import { getPageParams, getSortOrder, tableFilter } from '@/utils/common';
import { ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import CreateForm from '@/pages/HR/StaffList/components/CreateForm';
import UpdateForm from '@/pages/HR/StaffList/components/UpdateForm';
import ViewForm from '@/pages/HR/StaffList/components/ViewForm';
import { useDepartmentList, useDepartmentTree } from '@/utils/department';
import FormTreeSelect from '@/components/FormTreeSelect';
import { downloadFile } from '@/utils/file';
import { useOptions } from '@/utils/options';
import ImportModal from '@/components/ImportModal';

const StaffList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<StaffVO | StaffForm>({});
  const [viewDrawerVisible, handleViewDrawerVisible] = useState<boolean>(false);
  const [createDrawerVisible, handleCreateDrawerVisible] = useState<boolean>(false);
  const [updateDrawerVisible, handleUpdateDrawerVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<StaffVO[]>([]);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();
  const companyStateOptions = useOptions('CompanyState');
  const employTypeOptions = useOptions('EmployType');
  const postLevelOptions = useOptions(
    'PostLevel',
    'name',
    'code',
    (item) => `${item.name}(${item.code})`,
  );

  // /**
  //  * 批量删除员工
  //  */
  // const handleDeleteStaff = () => {
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
      renderText: (_, record) => tableFilter(record.depId, departmentList, '未分配'),
      renderFormItem: () => {
        return <FormTreeSelect treeData={departmentTree} placeholder="请选择部门" />;
      },
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
      title: '员工姓名',
      dataIndex: 'staffName',
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
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '在司状态',
      dataIndex: 'companyState',
      valueType: 'select',
      sorter: true,
      initialValue: '在职',
      fieldProps: { options: companyStateOptions },
    },
    {
      title: '用工性质',
      dataIndex: 'employType',
      valueType: 'select',
      sorter: true,
      fieldProps: { options: employTypeOptions },
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
      title: '岗位等级',
      dataIndex: 'postLevel',
      valueType: 'select',
      sorter: true,
      fieldProps: { options: postLevelOptions },
    },
    {
      title: '民族',
      dataIndex: 'nation',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '开始工作时间',
      dataIndex: 'workDate',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '入职日期',
      dataIndex: 'entryDate',
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
                const { data } = await getStaffById(record.id);
                // todo: 简化地址转变的操作
                setFormValues(data || {});
                handleViewDrawerVisible(true);
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
                const { data } = await getStaffById(record.id);
                // todo: 简化地址转变的操作
                setFormValues(data || {});
                handleUpdateDrawerVisible(true);
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
      <ProTable<StaffVO>
        headerTitle="员工"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateDrawerVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => handleImportModalVisible(true)}>
            <ImportOutlined /> 员工导入
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              exportStaff({
                ...fieldsValue,
              }).then((data) => {
                downloadFile(data, `员工-${new Date().getTime()}.xlsx`);
              });
            }}
          >
            <ExportOutlined /> 员工导出
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await getStaffPage(getPageParams(params), getSortOrder(sorter));
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
          {/* <Button onClick={handleDeleteStaff}>批量删除</Button> */}
        </FooterToolbar>
      )}

      <ViewForm
        viewDrawerVisible={viewDrawerVisible}
        handleViewDrawerVisible={handleViewDrawerVisible}
        values={formValues}
        onClose={() => setFormValues({})}
      />
      <CreateForm
        createDrawerVisible={createDrawerVisible}
        handleCreateDrawerVisible={handleCreateDrawerVisible}
        tableActionRef={actionRef}
      />
      <UpdateForm
        updateDrawerVisible={updateDrawerVisible}
        handleUpdateDrawerVisible={handleUpdateDrawerVisible}
        values={formValues}
        onClose={() => setFormValues({})}
        tableActionRef={actionRef}
      />

      <ImportModal
        visible={importModalVisible}
        handleVisible={handleImportModalVisible}
        haveTemplate={true}
        downloadTemplate={() => {
          generateStaffTemplate().then((data) => {
            downloadFile(data, '员工导入模板.xlsx');
          });
        }}
        description="导入员工"
        uploadProps={{
          action: '/hrs-api/staff/import',
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

export default StaffList;
