import React, { useState, useRef } from 'react';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, message, Input, Drawer, Popconfirm, Divider, Modal} from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  getRegionById,
  batchDeleteRegion,
  deleteRegion,
  getRegionRootPage, getRegionChildrenById
} from '@/services/region/region';
import type { RegionVO } from '@/services/region/typings';
import type { RegionForm } from '@/services/region/typings';
import {getPageParams, getSortOrder} from "@/utils/common";
import type {DictionaryVO} from "@/services/dictionary/typings";

const RegionList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [regionData, setRegionData] = useState<RegionVO[]>([]);
  const [row, setRow] = useState<RegionVO>();
  const [selectedRowsState, setSelectedRows] = useState<RegionVO[]>([]);

  /**
   *  删除资源
   * @param selectedRows
   */
  const handleDelete = async () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的区域吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          await batchDeleteRegion(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<RegionVO>[] = [
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
      title: '区域编号',
      dataIndex: 'code',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '层级',
      dataIndex: 'level',
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
                const data = await getRegionById(record.id);
                setUpdateFormValues(data as RegionForm);
                handleUpdateModalVisible(true);
                // message.error(res.message || `没有获取到资源信息（id:${record.id}）`);
              } else {
                message.warn('没有选中有效的资源');
              }
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该资源节点?"
            onConfirm={async () => {
              if (record && record.id) {
                if (record.children && record.children.length > 0) {
                  message.warn('该资源节点存在子节点，删除已被拒绝');
                  return;
                }
                await deleteRegion(record.id);
                message.success('删除成功！');
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的资源');
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

  const updateRegionData = (list: DictionaryVO[], key: number | undefined, children: DictionaryVO[]): DictionaryVO[] => {
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
          children: updateRegionData(node.children, key, children),
        };
      }
      return node;
    });
  }

  const onLoadRegionChildren = async (expanded: boolean, record: DictionaryVO) => {
    if (expanded && record && record.id) {
      const data = await getRegionChildrenById(record.id);
      setRegionData(origin => updateRegionData(origin, record.id, data.map(item => ({ ...item, children: item.hasChildren ? [] : undefined }))));
    }
  }

  return (
    <PageContainer>
      <ProTable<RegionVO>
        headerTitle="资源管理"
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
        onExpand={onLoadRegionChildren}
        request={async (params, sort) => {
          const res = await getRegionRootPage(getPageParams(params), getSortOrder(sort));
          const data = res.records ? res.records.map(item => ({ ...item, children: item.hasChildren ? [] : undefined })) : []
          setRegionData(data);
          return {
            total: res.total,
          };
        }}
        dataSource={regionData}
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
        {row?.id && (
          <ProDescriptions<RegionVO>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default RegionList;
