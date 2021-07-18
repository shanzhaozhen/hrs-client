import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import type {DraggerProps} from "antd/lib/upload";

interface ImportModalProps {
  title?: string
  visible: boolean;
  handleVisible: Dispatch<SetStateAction<boolean>>;
  haveTemplate?: boolean;
  downloadTemplate?: () => void;
  uploadTitle?: string;
  description?: string;
  uploadProps: DraggerProps;
}

const ImportModal: React.FC<ImportModalProps> = (props) => {
  const { title, visible, handleVisible, haveTemplate, downloadTemplate, uploadProps } = props;

  return (
    <Modal
      title={title || '导入'}
      visible={visible}
      onCancel={() => handleVisible(false)}
      destroyOnClose
      footer={null}
    >
      { haveTemplate && (
        <div style={{
          textAlign: "right",
          marginBottom: 15
        }}>
          <a href="#" onClick={downloadTemplate}>
            点击下载
          </a>
          导入模板
        </div>
      ) }
      {/* <ProFormUploadDragger
        {...uploadProps}
      /> */}

      <Dragger
        { ...uploadProps }
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{ props.uploadTitle || '单击或拖动文件到此区域进行上传' }</p>
        <p className="ant-upload-hint">{ props.description || '支持单次或批量上传' }</p>
      </Dragger>
      <div style={{ marginBottom: 15 }} />
    </Modal>
  );
};

export default ImportModal;
