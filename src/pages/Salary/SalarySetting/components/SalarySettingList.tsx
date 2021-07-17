import React, { useState } from 'react';
import type {Dispatch, SetStateAction,MutableRefObject} from 'react';
import {Divider, message} from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPageParams, getSortOrder } from "@/utils/common";
import ViewForm from "@/pages/Salary/SalarySetting/components/ViewForm";
import type {SalarySettingForm, SalarySettingVO} from "@/services/salary-setting/typings";
import {getSalarySettingById, getSalarySettingPage} from "@/services/salary-setting/salary-setting";


interface SalarySettingListProps {
  actionRef: MutableRefObject<ActionType | undefined>;
  salarySettingListModalVisible: boolean;
  handleSalarySettingListModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SalarySettingList: React.FC<SalarySettingListProps> = (props) => {
  const { actionRef } = props;

  const [formValues, setFormValues] = useState<SalarySettingVO | SalarySettingForm>({});
  const [viewDrawerVisible, handleViewDrawerVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<SalarySettingVO[]>([]);

  const columns: ProColumns<SalarySettingVO>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
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
            <Divider type="vertical" />
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
        </FooterToolbar>
      )}

      {formValues && Object.keys(formValues).length ? (
        <>
          <ViewForm
            viewDrawerVisible={viewDrawerVisible}
            handleViewDrawerVisible={handleViewDrawerVisible}
            values={formValues}
            onClose={() => setFormValues({})}
          />
        </>
      ) : null}

    </>
  );
};

export default SalarySettingList;
