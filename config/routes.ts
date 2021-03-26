export default [
  {
    name: 'login',
    path: '/login',
    layout: false,
    hideInMenu: true,
    component: './Common/login',
  },
  {
    path: '/index',
    name: '首页',
    locale: 'menu.index',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    path: '/system',
    name: 'system',
    icon: 'crown',
    routes: [
      {
        path: '/system/user',
        name: 'user',
        icon: 'smile',
        component: './System/UserList',
      },
      {
        path: '/system/menu',
        name: 'menu',
        icon: 'smile',
        component: './System/MenuList',
      },
      {
        path: '/system/role',
        name: 'role',
        icon: 'smile',
        component: './System/RoleList',
      },
      {
        path: '/system/resource',
        name: 'resource',
        icon: 'smile',
        component: './System/ResourceList',
      },
      {
        path: '/system/department',
        name: 'department',
        icon: 'smile',
        component: './System/DepartmentList',
      },
      {
        path: '/system/task',
        name: 'task',
        icon: 'smile',
        component: './System/TaskList',
      },
      {
        path: '/system/dictionary',
        name: 'dictionary',
        icon: 'smile',
        component: './System/DictionaryList',
      },
    ],
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: './ErrorPage/500',
  },
  {
    component: './ErrorPage/403',
  },
  {
    component: './ErrorPage/404',
  },
];
