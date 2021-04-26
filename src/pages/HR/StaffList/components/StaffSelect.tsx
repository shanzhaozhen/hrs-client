import React, {useEffect, useRef, useState} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Input, message, Modal } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPageParams, getSortOrder, tableFilter } from "@/utils/common";
import { getAllDepartments } from "@/services/department/department";
import type { StaffVO } from "@/services/staff/typings";
import { getStaffPage } from "@/services/staff/staff";

interface StaffSelectProps {
  staffSelectVisible: boolean;
  handleStaffSelectVisible: Dispatch<SetStateAction<boolean>>;
  setSelectStaffValues: Dispatch<SetStateAction<StaffVO>>;
}

const StaffSelect: React.FC<StaffSelectProps> = (props) => {
  const { staffSelectVisible, handleStaffSelectVisible, setSelectStaffValues } = props;

  const actionRef = useRef<ActionType>();
  const [departmentList, setDepartmentList] = useState<any>();

  useEffect(() => {
    getAllDepartments()
      .then(({ data }) => {
        setDepartmentList(data || []);
      })
      .catch(() => {
        setDepartmentList([]);
      });
  }, []);

  const columns: ProColumns<StaffVO>[] = [
    {
      title: '关键字',
      key: 'keyword',
      hideInTable: true,
      hideInForm: true,
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
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
      renderText: (_, record) => (tableFilter(record.depId, departmentList, '未分配'))
    },
    {
      title: '员工编号',
      dataIndex: 'nickname',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                setSelectStaffValues(record);
              } else {
                message.warn('没有选中有效的用户');
              }
            }}
          >
            选择
          </a>
        </>
      ),
    },
  ];

  return (
    <Modal
      title="员工选择"
      width={820}
      visible={staffSelectVisible}
      onCancel={() => {
        handleStaffSelectVisible(false);
        actionRef.current?.clearSelected?.();
      }}
      footer={null}
    >
      <ProTable<StaffVO>
        actionRef={actionRef}
        rowKey="id"
        cardBordered
        bordered={true}
        search={{
          labelWidth: 120,
        }}
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
      />
    </Modal>
  );
};

export default StaffSelect;
