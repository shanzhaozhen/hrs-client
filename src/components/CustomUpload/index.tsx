import React, {useEffect, useState} from 'react';
import {ProFormUploadButton, ProFormUploadDragger} from "@ant-design/pro-form";
import {download, getFileById, upload} from "@/services/file/file";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import type { UploadListType } from "antd/es/upload/interface";
import type { UploadFile } from "antd/lib/upload/interface";
import {DownloadOutlined} from "@ant-design/icons";
import proxy from "../../../config/proxy";
import {request} from "umi";

interface RegionSelectProps {
  type: 'ProFormUploadDragger' | 'ProFormUploadButton';
  label?: string;
  name?: string;
  description?: string;
  readonly?: boolean;
  max?: number;
  maxCount?: number;
  value?: any;
  listType: UploadListType,
  onChange?: (value: any) => void;
}

const CustomUpload: React.FC<RegionSelectProps> = (props) => {
  const { type, maxCount, value, onChange } = props;

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
      getFileById(value).then(res => {
        setFileList([{
          uid: res.id,
          name: res.name,
          status: 'done',
          url: targetUrl + res.urlPath
        }])
      });
    }
  }, [])

  const customRequest = async (options: RcCustomRequestOptions) => {
    console.log(options)

    const timestamp = new Date().getTime();

    setFileList(origins => {
      if (maxCount && maxCount > 1) {
        return [...origins, {
          uid: timestamp,
          name: options.filename,
          status: 'uploading',
          percent: 0
        }]
      }
      return [{
        uid: timestamp,
        name: options.filename,
        status: 'uploading',
        percent: 0
      }]
    })

    const fileData = new FormData();
    fileData.append('files', options.file)
    // delete options.headers['Content-Type'];
    const data = await upload(fileData);

    console.log(data)

    setFileList(origins => {
      return origins.map(item => {
        if (item.id === timestamp) {
          return {
            ...item,
            uid: item.id,
            name: item.name,
            status: 'done',
          }
        }
        return { ...item }
      })
    })

    if (options.onSuccess) {
      options.onSuccess(data, options.file);
    }

    // setFileList(
    //   data.map(item => ({
    //   uid: item.id,
    //   name: item.name,
    //   status: 'done',
    // })))

    console.log(data)
  }

  const onChangeUpload = (data) => {
    console.log(data)
  }

  const onPreview = async (file: UploadFile) => {
    download(file.uid).then(data => {
      const blob = new Blob([data])
      if ('download' in document.createElement('a')) { // 非IE下载
        const lnk = document.createElement('a')
        lnk.download = file.name
        lnk.style.display = 'none'
        lnk.href = URL.createObjectURL(blob)
        document.body.appendChild(lnk)
        lnk.click()
        URL.revokeObjectURL(lnk.href) // 释放URL 对象
        document.body.removeChild(lnk)
      } else { // IE10+下载
        navigator.msSaveBlob(blob, file.name)
      }
    })
  };

  return (
    <>
      <ProFormUploadDragger
        action={`${targetUrl}/upload`}
        fieldProps={{
          method: "POST",
          maxCount: props.maxCount,
          onChange: onChangeUpload,
          onPreview,
        }} />
      <FormComponents
        label={props.label}
        name={props.name}
        description={props.description}
        max={props.max}
        readonly={props.readonly}
        onChange={onChangeUpload}
        fieldProps={{
          listType: 'picture',
          fileList,
          maxCount: props.maxCount,
          customRequest,
          onPreview,
        }}
      />
    </>
  );
};

export default CustomUpload;
