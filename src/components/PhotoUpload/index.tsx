import React, {useEffect, useState} from 'react';
import styles from './PhotoUpload.less';
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {getFileById} from "@/services/file/file";
import {targetUrlNotDiagonal} from "@/utils/common";
import type { UploadChangeParam } from "antd/lib/upload/interface";

interface PhotoUploadProps {
  value?: any;
  onChange?: (value: any) => void;
  readonly?: boolean;
}

const PhotoUpload: React.FC<PhotoUploadProps> = (props) => {
  const { value, onChange, readonly } = props

  const [photoUrl, setPhotoUrl] = useState<string>('')

  useEffect(() => {
    if (value) {
      getFileById(value).then(({ data }) => {
        setPhotoUrl(data ? targetUrlNotDiagonal + data.urlPath : '')
      });
    }
  }, []);

  const onUploadChange = (info: UploadChangeParam) => {
    if (!info.event && info.fileList[0].response) {
      const { data } = info.fileList[0].response;
      if (data && data.length > 0) {
        setPhotoUrl(targetUrlNotDiagonal + data[0].urlPath);
        onChange?.(data[0].id);
      }
    }

  };

  return (
    <>
      <div className={styles.avatar_box}>
        {
          photoUrl ? (
            <div className={styles.photo}>
              <img src={photoUrl || 'http://localhost:8080/files/2021-04-24/3c1aa23d-9030-4998-9d7c-d8f9cfebd2c7.png'} alt="avatar" />
            </div>
          ) : (
            <div className={styles.no_photo}>
              无照片
            </div>
          )
        }
        <Upload
          disabled={readonly}
          showUploadList={false}
          action="/hrs-api/upload"
          headers={{
            Authorization: localStorage.getItem('ACCESS_TOKEN') || '',
          }}
          name="files"
          maxCount={1}
          onChange={onUploadChange}
        >
          {
            !readonly && (
              <div className={styles.button_view}>
                <Button>
                  <UploadOutlined />
                  更改照片
                </Button>
              </div>
            )
          }
        </Upload>
      </div>
    </>
  );
};

export default PhotoUpload;
