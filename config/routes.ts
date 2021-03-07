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
  // {
  //   path: '/system',
  //   name: 'system',
  //   icon: 'crown',
  //   routes: [
  //     {
  //       path: '/system/user',
  //       name: 'user',
  //       icon: 'smile',
  //       component: './System/UserList',
  //     },
  //     {
  //       path: '/system/menu',
  //       name: 'menu',
  //       icon: 'smile',
  //       component: './System/MenuList',
  //     },
  //   ],
  // },
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
