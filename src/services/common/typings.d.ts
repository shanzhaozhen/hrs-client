export type ResultBody<T> = {
  /** 业务状态码 */
  code?: number;
  /** 返回的信息 */
  message?: string;
  /** 返回的数据 */
  data?: T;
  /** 请求完成的时间 */
  timestamp?: number;
};

export type PageParams = {
  /** 关键字 */
  keyword?: string;
  /** 当前的页码 */
  current?: number;
  /** 分页大小 */
  pageSize?: number;
};

export type Page<T> = {
  records?: T[];
  total?: number;
  size?: number;
  current?: number;
  // orders?: OrderItem[];
  // optimizeCountSql?: boolean;
  // hitCount?: boolean;
  // countId?: string;
  // maxLimit?: number;
  // ascs?: T;
  // desc?: T;
  // searchCount?: boolean;
  // descs?: T;
  // asc?: T;
  // pages?: number;
};

export type OrderItem = {
  column?: string;
  asc?: boolean;
};

type Orders = {
  asc: string[];
  desc: string[];
}

export type LoginParams = {
  /** 用户名 */
  username?: string;
  /** 密码 */
  password?: string;
  /** 是否自动登陆 */
  autoLogin?: boolean;
};

export type LoginResult = {
  /** 返回的状态码 */
  code?: number;
  /** 返回的数据 */
  data?: string;
};

type BaseSearchForm = {
  keyword?: string;
  pageSize?: number;
  current?: number;
  orders?: OrderItem[];
  page?: PageUserDTO;
};
