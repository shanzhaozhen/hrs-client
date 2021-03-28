import React, {useRef, useState} from 'react';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, Input, message, Modal, Popconfirm} from 'antd';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  batchDeleteDictionary,
  deleteDictionary,
  getDictionaryById,
  getDictionaryChildrenById,
  getDictionaryRootPage
} from '@/services/dictionary/dictionary';
import type {DictionaryForm, DictionaryVO} from '@/services/dictionary/typings';


const DictionaryList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<DictionaryVO>();
  const [
    selectedRowsState,
    // setSelectedRows
  ] = useState<DictionaryVO[]>([]);
  const [childrenDictionary, setChildrenDictionary] = useState<any>({});

  /**
   *  删除字典
   */
  const handleDelete = async () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的用户吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteDictionary(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<DictionaryVO>[] = [
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
      title: '名称',
      dataIndex: 'name',
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
      title: '字典编码',
      dataIndex: 'code',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '排序等级',
      dataIndex: 'priority',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '字典描述',
      dataIndex: 'description',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
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
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                const data = await getDictionaryById(record.id);
                setUpdateFormValues(data as DictionaryForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到字典信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的字典');
              }
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该字典节点?"
            onConfirm={async () => {
              if (record && record.id) {
                if (record.children && record.children.length > 0) {
                  message.warn('该字典节点存在子节点，删除已被拒绝');
                  return;
                }
                await deleteDictionary(record.id);
                message.success('删除成功！');
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的字典');
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleExpand = async (expanded: boolean, record: DictionaryVO) => {
    if (expanded && record && record.id) {
      const data = await getDictionaryChildrenById(record.id);
      setChildrenDictionary({
        ...childrenDictionary,
        [record.id]: data
      })
    }
  }

  const expandedRowRender = (record: DictionaryVO) => {
    return (
      (record.id && childrenDictionary[record.id] && childrenDictionary[record.id].length > 0) ? (
        <ProTable
          key={record.id}
          rowKey="id"
          columns={columns}
          headerTitle={false}
          search={false}
          options={false}
          dataSource={childrenDictionary[record.id]}
          pagination={false}
          // showHeader={false}
          expandedRowRender={expandedRowRender}
          onExpand={handleExpand}
        />
      ) : (
        <p style={{textAlign: "center"}}>（无子节点）</p>
      )
    );
  };


  return (
    <PageContainer>
      <ProTable<DictionaryVO>
        headerTitle="字典管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        expandedRowRender={expandedRowRender}
        onExpand={handleExpand}
        request={async (params) => {
          const { records } = await getDictionaryRootPage(params);
          return {
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            data: records || [],
            // 不传会使用 data 的长度，如果是分页一定要传
            total: (records && records.length) || 0,
          };
        }}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button onClick={handleDelete}>批量删除</Button>
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

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<DictionaryVO>
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
    </PageContainer>
  );
};

export default DictionaryList;