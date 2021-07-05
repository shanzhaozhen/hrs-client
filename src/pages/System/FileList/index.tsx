import React, {useRef, useState} from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Modal } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { download, getFilePage } from '@/services/file/file';
import type { FileVO } from '@/services/file/typings';
import { getPageParams, getSortOrder } from "@/utils/common";
import { downloadFile } from "@/utils/file";

const FileList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<FileVO[]>([]);

  /**
   * 批量删除文件
   */
  const handleDeleteFile = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除勾选中的文件吗',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRowsState) return true;
        try {
          // todo: 删除文件，先判断有没有其他文件利用，没有的话删除实际文件和文件记录
          // await batchDeleteFile(selectedRowsState.map((selectedRow) => selectedRow.id));
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

  const columns: ProColumns<FileVO>[] = [
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
      title: '文件名称',
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
      title: '文件后缀',
      dataIndex: 'suffix',
      valueType: 'text',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '文件路径',
      dataIndex: 'path',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '访问路径',
      dataIndex: 'urlPath',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '上传时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
      sorter: true,
      defaultSortOrder: 'descend',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '创建人',
      dataIndex: 'createdBy',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (text, record) => (
        <>
          <a
            onClick={async () => {
              if (record && record.id) {
                const hide = message.loading('正在下载');
                const data = await download(record.id);
                downloadFile(data, record.name);
                hide();
                message.success('文件下载成功！')
                actionRef.current?.reloadAndRest?.();
              } else {
                message.warn('没有选中有效的文件');
              }
            }}
          >
            下载
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (record && record.id) {
                // await getFileByFileId(record.id);
              } else {
                message.warn('没有选中有效的文件');
              }
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<FileVO>
        headerTitle="文件管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={async (params, sorter) => {
          const { data } = await getFilePage(getPageParams(params), getSortOrder(sorter));
          if (data) {
            return {
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              data: data.records,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: data.total,
            };
          }
          return {
            success: true,
            data: [],
            // 不传会使用 data 的长度，如果是分页一定要传
            total: 0,
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
          <Button onClick={handleDeleteFile}>批量删除</Button>
        </FooterToolbar>
      )}

    </PageContainer>
  );
};

export default FileList;
