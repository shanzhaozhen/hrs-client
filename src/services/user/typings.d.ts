export type CurrentUser = {
  userInfo?: UserInfo;
  role?: Role[];
  asyncRoutes?: AsyncRoute[];
};

export type UserInfo = {
  name?: string;
  nickname?: string;
  avatar?: string;
  introduction?: string;
};

export type Role = {
  id: number;
  identification: string;
  name: string;
};

export type AsyncRoute = {};

export type UserListItem = {
  id?: number;
  disabled?: boolean;
  href?: string;
  avatar?: string;
  name?: string;
  owner?: string;
  desc?: string;
  callNo?: number;
  status?: number;
  updatedAt?: string;
  createdAt?: string;
  progress?: number;
};

export type UserList = {
  data?: UserListItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};
