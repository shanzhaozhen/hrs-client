import React, { useEffect, useState } from 'react';
import { ProFormUploadButton, ProFormUploadDragger } from "@ant-design/pro-form";
import { download, getFileById } from "@/services/file/file";
import type { UploadListType } from "antd/es/upload/interface";
import type { UploadFile } from "antd/lib/upload/interface";
import proxy from "../../../config/proxy";
import type { UploadChangeParam } from "antd/lib/upload/interface";
import {downloadFile} from "@/utils/file";

interface CustomUploadProps {
  type: 'ProFormUploadDragger' | 'ProFormUploadButton';
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

  let targetUrl = proxy[REACT_APP_ENV || 'dev']['/hrs-api/'].target;
  targetUrl = targetUrl.substr(0, targetUrl.length - 1)

  useEffect(() => {
    if (value) {
      getFileById(value).then(({ data }) => {
        setFileList(data ? [{
          uid: data.id,
          name: data.name,
          status: 'done',
          url: targetUrl + data.urlPath
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
        action="/hrs-api/upload"
        fieldProps={{
          headers: {
            // @ts-ignore
            Authorization: localStorage.getItem('ACCESS_TOKEN'),
          },
          name: 'files',
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
