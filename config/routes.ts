export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
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
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: '高级表单',
    icon: 'smile',
    path: '/test/formadvancedform',
    component: './Test/FormAdvancedForm',
  },
  {
    name: '查询表格',
    icon: 'smile',
    path: '/test/listtablelist',
    component: './Test/ListTableList',
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
