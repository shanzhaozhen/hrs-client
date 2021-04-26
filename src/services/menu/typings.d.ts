import type { RoleVO } from '@/services/role/typings';

export type MenuForm = {
  /** 主键ID */
  id?: number;
  /** 菜单名称 */
  name?: string;
  /** 菜单路由 */
  path?: string;
  /** 上级ID */
  pid?: number;
  /** 重定向路径 */
  redirect?: string;
  /** 显示名称 */
  title?: string;
  /** 图标 */
  icon?: string;
  /** 排序等级 */
  priority?: number;
  /** 菜单是否隐藏 */
  hidden?: boolean;
  /** 菜单是否总是显示 */
  alwaysShow?: boolean;
  /** 是否需要缓存 */
  noCache?: boolean;
  /** 固钉 */
  affix?: boolean;
  /** 面包屑 */
  breadcrumb?: boolean;
  /** 参数 */
  props?: string;
  /** 菜单描述 */
  description?: string;
};

export type MenuVO = {
  /** 主键ID */
  id?: number;
  /** 菜单名称 */
  name?: string;
  /** 菜单名称（本地化） */
  locale?: string;
  /** 菜单路径 */
  path?: string;
  /** 上级ID */
  pid?: number;
  /** 图标 */
  icon?: string;
  /** 排序等级 */
  priority?: number;
  /** 菜单是否隐藏 */
  hideInMenu?: boolean;
  /** 隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /** 参数 */
  props?: string;
  /** 菜单描述 */
  description?: string;
  /** 关联的角色 */
  roleVOList?: RoleVO[];
  /** 下级菜单 */
  children?: MenuVO[];
};
