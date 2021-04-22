import React, {useEffect, useState} from 'react';
import {ProFormUploadButton, ProFormUploadDragger} from "@ant-design/pro-form";
import {download, getFileById, upload} from "@/services/file/file";
import type {UploadRequestOption as RcCustomRequestOptions} from "rc-upload/lib/interface";
import type {UploadListType} from "antd/es/upload/interface";
import {UploadFile} from "antd/lib/upload/interface";

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


  useEffect(() => {
    console.log(value)

    if (value) {
      getFileById(value).then(res => {
        console.log(res)
        setFileList([{
          uid: res.id,
          name: res.name,
          size: null,
          linkProps: '{"download": "image"}',
          url: res.urlPath
        }])
      });
    }
  }, [])

  const customRequest = async (data: RcCustomRequestOptions) => {
    console.log(data)
    const fileData = new FormData();
    fileData.append('files', data.file)
    // delete options.headers['Content-Type'];
    const res = await upload(fileData);
    console.log(res)
  }

  const onDownload = async (file: UploadFile) => {
    download(file.uid).then(res => {
      console.log(res)
      const blob = new Blob([res]);
      const objectURL = URL.createObjectURL(blob);
      let btn = document.createElement('a');
      btn.download = '文件名.pdf';
      btn.href = objectURL;
      btn.click();
      URL.revokeObjectURL(objectURL);
      btn = null;
    })
  };

  return (
    <>
      <FormComponents
        label={props.label}
        name={props.name}
        max={props.max}
        readonly={props.readonly}
        fieldProps={{
          // listType: 'picture',
          fileList,
          showUploadList: {
            showDownloadIcon: true
          },
          customRequest,
          onDownload,
        }}
      />
    </>
  );
};


export default CustomUpload;
