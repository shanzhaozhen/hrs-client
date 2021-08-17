import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Divider, Input, message, Modal, Popconfirm, Space, Tag } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { checkHasKey, getPageParams, getSortOrder, tableFilter } from '@/utils/common';
import {
  ExclamationCircleOutlined,
  ExportOutlined,
  ImportOutlined,
  KeyOutlined,
  PlusOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import CreateForm from '@/pages/Salary/SalaryList/components/CreateForm';
import ViewForm from '@/pages/Salary/SalaryList/components/ViewForm';
import UpdateForm from '@/pages/Salary/SalaryList/components/UpdateForm';
import { useDepartmentList, useDepartmentTree } from '@/utils/department';
import FormTreeSelect from '@/components/FormTreeSelect';
import { downloadFile } from '@/utils/file';
import type { SalaryForm, SalaryVO } from '@/services/salary/typings';
import {
  batchDeleteSalary,
  deleteSalary,
  exportSalary,
  freezeSalaryByIds,
  freezeSalaryByMonth,
  generateSalaryData,
  generateSalaryTaxTemplate,
  generateSalaryTemplate,
  getSalaryById,
  getSalaryPage,
} from '@/services/salary/salary';
import ImportModal from '@/components/ImportModal';
import { ModalForm, ProFormDatePicker, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';
import { useOptions } from '@/utils/options';

export const onFormValuesChange = (changedValues: any, allValues: any, formRef: any) => {
  if (
    checkHasKey(changedValues, [
      'basicSalary',
      'postSalary',
      'meritSalary',
      'sickSalary',
      'backSalary',
      'overtimeSalary',
    ])
  ) {
    const salarySubtotal =
      allValues.basicSalary +
      allValues.postSalary +
      allValues.meritSalary +
      allValues.sickSalary +
      allValues.backSalary +
      allValues.overtimeSalary;
    const shouldSalary =
      salarySubtotal +
      allValues.bonusSubtotal +
      allValues.allowanceSubtotal +
      allValues.preTaxDeductSubtotal;
    const preTaxSalary = shouldSalary + allValues.materialSubtotal - allValues.oneChildAllowance;
    const actualSalary =
      shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      salarySubtotal,
      shouldSalary,
      preTaxSalary,
      actualSalary,
    });
  }
  if (
    checkHasKey(changedValues, [
      'annualBonus',
      'safetyBonus',
      'stabilityBonus',
      'familyPlanningBonus',
      'excellenceBonus',
      'specialBonus',
    ])
  ) {
    const bonusSubtotal =
      allValues.annualBonus +
      allValues.safetyBonus +
      allValues.stabilityBonus +
      allValues.familyPlanningBonus +
      allValues.excellenceBonus +
      allValues.specialBonus;
    const shouldSalary =
      allValues.salarySubtotal +
      bonusSubtotal +
      allValues.allowanceSubtotal +
      allValues.preTaxDeductSubtotal;
    const preTaxSalary = shouldSalary + allValues.materialSubtotal - allValues.oneChildAllowance;
    const actualSalary =
      shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      bonusSubtotal,
      shouldSalary,
      preTaxSalary,
      actualSalary,
    });
  }
  if (
    checkHasKey(changedValues, [
      'oneChildAllowance',
      'hotWeatherAllowance',
      'fullAttendanceAllowance',
      'nightShiftAllowance',
      'onDutyAllowance',
      'mealAllowance',
      'trafficAllowance',
      'festivalAllowance',
      'safetyAllowance',
      'otherAllowance',
    ])
  ) {
    const allowanceSubtotal =
      allValues.oneChildAllowance +
      allValues.hotWeatherAllowance +
      allValues.fullAttendanceAllowance +
      allValues.nightShiftAllowance +
      allValues.onDutyAllowance +
      allValues.mealAllowance +
      allValues.trafficAllowance +
      allValues.festivalAllowance +
      allValues.safetyAllowance +
      allValues.otherAllowance;
    const shouldSalary =
      allValues.salarySubtotal +
      allValues.bonusSubtotal +
      allowanceSubtotal +
      allValues.preTaxDeductSubtotal;
    const preTaxSalary = shouldSalary + allValues.materialSubtotal - allValues.oneChildAllowance;
    const actualSalary =
      shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      allowanceSubtotal,
      shouldSalary,
      preTaxSalary,
      actualSalary,
    });
  }
  if (
    checkHasKey(changedValues, [
      'sickLeaveDeduct',
      'entryExitDeduct',
      'fullAttendanceDeduct',
      'meritDeduct',
    ])
  ) {
    const preTaxDeductSubtotal =
      allValues.sickLeaveDeduct +
      allValues.entryExitDeduct +
      allValues.fullAttendanceDeduct +
      allValues.meritDeduct;
    const shouldSalary =
      allValues.salarySubtotal +
      allValues.bonusSubtotal +
      allValues.allowanceSubtotal +
      preTaxDeductSubtotal;
    const preTaxSalary = shouldSalary + allValues.materialSubtotal - allValues.oneChildAllowance;
    const actualSalary =
      shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      preTaxDeductSubtotal,
      shouldSalary,
      preTaxSalary,
      actualSalary,
    });
  }
  if (checkHasKey(changedValues, ['birthdayCard', 'coolDrink', 'condolenceGoods'])) {
    const materialSubtotal =
      allValues.birthdayCard + allValues.coolDrink + allValues.condolenceGoods;
    const preTaxSalary = allValues.shouldSalary + materialSubtotal - allValues.oneChildAllowance;
    const actualSalary =
      allValues.shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;

    formRef.current?.setFieldsValue({
      ...allValues,
      materialSubtotal,
      preTaxSalary,
      actualSalary,
    });
  }
  if (
    checkHasKey(changedValues, [
      'accumulationFund',
      'endowmentInsurance',
      'unemploymentInsurance',
      'medicalInsurance',
      'unionFees',
      'rent',
      'phoneBill',
      'individualIncomeTax',
      'otherAftTaxDeduct',
    ])
  ) {
    const aftTaxDeductSubtotal =
      allValues.accumulationFund +
      allValues.endowmentInsurance +
      allValues.unemploymentInsurance +
      allValues.medicalInsurance +
      allValues.unionFees +
      allValues.rent +
      allValues.phoneBill +
      allValues.individualIncomeTax +
      allValues.otherAftTaxDeduct;
    const actualSalary =
      allValues.shouldSalary + aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      aftTaxDeductSubtotal,
      actualSalary,
    });
  }
  if (changedValues.hasOwnProperty('通讯补贴')) {
    const actualSalary =
      allValues.shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      actualSalary,
    });
  }
  if (
    checkHasKey(changedValues, [
      'salarySubtotal',
      'bonusSubtotal',
      'allowanceSubtotal',
      'preTaxDeductSubtotal',
    ])
  ) {
    const shouldSalary =
      allValues.salarySubtotal +
      allValues.bonusSubtotal +
      allValues.allowanceSubtotal +
      allValues.preTaxDeductSubtotal;
    const preTaxSalary = shouldSalary + allValues.materialSubtotal - allValues.oneChildAllowance;
    const actualSalary =
      shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      shouldSalary,
      preTaxSalary,
      actualSalary,
    });
  }
  if (changedValues.hasOwnProperty('materialSubtotal')) {
    const preTaxSalary =
      allValues.shouldSalary + allValues.materialSubtotal - allValues.oneChildAllowance;
    const actualSalary =
      allValues.shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance;
    formRef.current?.setFieldsValue({
      ...allValues,
      preTaxSalary,
      actualSalary,
    });
  }
  if (changedValues.hasOwnProperty('aftTaxDeductSubtotal')) {
    formRef.current?.setFieldsValue({
      ...allValues,
      actualSalary:
        allValues.shouldSalary + allValues.aftTaxDeductSubtotal + allValues.communicationAllowance,
    });
  }
};

const SalaryList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [formValues, setFormValues] = useState<SalaryVO | SalaryForm>({});
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<SalaryVO[]>([]);
  const [importSalaryModalVisible, handleImportSalaryModalVisible] = useState<boolean>(false);
  const [importTaxModalVisible, handleImportTaxModalVisible] = useState<boolean>(false);
  const [generateModalVisible, handleGenerateModalVisible] = useState<boolean>(false);
  const [freezeModalVisible, handleFreezeModalVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();

  const postLevelOptions = useOptions('PostLevel', 'code', 'code');

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

  /**
   * 批量冻结/解冻薪资发放
   */
  const handleFreezeSalary = (freeze: boolean) => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: `确定批量${freeze ? '冻结' : '解冻'}勾选中的薪资发放吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在处理');
        if (!selectedRowsState) return true;
        try {
          const { data } = await freezeSalaryByIds({
            salaryIds: selectedRowsState.map((selectedRow) => selectedRow.id),
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
                const { data } = await getSalaryById(record.id);
                setFormValues(data || {});
                handleViewModalVisible(true);
              } else {
                message.warn('没有选中有效的薪资发放');
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
      title: '发放月份',
      dataIndex: 'month',
      valueType: 'dateMonth',
      sorter: true,
    },
    {
      title: '发薪类型',
      dataIndex: 'type',
      valueType: 'select',
      sorter: true,
      fieldProps: {
        options: [
          { value: '工资', label: '工资' },
          { value: '奖金', label: '奖金' },
        ],
      },
    },
    {
      title: '岗位等级',
      dataIndex: 'postLevel',
      valueType: 'select',
      sorter: true,
      fieldProps: { options: postLevelOptions },
    },
    {
      title: '考核等级',
      dataIndex: 'appraise',
      valueType: 'text',
      sorter: true,
    },
    {
      title: '基础工资',
      dataIndex: 'basicSalary',
      valueType: 'digit',
      align: 'right',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '岗位工资',
      dataIndex: 'postSalary',
      valueType: 'digit',
      align: 'right',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '应发工资',
      dataIndex: 'shouldSalary',
      valueType: 'digit',
      align: 'right',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '实发工资',
      dataIndex: 'actualSalary',
      valueType: 'digit',
      align: 'right',
      sorter: true,
      hideInSearch: true,
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
      copyable: true,
      ellipsis: true,
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
            {!record.freeze && (
              <>
                <a
                  onClick={async () => {
                    if (record && record.id) {
                      const { data } = await getSalaryById(record.id);
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
              </>
            )}
            <a
              onClick={async () => {
                if (record && record.id) {
                  const hide = message.loading('正在处理');
                  const { data } = await freezeSalaryByIds({
                    salaryIds: [record.id],
                    freeze: !record.freeze,
                  });
                  hide();
                  message.success(data);
                  actionRef.current?.reloadAndRest?.();
                } else {
                  message.warn('没有选中有效的薪资');
                }
              }}
            >
              {record.freeze ? '解冻' : '冻结'}
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
          <Button type="primary" onClick={() => handleGenerateModalVisible(true)}>
            <ThunderboltOutlined /> 薪资生成
          </Button>,
          <Button type="primary" onClick={() => handleFreezeModalVisible(true)}>
            <KeyOutlined /> 薪资冻结
          </Button>,
          <Button type="primary" onClick={() => handleImportSalaryModalVisible(true)}>
            <ImportOutlined /> 薪资导入
          </Button>,
          <Button type="primary" onClick={() => handleImportTaxModalVisible(true)}>
            <ImportOutlined /> 个税导入
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const fieldsValue = formRef.current?.getFieldsValue();
              exportSalary({ ...fieldsValue }).then((data) => {
                downloadFile(data, `薪资发放数据-${new Date().getTime()}.xlsx`);
              });
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
          <Button
            onClick={() => {
              handleFreezeSalary(true);
            }}
          >
            批量冻结
          </Button>
          <Button
            onClick={() => {
              handleFreezeSalary(false);
            }}
          >
            批量解冻
          </Button>
          <Button onClick={handleDeleteSalary}>批量删除</Button>
        </FooterToolbar>
      )}

      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        tableActionRef={actionRef}
      />
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

      <ImportModal
        visible={importSalaryModalVisible}
        handleVisible={handleImportSalaryModalVisible}
        haveTemplate={true}
        downloadTemplate={() => {
          generateSalaryTemplate().then((data) => {
            downloadFile(data, '薪资发放导入模板.xlsx');
          });
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

      <ImportModal
        visible={importTaxModalVisible}
        handleVisible={handleImportTaxModalVisible}
        haveTemplate={true}
        downloadTemplate={() => {
          generateSalaryTaxTemplate().then((data) => {
            downloadFile(data, '个税导入模板.xlsx');
          });
        }}
        description="个税导入"
        uploadProps={{
          action: '/hrs-api/salary/tax/import',
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

      <ModalForm
        title="薪资生成"
        width={480}
        visible={generateModalVisible}
        onVisibleChange={handleGenerateModalVisible}
        onFinish={async (fields) => {
          const hide = message.loading('正在生成');
          try {
            const { data } = await generateSalaryData(fields);
            hide();
            message.success({
              content: `生成成功：${data}`,
              style: {
                whiteSpace: 'pre-wrap',
              },
            });
            actionRef.current?.reloadAndRest?.();
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
            submitText: '开始生成',
            resetText: '取消',
          },
        }}
      >
        <ProFormDatePicker.Month
          label="请选择需要生成的月份"
          width="lg"
          name="month"
          rules={[{ required: true, message: '请选择需要生成的月份' }]}
        />
        <ProFormItem name="depId" label="请选择需要生成的部门">
          <FormTreeSelect treeData={departmentTree} placeholder="请选择需要生成的部门" />
        </ProFormItem>
        <ProFormText
          label="请选择需要生成的员工编号"
          name="staffCode"
          placeholder="请选择需要生成的员工编号"
        />
      </ModalForm>

      <ModalForm
        title="薪资冻结"
        width={360}
        visible={freezeModalVisible}
        initialValues={{ freeze: false }}
        onVisibleChange={handleFreezeModalVisible}
        onFinish={async (fields) => {
          const hide = message.loading('正在处理');
          try {
            const { data } = await freezeSalaryByMonth(fields);
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
        <ProFormDatePicker.Month
          label="请选择需要处理的月份"
          name="month"
          rules={[{ required: true, message: '请选择需要处理的月份' }]}
        />
        <ProFormSwitch
          label="请选择冻结或解除冻结"
          checkedChildren="冻结"
          unCheckedChildren="解除冻结"
          name="freeze"
          rules={[{ required: true, message: '请选择冻结或解除冻结' }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default SalaryList;
