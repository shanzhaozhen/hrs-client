export type ResourceForm = {
  /** 主键ID */
  id: number;
  /** 权限名称 */
  name: string;
  /** 资源路由 */
  path?: string;
  /** 资源类型 */
  type?: number;
  /** 上级ID */
  pid?: number;
  /** 排序等级 */
  priority?: number;
  /** 支持Get请求 */
  supportGet?: boolean;
  /** 资源描述 */
  description?: string;
};

export type ResourceVO = {
  /** 主键ID */
  id?: number;
  /** 资源名称 */
  name?: string;
  /** 资源路由 */
  path?: string;
  /** 资源类型 */
  type?: number;
  /** 上级ID */
  pid?: number;
  /** 排序等级 */
  priority?: number;
  /** 支持Get请求 */
  supportGet?: boolean;
  /** 支持Post请求 */
  supportPost?: boolean;
  /** 支持Put请求 */
  supportPut?: boolean;
  /** 支持Delete请求 */
  supportDelete?: boolean;
  /** 支持Patch请求 */
  supportPatch?: boolean;
  /** 资源描述 */
  description?: string;
  roles?: RoleVO[];
  children?: ResourceVO[];
  /** 创建人 */
  createdBy?: number;
  /** 创建时间 */
  createdDate?: string;
  /** 修改人 */
  lastModifiedBy?: number;
  /** 修改时间 */
  lastModifiedDate?: string;
};
