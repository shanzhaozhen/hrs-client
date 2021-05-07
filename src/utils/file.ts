import { message } from "antd";

/**
 * 文件下载
 * @param data
 * @param fileName
 */
export const downloadFile = (data: BlobPart, fileName = new Date().getTime().toString()) => {
  if (data) {
    const blob = new Blob([data])
    if ('download' in document.createElement('a')) { // 非IE下载
      const lnk = document.createElement('a');
      lnk.download = fileName;
      lnk.style.display = 'none';
      lnk.href = URL.createObjectURL(blob);
      document.body.appendChild(lnk);
      lnk.click();
      URL.revokeObjectURL(lnk.href); // 释放URL 对象
      document.body.removeChild(lnk);
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName);
    }
  } else {
    message.error('文件下载失败').then();
  }
}
