import React, { useEffect, useState } from 'react';
import { ProFormUploadButton, ProFormUploadDragger } from "@ant-design/pro-form";
import { download, getFileById } from "@/services/file/file";
import type { UploadListType } from "antd/es/upload/interface";
import type { UploadFile } from "antd/lib/upload/interface";
import type { UploadChangeParam } from "antd/lib/upload/interface";
import {downloadFile} from "@/utils/file";
import { targetUrlNotDiagonal } from "@/utils/common";

interface CustomUploadProps {
  type: 'ProFormUploadDragger' | 'ProFormUploadButton';
  action?: string;
  paramName?: string;
  label?: string;
  name?: string;
  description?: string;
  readonly?: boolean;
  max?: number;
  maxCount?: number;
  value?: any;
  listType?: UploadListType,
  onChange?: (value: any) => void;
}

const CustomUpload: React.FC<CustomUploadProps> = (props) => {
  const { type, value, onChange } = props;

  const [fileList, setFileList] = useState<any[]>([])

  const Components = {
    ProFormUploadDragger,
    ProFormUploadButton,
  };
  const FormComponents = Components[type];

  useEffect(() => {
    if (value) {
      getFileById(value).then(({ data }) => {
        setFileList(data ? [{
          uid: data.id,
          name: data.name,
          status: 'done',
          url: targetUrlNotDiagonal + data.urlPath
        }] : [])
      });
    }
  }, [])

  const onUploadChange = (info: UploadChangeParam) => {
    // console.log("onUploadChange: ", info);
    if (!info.event) {
      let uploadValue;
      setFileList(info.fileList.map(item => {
        if (item.status === 'done') {
          const { data } = item.response;
          uploadValue = data[0].id;
          return {
            ...item,
            uid: data[0].id,
            // url: `/hrs-api/download?fileId=${data[0].id}`
          };
        }
        return item;
      }));
      onChange?.(uploadValue);
    }
  };

  const onPreview = async (file: UploadFile) => {
    download(file.uid).then(data => {
      downloadFile(data, file.name);
    })
  };

  return (
    <>
      <FormComponents
        label={props.label}
        name={props.name}
        description={props.description}
        max={props.max}
        readonly={props.readonly}
        disabled={props.readonly}
        action={props.action || '/hrs-api/upload'}
        fieldProps={{
          headers: {
            Authorization: localStorage.getItem('ACCESS_TOKEN') || '',
          },
          name: props.paramName || 'files',
          listType: props.listType,
          // defaultFileList,
          fileList,
          maxCount: props.maxCount,
          // customRequest,
          onPreview,
          onChange: onUploadChange
        }}
      />
    </>
  );
};

export default CustomUpload;
