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
      {
        path: '/system/region',
        name: 'region',
        icon: 'smile',
        component: './System/RegionList',
      },
      {
        path: '/system/file',
        name: 'file',
        icon: 'smile',
        component: './System/FileList',
      },
    ],
  },
  {
    path: '/hr',
    name: 'hr',
    icon: 'crown',
    routes: [
      {
        path: '/hr/staff',
        name: 'staff',
        icon: 'smile',
        component: './HR/StaffList',
      },
      {
        path: '/hr/staff-change',
        name: 'staff-change',
        icon: 'smile',
        component: './HR/StaffChange',
      },
    ],
  },
  {
    path: '/salary',
    name: 'salary',
    icon: 'crown',
    routes: [
      {
        path: '/salary/salary-staff',
        name: 'salary-staff',
        icon: 'smile',
        component: './Salary/SalaryStaffList',
      },
      {
        path: '/salary/salary-change',
        name: 'salary-change',
        icon: 'smile',
        component: './Salary/SalaryChangeList',
      },
      // {
      //   path: '/salary/salary-payment',
      //   name: 'salary-payment',
      //   icon: 'smile',
      //   component: './Salary/SalaryPaymentList',
      // },
      {
        path: '/salary/salary-setting',
        name: 'salary-setting',
        icon: 'smile',
        component: './Salary/SalarySetting',
      },
    ],
  },
  {
    path: '/performance',
    name: 'performance',
    icon: 'crown',
    routes: [
      {
        path: '/performance/performance',
        name: 'performance',
        icon: 'smile',
        component: './Performance/PerformanceList',
      },
      {
        path: '/performance/performance-setting',
        name: 'performance-setting',
        icon: 'smile',
        component: './Performance/PerformanceSettingList',
      },
    ],
  },
  {
    path: '/attendance',
    name: 'attendance',
    icon: 'crown',
    routes: [
      {
        path: '/attendance/attendance-collect',
        name: 'attendance-collect',
        icon: 'smile',
        component: './Attendance/AttendanceList',
      },
    ],
  },
  {
    path: '/recruit',
    name: 'recruit',
    icon: 'crown',
    routes: [
      {
        path: '/recruit/resume',
        name: 'resume',
        icon: 'smile',
        component: './Recruit/ResumeList',
      },
      {
        path: '/recruit/maintain',
        name: 'maintain',
        icon: 'smile',
        component: './Recruit/MaintainList',
      },
    ],
  },
  {
    path: '/mobile',
    name: 'mobile',
    layout: false,
    hideInMenu: true,
    routes: [
      {
        path: '/mobile/resume',
        name: 'ResumeFill',
        layout: false,
        hideInMenu: true,
        component: './Mobile/Resume',
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
