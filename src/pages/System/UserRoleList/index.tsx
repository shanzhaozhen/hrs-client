import React, { useRef, useState } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Button, Divider, Drawer, Input, message } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { UserForm, UserVO } from '@/services/user/typings';
import { deleteUser, getUserByUserId } from '@/services/user/user';
import { FooterToolbar } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from '@/pages/System/UserList/components/UpdateForm';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from '@/pages/System/UserList/components/CreateForm';
import type { RoleVO } from "@/services/role/typings";
import { getSortOrder } from "@/utils/common";
import CheckBoxUser from "@/pages/System/UserRoleList/components/CheckBoxUser";
import { getUserRolePage } from "@/services/user-role/user";

interface UserRoleListProps {
  userRoleListVisible: boolean;
  handleUserRoleListVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
  onCancel: () => void;
  values: RoleVO;
}

/**
 *  取消关联
 * @param selectedRows
 */
const handleCancelRelation = async (selectedRows: UserVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const UserRoleList: React.FC<UserRoleListProps> = (props) => {
  const { userRoleListVisible,
    // handleUserRoleListVisible,
    onCancel, values } = props;

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [checkBoxUserVisible, handleCheckBoxUserVisible] = useState<boolean>(false);
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
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                await handleCancelRelation([record]);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的用户');
              }
            }}
          >
            取消关联
          </a>
        </>
      ),
    },
  ];

  return (
    <Drawer
      title="角色分配"
      placement="right"
      width={820}
      zIndex={500}
      onClose={onCancel}
      visible={userRoleListVisible}
    >
      <ProTable<UserVO>
        actionRef={actionRef}
        rowKey="id"
        cardBordered
        bordered={true}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建用户
          </Button>,
          <Button type="primary" onClick={() => handleCheckBoxUserVisible(true)}>
            <PlusOutlined /> 已有用户
          </Button>,
        ]}
        request={async (params, sorter) => {
          const data = await getUserRolePage(params, values.id, getSortOrder(sorter));
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
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleCancelRelation(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        tableActionRef={actionRef}
      />
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          updateModalVisible={updateModalVisible}
          handleUpdateModalVisible={handleUpdateModalVisible}
          values={updateFormValues}
          onCancel={() => setUpdateFormValues({})}
          tableActionRef={actionRef}
        />
      ) : null}
      <CheckBoxUser
        checkBoxUserVisible={checkBoxUserVisible}
        handleCheckBoxUserVisible={handleCheckBoxUserVisible}
        values={values}
        tableActionRef={actionRef}
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
    </Drawer>
  );
};

export default UserRoleList;
