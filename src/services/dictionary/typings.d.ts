export type DictionaryForm = {
  /** 主键ID */
  id?: number;
  /** 字典名称 */
  name?: string;
  /** 字典编码 */
  code?: string;
  /** 上级ID */
  pid?: number;
  /** 排序等级 */
  priority?: number;
  /** 字典描述 */
  description?: string;
};

export type DictionaryVO = {
  /** 主键ID */
  id?: number;
  /** 字典名称 */
  name?: string;
  /** 字典编码 */
  code?: string;
  /** 上级ID */
  pid?: number;
  /** 排序等级 */
  priority?: number;
  /** 字典描述 */
  description?: string;
  /** 子成员 */
  children?: DictionaryVO[];
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
