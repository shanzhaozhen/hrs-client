import React, { useRef, useState } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Drawer, Input, message, Modal, Space } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { UserForm, UserVO } from '@/services/user/typings';
import { getUserByUserId, getUserPage } from '@/services/user/user';
import ProDescriptions from '@ant-design/pro-descriptions';
import { getSortOrder } from "@/utils/common";
import type { RoleVO } from "@/services/role/typings";

interface CheckBoxUserProps {
  checkBoxUserVisible: boolean;
  handleCheckBoxUserVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  values?: RoleVO;
}

const CheckBoxUser: React.FC<CheckBoxUserProps> = (props) => {
  const { checkBoxUserVisible, handleCheckBoxUserVisible, values } = props;

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<UserVO[]>([]);

  const columns: ProColumns<UserVO>[] = [
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
      title: '用户名',
      dataIndex: 'username',
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
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
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
                const data = await getUserByUserId(record.id);
                setUpdateFormValues(data as UserForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到用户信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的用户');
              }
            }}
          >
            添加
          </a>
        </>
      ),
    },
  ];

  return (
    <Modal
      title="用户选择"
      width={820}
      visible={checkBoxUserVisible}
      onCancel={() => {
        handleCheckBoxUserVisible(false);
      }}
    >
      <ProTable<UserVO>
        actionRef={actionRef}
        rowKey="id"
        cardBordered
        bordered={true}
        search={{
          labelWidth: 120,
        }}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
          return (
            <Space size={16}>
              <a onClick={onCleanSelected}>取消选择</a>
              <a>批量添加</a>
            </Space>
          );
        }}
        request={async (params, sorter) => {
          const data = await getUserPage(params, getSortOrder(sorter));
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data: data.records,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data.total,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<UserVO>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </Modal>
  );
};

export default CheckBoxUser;
