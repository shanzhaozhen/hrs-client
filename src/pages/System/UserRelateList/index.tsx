import React, {useEffect, useState} from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {Button, Divider, Drawer, Input, message, Popconfirm} from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { UserForm, UserVO } from '@/services/user/typings';
import { getUserById } from '@/services/user/user';
import { FooterToolbar } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from '@/pages/System/UserList/components/UpdateForm';
import CreateForm from '@/pages/System/UserList/components/CreateForm';
import type { RoleVO } from "@/services/role/typings";
import CheckBoxUser from "@/pages/System/UserRelateList/components/CheckBoxUser";
import type {Page, ResultBody} from "@/services/common/typings";
import type { PageParams } from "@/services/common/typings";
import type { SortOrder } from "antd/lib/table/interface";
import { getPageParams, tableFilter } from "@/utils/common";
import {getAllDepartments} from "@/services/department/department";

interface UserRelateListProps {
  userRelateListVisible: boolean;
  handleUserRelateListVisible: Dispatch<SetStateAction<boolean>>;
  userRelateActionRef: MutableRefObject<ActionType | undefined>;
  onCancel: () => void;
  handleBatchAddUserRelate: (selectRows: RoleVO[]) => void;
  handleDeleteUserRelate: (record: RoleVO) => void;
  handleBatchDeleteUserRelate: (selectRows: RoleVO[]) => void;
  queryList: (params: PageParams, sorter: Record<string, SortOrder>) => Promise<ResultBody<Page<UserVO>>>;
  values: RoleVO;
}

const UserRelateList: React.FC<UserRelateListProps> = (props) => {
  const {
    userRelateListVisible,
    userRelateActionRef: actionRef,
    handleBatchAddUserRelate,
    handleDeleteUserRelate,
    handleBatchDeleteUserRelate,
    onCancel,
    queryList,
    values
  } = props;

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [checkBoxUserVisible, handleCheckBoxUserVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [selectedRowsState, setSelectedRows] = useState<UserVO[]>([]);
  const [departmentList, setDepartmentList] = useState<any>();

  useEffect(() => {
    getAllDepartments()
      .then((res) => {
        if (res) {
          setDepartmentList(res);
        } else {
          setDepartmentList([]);
        }
      })
      .catch(() => {
        setDepartmentList([]);
      });
  }, []);

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
      title: '所属部门',
      dataIndex: 'depId',
      hideInSearch: true,
      valueType: 'select',
      renderText: (_, record) => (tableFilter(record.depId, departmentList, '未分配'))
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
                const { data } = await getUserById(record.id);
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
          <Popconfirm
            title="确定取消该用户与角色的关联关系？"
            onConfirm={() => (handleDeleteUserRelate(record))}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">取消关联</a>
          </Popconfirm>
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
      visible={userRelateListVisible}
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
          <Button type="primary" onClick={() => {
            handleCheckBoxUserVisible(true)
          }}>
            <PlusOutlined /> 已有用户
          </Button>,
        ]}
        request={async (params, sorter) => {
          const { data } = await queryList(getPageParams(params), sorter);
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
          <Button onClick={() => {
            handleBatchDeleteUserRelate(selectedRowsState);
          }}>批量取消关联</Button>
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
        handleBatchAddUserRelate={handleBatchAddUserRelate}
        values={values}
      />

    </Drawer>
  );
};

export default UserRelateList;
