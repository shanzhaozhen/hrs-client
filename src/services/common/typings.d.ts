export type ResponseBody<T> = {
  code: number;
  message?: string;
  data?: T;
  timestamp?: number;
};

export type LoginParams = {
  username?: string;
  password?: string;
  autoLogin?: boolean;
};

export type LoginResult = {
  code?: number;
  data?: string;
};

export type PageParams = {
  /** 关键字 */
  keyword?: string;
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};
