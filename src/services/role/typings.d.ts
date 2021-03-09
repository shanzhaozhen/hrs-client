export type RoleForm = {
  /** 主键ID */
  id: number;
  /** 名称 */
  name: string;
  /** 标识名称 */
  identification: string;
  /** 描述 */
  description?: string;
  /** 关联的菜单id */
  menuIds?: number[];
  /** 关联的资源id */
  resourceIds?: number[];
};

export type RoleVO = {
  /** 主键ID */
  id?: number;
  /** 名称 */
  name?: string;
  /** 标识名称 */
  identification?: string;
  /** 描述 */
  description?: string;
  /** 关联的路由id */
  routeIds?: number[];
  /** 关联的资源id */
  resourceIds?: number[];
};
