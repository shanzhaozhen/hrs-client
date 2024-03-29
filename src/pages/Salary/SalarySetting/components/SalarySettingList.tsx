import React, { useState } from 'react';
import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { message } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPageParams, getSortOrder } from '@/utils/common';
import type { SalarySettingForm, SalarySettingVO } from '@/services/salary-setting/typings';
import {
  getSalarySettingById,
  getSalarySettingPage,
} from '@/services/salary-setting/salary-setting';
import ViewForm from '@/pages/Salary/SalarySetting/components/ViewForm';
import { monthOptions } from '@/utils/options';

interface SalarySettingListProps {
  actionRef: MutableRefObject<ActionType | undefined>;
  salarySettingListModalVisible: boolean;
  handleSalarySettingListModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SalarySettingList: React.FC<SalarySettingListProps> = (props) => {
  const { actionRef } = props;

  const [formValues, setFormValues] = useState<SalarySettingVO | SalarySettingForm>({});
  const [viewDrawerVisible, handleViewDrawerVisible] = useState<boolean>(false);

  const columns: ProColumns<SalarySettingVO>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '绩效工资基数',
      dataIndex: 'meritSalary',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '全勤津贴标准（元/月）',
      dataIndex: 'fullAttendanceAllowance',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '就餐补贴（元/月）',
      dataIndex: 'mealAllowance',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '交通补贴（自行到达）A（元/月）',
      dataIndex: 'trafficAllowanceOwnA',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '交通补贴（自行到达）B（元/月）',
      dataIndex: 'trafficAllowanceOwnB',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '交通补贴（自行到达）C（元/月）',
      dataIndex: 'trafficAllowanceOwnC',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '交通补贴（乘坐接驳车）A（元/月）',
      dataIndex: 'trafficAllowanceBusA',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '交通补贴（乘坐接驳车）B（元/月）',
      dataIndex: 'trafficAllowanceBusB',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '交通补贴（乘坐接驳车）C（元/月）',
      dataIndex: 'trafficAllowanceBusC',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '安全岗岗位津贴A',
      dataIndex: 'safetyAllowanceA',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '安全岗岗位津贴B',
      dataIndex: 'safetyAllowanceB',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '安全岗岗位津贴C',
      dataIndex: 'safetyAllowanceC',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '独生子女津贴标准（元/月）',
      dataIndex: 'oneChildAllowance',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '高温津贴开始生效月份',
      dataIndex: 'hotWeatherStartMonth',
      valueType: 'select',
      sorter: true,
      hideInSearch: true,
      fieldProps: { options: monthOptions },
    },
    {
      title: '高温津贴结束生效月份',
      dataIndex: 'hotWeatherEndMonth',
      valueType: 'select',
      sorter: true,
      hideInSearch: true,
      fieldProps: { options: monthOptions },
    },
    {
      title: '高温津贴A标准',
      dataIndex: 'hotWeatherAllowanceA',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '高温津贴B标准',
      dataIndex: 'hotWeatherAllowanceB',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '高温津贴C标准',
      dataIndex: 'hotWeatherAllowanceC',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '值班费（工作日）（元/天）',
      dataIndex: 'dutyWeekFee',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '值班费（休息日前一天）（元/天）',
      dataIndex: 'dutyBeforeWeekFee',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '值班费（法定节假日前一天）（元/天）',
      dataIndex: 'dutyBeforeFestivalFee',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '值班费（休息日）（元/天）',
      dataIndex: 'dutyWeekendFee',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '值班费（法定节假日（春节假期除外））（元/天）',
      dataIndex: 'dutyFestivalFee',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '值班费（春节假期（不含除夕、初一、初二））（元/天）',
      dataIndex: 'dutyOutSpringFee',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '值班费（春节假期（除夕、初一、初二））（元/天）',
      dataIndex: 'dutyInSpringFee',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '工会费',
      dataIndex: 'unionFees',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      hideInTable: true,
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
      title: '修改人',
      dataIndex: 'createdByName',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'createdDate',
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
                  const { data } = await getSalarySettingById(record.id);
                  setFormValues(data || {});
                  handleViewDrawerVisible(true);
                } else {
                  message.warn('没有选中有效的新增配置');
                }
              }}
            >
              查看
            </a>
          </>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<SalarySettingVO>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={async (params, sorter) => {
          const { data } = await getSalarySettingPage(getPageParams(params), getSortOrder(sorter));
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
      />

      <ViewForm
        viewDrawerVisible={viewDrawerVisible}
        values={formValues}
        handleViewDrawerVisible={handleViewDrawerVisible}
        onClose={() => {
          setFormValues({});
          handleViewDrawerVisible(false);
        }}
      />
    </>
  );
};

export default SalarySettingList;
