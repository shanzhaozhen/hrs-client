import React, { useRef, useState } from 'react';
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
import type { DictionaryForm, DictionaryVO } from '@/services/dictionary/typings';
import {getPageParams, getSortOrder} from "@/utils/common";

const DictionaryList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [dictionaryData, setDictionaryData] = useState<DictionaryVO[]>([]);
  const [currentRow, setCurrentRow] = useState<DictionaryVO>();
  const [selectedRowsState, setSelectedRows] = useState<DictionaryVO[]>([]);

  /**
   *  删除字典
   */
  const handleDelete = async () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的字典吗',
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
          <Divider type="vertical" />
          <a
            onClick={async () => {
              setUpdateFormValues({ pid: record.id } as DictionaryForm);
              handleCreateModalVisible(true);
            }}
          >
            添加下级
          </a>
        </>
      ),
    },
  ];

  const updateDictionaryData = (list: DictionaryVO[], key: number | undefined, children: DictionaryVO[]): DictionaryVO[] => {
    return list.map(node => {
      if (node.id === key) {
        if (children && children.length > 0) {
          return {
            ...node,
            children,
          };
        }
        return {
          ...node,
          children: undefined
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateDictionaryData(node.children, key, children),
        };
      }
      return node;
    });
  }

  const onLoadDictionaryChildren = async (expanded: boolean, record: DictionaryVO) => {
    if (expanded && record && record.id) {
      const data = await getDictionaryChildrenById(record.id);
      setDictionaryData(origin => updateDictionaryData(origin, record.id, data.map(item => ({ ...item, children: item.hasChildren ? [] : undefined }))));
    }
  }

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
        onExpand={onLoadDictionaryChildren}
        request={async (params, sort) => {
          const res = await getDictionaryRootPage(getPageParams(params), getSortOrder(sort));
          const data = res.records ? res.records.map(item => ({ ...item, children: item.hasChildren ? [] : undefined })) : []
          setDictionaryData(data)
          return {
            total: res.total
          };
        }}
        dataSource={dictionaryData}
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
          <Button onClick={handleDelete}>批量删除</Button>
        </FooterToolbar>
      )}
      <CreateForm
        createModalVisible={createModalVisible}
        handleCreateModalVisible={handleCreateModalVisible}
        values={updateFormValues}
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
        visible={!!currentRow}
        onClose={() => {
          setCurrentRow(undefined);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<DictionaryVO>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default DictionaryList;
