// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResultBodyObject = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: Record<string, any>;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type UserForm = {
    /** 主键ID */
    id: number;
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 账户是否过期,过期无法验证 */
    accountNonExpired?: boolean;
    /** 指定用户是否被锁定或者解锁,锁定的用户无法进行身份验证 */
    accountNonLocked?: boolean;
    /** 指示是否已过期的用户的凭据(密码),过期的凭据防止认证 */
    credentialsNonExpired?: boolean;
    /** 是否被禁用,禁用的用户不能身份验证 */
    enabled?: boolean;
    /** 姓名 */
    name?: string;
    /** 昵称 */
    nickname?: string;
    /** 性别 */
    sex?: number;
    /** 生日 */
    birthday?: string;
    /** 头像 */
    avatar?: string;
    /** 邮箱 */
    email?: string;
    /** 手机号码 */
    phoneNumber?: string;
    /** 地址编号 */
    addressCode?: string;
    /** 详细地址 */
    detailedAddress?: string;
    /** 个人介绍 */
    introduction?: string;
    /** 关联的角色id */
    roleIds?: number[];
  };

  type ResultBodyLong = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: number;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type DynamicScheduledTaskForm = {
    /** 创建人 */
    createdBy?: number;
    /** 创建时间 */
    createdDate?: string;
    /** 修改人 */
    lastModifiedBy?: number;
    /** 修改时间 */
    lastModifiedDate?: string;
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

  type RouteForm = {
    /** 主键ID */
    id: number;
    /** 权限名称 */
    name: string;
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

  type RoleForm = {
    /** 主键ID */
    id: number;
    /** 名称 */
    name: string;
    /** 标识名称 */
    identification: string;
    /** 描述 */
    description?: string;
    /** 关联的路由id */
    routeIds?: number[];
    /** 关联的资源id */
    resourceIds?: number[];
  };

  type ResourceForm = {
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

  type RegionForm = {
    /** 主键ID */
    id: number;
    /** 父级ID */
    pid?: number;
    /** 区域名称 */
    name: string;
    /** 区域编码 */
    code: string;
    /** 层级 */
    level: number;
  };

  type BaseSearchForm = {
    keyword?: string;
    pageSize?: number;
    current?: number;
    orders?: OrderItem[];
    page?: PageUserDTO;
  };

  type GrantedAuthority = {
    authority?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageUserDTO = {
    records?: UserDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    hitCount?: boolean;
    countId?: string;
    maxLimit?: number;
    ascs?: PageUserDTO;
    desc?: PageUserDTO;
    searchCount?: boolean;
    descs?: PageUserDTO;
    asc?: PageUserDTO;
    pages?: number;
  };

  type ResourceDTO = {
    /** 创建人 */
    createdBy?: number;
    /** 创建时间 */
    createdDate?: string;
    /** 修改人 */
    lastModifiedBy?: number;
    /** 修改时间 */
    lastModifiedDate?: string;
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
    /** 资源描述 */
    description?: string;
    children?: ResourceDTO[];
  };

  type RoleDTO = {
    /** 主键ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 标识名称 */
    identification?: string;
    /** 描述 */
    description?: string;
    /** 关联的路由 */
    routes?: RouteDTO[];
    /** 关联的路由id */
    routeIds?: number[];
    /** 关联的资源 */
    resources?: ResourceDTO[];
    /** 关联的资源id */
    resourceIds?: number[];
  };

  type RouteDTO = {
    /** 主键ID */
    id?: number;
    /** 路由名称 */
    name?: string;
    /** 路由地址 */
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
    roles?: RoleDTO[];
    children?: RouteDTO[];
  };

  type UserDTO = {
    /** 主键ID */
    id?: number;
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    authorities?: GrantedAuthority[];
    /** 账户是否过期,过期无法验证 */
    accountNonExpired?: boolean;
    /** 指定用户是否被锁定或者解锁,锁定的用户无法进行身份验证 */
    accountNonLocked?: boolean;
    /** 指示是否已过期的用户的凭据(密码),过期的凭据防止认证 */
    credentialsNonExpired?: boolean;
    /** 是否被禁用,禁用的用户不能身份验证 */
    enabled?: boolean;
    /** 姓名 */
    name?: string;
    /** 昵称 */
    nickname?: string;
    /** 性别 */
    sex?: number;
    /** 生日 */
    birthday?: string;
    /** 头像 */
    avatar?: string;
    /** 邮箱 */
    email?: string;
    /** 手机号码 */
    phoneNumber?: string;
    /** 地址编号 */
    addressCode?: string;
    /** 详细地址 */
    detailedAddress?: string;
    /** 个人介绍 */
    introduction?: string;
    /** 记录用户的角色 */
    roles?: RoleDTO[];
    /** 关联的角色id */
    roleIds?: number[];
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    hitCount?: boolean;
    countId?: string;
    maxLimit?: number;
    ascs?: PageUserVO;
    desc?: PageUserVO;
    searchCount?: boolean;
    descs?: PageUserVO;
    asc?: PageUserVO;
    pages?: number;
  };

  type ResultBodyPageUserVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: PageUserVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type UserVO = {
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
    /** 主键ID */
    id?: number;
    /** 用户名 */
    username?: string;
    authorities?: GrantedAuthority[];
    /** 账户是否过期,过期无法验证 */
    accountNonExpired?: boolean;
    /** 指定用户是否被锁定或者解锁,锁定的用户无法进行身份验证 */
    accountNonLocked?: boolean;
    /** 指示是否已过期的用户的凭据(密码),过期的凭据防止认证 */
    credentialsNonExpired?: boolean;
    /** 是否被禁用,禁用的用户不能身份验证 */
    enabled?: boolean;
    /** 姓名 */
    name?: string;
    /** 昵称 */
    nickname?: string;
    /** 性别 */
    sex?: number;
    /** 生日 */
    birthday?: string;
    /** 头像 */
    avatar?: string;
    /** 邮箱 */
    email?: string;
    /** 手机号码 */
    phoneNumber?: string;
    /** 地址编号 */
    addressCode?: string;
    /** 详细地址 */
    detailedAddress?: string;
    /** 个人介绍 */
    introduction?: string;
    /** 关联的角色id */
    roleIds?: number[];
  };

  type DynamicScheduledTaskVO = {
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
  };

  type PageDynamicScheduledTaskVO = {
    records?: DynamicScheduledTaskVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    hitCount?: boolean;
    countId?: string;
    maxLimit?: number;
    ascs?: PageDynamicScheduledTaskVO;
    desc?: PageDynamicScheduledTaskVO;
    searchCount?: boolean;
    descs?: PageDynamicScheduledTaskVO;
    asc?: PageDynamicScheduledTaskVO;
    pages?: number;
  };

  type ResultBodyPageDynamicScheduledTaskVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: PageDynamicScheduledTaskVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type PageRoleVO = {
    records?: RoleVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    hitCount?: boolean;
    countId?: string;
    maxLimit?: number;
    ascs?: PageRoleVO;
    desc?: PageRoleVO;
    searchCount?: boolean;
    descs?: PageRoleVO;
    asc?: PageRoleVO;
    pages?: number;
  };

  type ResultBodyPageRoleVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: PageRoleVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type RoleVO = {
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

  type UserLoginForm = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 登陆方式（account、phone） */
    type?: string;
    /** 自动登陆 */
    autoLogin?: boolean;
  };

  type PageRegionVO = {
    records?: RegionVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    hitCount?: boolean;
    countId?: string;
    maxLimit?: number;
    ascs?: PageRegionVO;
    desc?: PageRegionVO;
    searchCount?: boolean;
    descs?: PageRegionVO;
    asc?: PageRegionVO;
    pages?: number;
  };

  type RegionVO = {
    /** 主键ID */
    id?: number;
    /** 父级ID */
    pid?: number;
    /** 区域名称 */
    name?: string;
    /** 区域编码 */
    code?: string;
    /** 层级 */
    level?: number;
    /** 下级区域 */
    children?: RegionVO[];
  };

  type ResultBodyPageRegionVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: PageRegionVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyDynamicScheduledTaskVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: DynamicScheduledTaskVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyUserVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: UserVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyBoolean = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: boolean;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type AsyncRoute = {
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
    /** 排序等级 */
    priority?: number;
    /** 菜单是否隐藏 */
    hidden?: boolean;
    /** 菜单是否总是显示 */
    alwaysShow?: boolean;
    meta?: Meta;
    /** 参数 */
    props?: string;
    /** 菜单描述 */
    description?: string;
    /** 下级菜单 */
    children?: AsyncRoute[];
  };

  type CurrentUser = {
    userInfo?: UserInfo;
    /** 角色 */
    roles?: RoleBase[];
    /** 菜单 */
    asyncRoutes?: AsyncRoute[];
  };

  type Meta = {
    /** 显示名称 */
    title?: string;
    /** 图标 */
    icon?: string;
    /** 是否需要缓存 */
    noCache?: boolean;
    /** 固钉 */
    affix?: boolean;
    /** 是否打开面包屑 */
    breadcrumb?: boolean;
    /** 拥有角色 */
    roles?: string[];
  };

  type ResultBodyCurrentUser = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: CurrentUser;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type RoleBase = {
    /** 主键ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 标识名称 */
    identification?: string;
  };

  type UserInfo = {
    /** 昵称 */
    nickname?: string;
    /** 头像 */
    avatar?: string;
    /** 个人简介 */
    introduction?: string;
  };

  type ResultBodyRouteVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: RouteVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type RouteVO = {
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
    roleVOList?: RoleVO[];
    children?: RouteVO[];
  };

  type ResultBodyListRouteVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: RouteVO[];
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyRoleVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: RoleVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyListRoleVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: RoleVO[];
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResourceVO = {
    /** 创建人 */
    createdBy?: number;
    /** 创建时间 */
    createdDate?: string;
    /** 修改人 */
    lastModifiedBy?: number;
    /** 修改时间 */
    lastModifiedDate?: string;
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
  };

  type ResultBodyResourceVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: ResourceVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyListResourceVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: ResourceVO[];
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyRegionVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: RegionVO;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyListRegionVO = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: RegionVO[];
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type BeanInfo = {
    /** bean名称 */
    beanName?: string;
    /** bean对应的Class名 */
    className?: string;
    /** bean对应的所含有的方法 */
    methods?: MethodInfo[];
  };

  type MethodInfo = {
    /** 方法名 */
    methodName?: string;
    /** 方法名（简易） */
    methodSimpleName?: string;
    /** 方法名（完全） */
    methodFullName?: string;
  };

  type ResultBodyBeanInfo = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    data?: BeanInfo;
    /** 请求完成的时间 */
    timestamp?: number;
  };

  type ResultBodyListBeanInfo = {
    /** 业务状态码 */
    code?: number;
    /** 返回的信息 */
    message?: string;
    /** 返回的数据 */
    data?: BeanInfo[];
    /** 请求完成的时间 */
    timestamp?: number;
  };
}
