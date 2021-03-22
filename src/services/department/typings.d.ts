export type DepartmentForm = {
  /** 主键ID */
  id?: number;
  /** 部门名称 */
  name?: string;
  /** 部门名称 */
  code?: string;
  /** 上级ID */
  pid?: number;
  /** 排序等级 */
  priority?: number;
};

export type DepartmentVO = {
  /** 主键ID */
  id?: number;
  /** 部门名称 */
  name?: string;
  /** 部门名称 */
  code?: string;
  /** 上级ID */
  pid?: number;
  /** 排序等级 */
  priority?: number;
  /** 下级部门 */
  children?: DepartmentVO[];
};
