export type TaskForm = {
  /** 主键ID */
  id: number;
  /** 名称 */
  name: string;
  /** cron表达式 */
  cron: string;
  /** 注册在容器的bean名称 */
  beanName?: string;
  /** 对应的方法信息 */
  methodInfo?: string;
  /** 参数 */
  paramInfo?: string;
  /** 开启状态 */
  open: boolean;
  /** 描述 */
  description?: string;
};

export type TaskVO = {
  /** 主键ID */
  id?: number;
  /** 名称 */
  name?: string;
  /** cron表达式 */
  cron?: string;
  /** 注册在容器的bean名称 */
  beanName?: string;
  /** 对应的方法信息 */
  methodInfo?: string;
  /** 参数 */
  paramInfo?: string;
  /** 开启状态 */
  open?: boolean;
  /** 描述 */
  description?: string;
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
