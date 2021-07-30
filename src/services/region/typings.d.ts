export type RegionForm = {
  /** 主键ID */
  id: number;
  /** 父级ID */
  pid?: number;
  /** 区域名称 */
  name: string;
  /** 区域编码 */
  code: string;
  /** 层级 */
  level: number;
};

export type RegionVO = {
  /** 主键ID */
  id?: number;
  /** 父级ID */
  pid?: number;
  /** 区域名称 */
  name?: string;
  /** 区域编码 */
  code?: string;
  /** 层级 */
  level?: number;
  /** 下级区域 */
  children?: RegionVO[];
  /** 是否有子成员 */
  hasChildren?: boolean;
  /** 创建人 */
  createdBy?: string;
  /** 创建人名称 */
  createdByName?: string;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改人名称 */
  lastModifiedByName?: string;
  /** 修改时间 */
  lastModifiedDate?: string;
};

export type RegionType = {
  /** 省 */
  province?: string;
  /** 市 */
  city?: string;
  /** 区 */
  area?: string;
  /** 详细地址 */
  detail?: string;
};
