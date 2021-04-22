import React, {useEffect, useState} from 'react';
import {ProFormUploadButton, ProFormUploadDragger} from "@ant-design/pro-form";
import {download, getFileById, upload} from "@/services/file/file";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import type { UploadListType } from "antd/es/upload/interface";
import type { UploadFile } from "antd/lib/upload/interface";
import {DownloadOutlined} from "@ant-design/icons";
import proxy from "../../../config/proxy";

interface RegionSelectProps {
  type: 'ProFormUploadDragger' | 'ProFormUploadButton';
  label?: string;
  name?: string;
  readonly?: boolean;
  max?: number;
  value?: any;
  listType: UploadListType,
  onChange?: (value: any) => void;
}

const CustomUpload: React.FC<RegionSelectProps> = (props) => {
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
      getFileById(value).then(res => {
        setFileList([{
          uid: res.id,
          name: res.name,
          url: targetUrl + res.urlPath
        }])
      });
    }
  }, [])

  const customRequest = async (data: RcCustomRequestOptions) => {
    console.log(data)
    const { onSuccess } = data
    const fileData = new FormData();
    fileData.append('files', data.file)
    // delete options.headers['Content-Type'];
    const res = await upload(fileData);
    console.log(res)
  }

  const onChangeUpload = (data, bbb) => {
    console.log(data)
    console.log(bbb)
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
      <FormComponents
        label={props.label}
        name={props.name}
        max={props.max}
        readonly={props.readonly}
        onChange={onChangeUpload}
        fieldProps={{
          listType: 'picture',
          fileList,
          customRequest,
          onPreview,
        }}
      />
    </>
  );
};


export default CustomUpload;
