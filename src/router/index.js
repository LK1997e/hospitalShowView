import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Department from '@/components/basic/Department'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Login from '@/components/login/Login'
import UserInfo from '@/components/userInfo/UserInfo'
import UpdateUserInfo from '@/components/userInfo/UpdateUserInfo'
import InspectionSearch from '@/components/medicalTech/inspection/InspectionSearch'
import InspectionCheck from '@/components/medicalTech/inspection/InspectionCheck'
import FeeSearch from '@/components/registerAndCharge/feeSearch/FeeSearch'
import CheckWork from '@/components/finance/CheckWork'
import Expenseclass from '@/components/finance/Expenseclass'
import WorkloadStatistics from '@/components/finance/WorkloadStatistics'
import User from '@/components/basic/User'
Vue.use(Router)
Vue.use(Vuex)

let routes = [

  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
];


export const adminRoutes = [
  {
    path: '/admin',
    component: Home,
    name: '管理人员',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '管理人员',
    },
    children: [
      {
        path: '/admin/UserInfo',
        component: UserInfo,
        name: '管理人员主页' ,
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '管理人员主页',
        },
      },
      {
        path: '/admin/UpdateUserInfo',
        component: UpdateUserInfo,
        name: '修改个人信息' ,
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '修改个人信息',
        },
      },
    ]
  },
  {
    path: '/admin',
    component: Home,
    name: '基础信息管理',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '基础信息管理',
    },
    children:[
      {
        path: '/baseInfoManage/departmentManage',
        component: Department,
        iconCls: 'el-icon-message',
        name: '部门管理',
        meta: {
          name: '部门管理',
        },
      }, {
        path: '/baseInfoManage/userManage',
        component: User,
        iconCls: 'el-icon-message',
        name: '用户管理',
        meta: {
          name: '用户管理',
        },
      },

    ]
  },

]

export const financeRoutes = [
  {
    path: '/finance',
    component: Home,
    name: '财务人员',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '财务人员',
    },
    children: [
      {
        path: '/finance/UserInfo',
        component: UserInfo,
        name: '财务人员主页',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '财务人员主页',
        },
      },
      {
        path: '/finance/UpdateUserInfo',
        component: UpdateUserInfo,
        name: '修改个人信息' ,
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '修改个人信息',
        },
      },
    ]
  },
  {
    path: '/finance',
    component: Home,
    name: '费用类型管理',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '费用类型管理',
    },
    children: [
      {
        path: '/finance/Expenseclass',
        component: Expenseclass,
        name: '费用类型管理',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '费用类型管理',
        },
      },

    ]
  },
  {
    path: '/finance',
    component: Home,
    name: '费用核对',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '费用核对',
    },
    children: [
      {
        path: '/finance/CheckWork',
        component: CheckWork,
        name: '费用核对',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '费用核对',
        },
      },

    ]
  },
  {
    path: '/finance',
    component: Home,
    name: '工作量统计',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '工作量统计',
    },
    children: [
      {
        path: '/finance/WorkloadStatistics',
        component: WorkloadStatistics,
        name: '工作量统计',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '工作量统计',
        },
      },

    ]
  },

]

export const medicalTechRoutes = [
  {
    path: '/medicalTech',
    component: Home,
    name: '医技人员',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '医技人员',
    },
    children: [
      {
        path: '/medicalTech/UserInfo',
        component: UserInfo,
        name: '医技人员主页',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '医技人员主页',
        },
      },
      {
        path: '/medicalTech/UpdateUserInfo',
        component: UpdateUserInfo,
        name: '修改个人信息' ,
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '修改个人信息',
        },
      },
    ]
  },
  {
    path: '/medicalTech',
    component: Home,
    name: '检查检验',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '检查检验',
    },
    children: [
      {
        path: '/medicalTech/inspectionSearch',
        component: InspectionSearch,
        name: '检查检验查询',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '检查检验查询',
        },
      },
      {
        path: '/medicalTech/inspectionCheck',
        component: InspectionCheck,
        name: '检查检验审核',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '检查检验审核',
        },
      }
    ]
  }

]

export const outpatientRoutes = [
  {
    path: '/outpatient',
    component: Home,
    name: '门诊人员',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '门诊人员',
    },
    children: [
      {
        path: '/outpatient/UserInfo',
        component: UserInfo,
        name: '门诊人员主页',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '门诊人员主页',
        },
      },
      {
        path: '/outpatient/UpdateUserInfo',
        component: UpdateUserInfo,
        name: '修改个人信息' ,
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '修改个人信息',
        },
      },
    ]
  },
]

export const pharmacyRoutes = [
  {
    path: '/pharmacy',
    component: Home,
    name: '药房人员',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '药房人员',
    },
    children: [
      {
        path: '/pharmacy/UserInfo',
        component: UserInfo,
        name: '药房人员主页',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '药房人员主页',
        },
      },
      {
        path: '/pharmacy/UpdateUserInfo',
        component: UpdateUserInfo,
        name: '修改个人信息' ,
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '修改个人信息',
        },
      },
    ]
  },
]

export const registerAndChargeRoutes = [
  {
    path: '/registerAndCharge',
    component: Home,
    name: '挂号收费员',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '挂号收费员',
    },
    children: [
      {
        path: '/registerAndCharge/UserInfo',
        component: UserInfo,
        name: '挂号收费员主页',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '挂号收费员主页',
        },
      },
      {
        path: '/registerAndCharge/UpdateUserInfo',
        component: UpdateUserInfo,
        name: '修改个人信息' ,
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '修改个人信息',
        },
      },
    ]
  },
  {
    path: '/registerAndCharge',
    component: Home,
    name: '费用查询',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '费用查询',
    },
    children: [
      {
        path: '/registerAndCharge/FeeSearch',
        component: FeeSearch,
        name: '费用查询',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '费用查询',
        },
      },
    ]
  }
]

export default routes;
