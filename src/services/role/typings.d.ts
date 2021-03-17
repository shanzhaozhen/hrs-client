export type RoleForm = {
  /** 主键ID */
  id: number;
  /** 名称 */
  name: string;
  /** 角色代码 */
  code: string;
  /** 描述 */
  description?: string;
  /** 关联的菜单id */
  menuIds?: number[] | any;
  /** 关联的资源id */
  resourceIds?: number[];
};

export type RoleVO = {
  /** 主键ID */
  id?: number;
  /** 名称 */
  name?: string;
  /** 角色代码 */
  code?: string;
  /** 描述 */
  description?: string;
  /** 关联的路由id */
  routeIds?: number[];
  /** 关联的资源id */
  resourceIds?: number[];
};
