export type BeanInfo = {
  /** bean名称 */
  beanName?: string;
  /** bean对应的Class名 */
  className?: string;
  /** bean对应的所含有的方法 */
  methods?: MethodInfo[];
};

export type MethodInfo = {
  /** 方法名 */
  methodName?: string;
  /** 方法名（简易） */
  methodSimpleName?: string;
  /** 方法名（完全） */
  methodFullName?: string;
};
