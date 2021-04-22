export type FileVO = {
  /** 主键ID */
  id?: number;
  /** 文件名称 */
  name?: string;
  /** 文件后缀 */
  suffix?: string;
  /** 文件类型 */
  type?: string;
  /** 文件路径 */
  path?: string;
  /** 访问路径 */
  urlPath?: string;
  /** md5 */
  md5?: string;
  /** 文件分组 */
  group?: number;
  /** 创建人 */
  createdBy?: number;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改时间 */
  lastModifiedDate?: string;
};
