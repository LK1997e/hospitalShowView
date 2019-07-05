import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Department from '@/components/Basic/Department'
import User from '@/components/Basic/User'
import SettlementCategory from '@/components/Basic/SettlementCategory'
import RegistrationLevel from '@/components/Basic/RegistrationLevel'
import FMedItem from '@/components/Basic/FMedItem'
import Disease from '@/components/Basic/Disease'
import ScheduleRule from '@/components/Basic/ScheduleRule'
import Schedule from '@/components/Basic/Schedule'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Login from '@/components/login/Login'
import UserInfo from '@/components/userInfo/UserInfo'
import UpdateUserInfo from '@/components/userInfo/UpdateUserInfo'
import InspectionSearch from '@/components/medicalTech/inspection/InspectionSearch'
import InspectionCheck from '@/components/medicalTech/inspection/InspectionCheck'
import InspectionExcute from '@/components/medicalTech/inspection/InspectionExcute'
import FeeSearch from '@/components/registerAndCharge/feeSearch/FeeSearch'
import CheckWork from '@/components/finance/CheckWork'
import Expenseclass from '@/components/finance/Expenseclass'
import WorkloadStatistics from '@/components/finance/WorkloadStatistics'
import DepartmentWorkCharts from '@/components/finance/DepartmentWorkCharts'
import UserWorkCharts from '@/components/finance/UserWorkCharts'
import PharmacySearch from '@/components/pharmacy/PharmacySearch'
import Register from '../components/registerAndCharge/Register'
import SearchPatient from '@/components/outpatient/SearchPatient'
import MedicalRecHome from '@/components/outpatient/MedicalRecHome'
import ApplyInspection from '@/components/outpatient/ApplyInspection'

import ApplyDisposal from '@/components/outpatient/ApplyDisposal'
import ApplyPrescription from '@/components/outpatient/ApplyPrescription'
import CommonDiagnosis from '@/components/outpatient/CommonDiagnosis'
import CommonDisposal from '@/components/outpatient/CommonDisposal'
import CommonDrugs from '@/components/outpatient/CommonDrugs'
import Diagnosis from '@/components/outpatient/Diagnosis'
import MedicalRecHomeTemp from '@/components/outpatient/MedicalRecHomeTemp'
import ProjectTemp from '@/components/outpatient/ProjectTemp'
import CommonInspection from '@/components/outpatient/CommonInspection'


import RegisterInfoList from '../components/registerAndCharge/RegisterInfoList'
import PharmacyDeal from '@/components/pharmacy/PharmacyDeal'
import Toll from '@/components/registerAndCharge/Toll'
import DailySettle from '@/components/registerAndCharge/DailySettle'
import DailySettleSearch from '@/components/registerAndCharge/DailySettleSearch'

import DisposalSearch from '@/components/medicalTech/disposal/DisposalSearch'
import DisposalCheck from '@/components/medicalTech/disposal/DisposalCheck'
import ApplyPatientCard from '../components/registerAndCharge/ApplyPatientCard'
import PatientCardManage
  from '../components/registerAndCharge/PatientCardManage'




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

      },
      {
        path: '/baseInfoManage/userManage',
        component: User,
        iconCls: 'el-icon-message',
        name: '用户管理',
        meta: {
          name: '用户管理',
        },

      },
      {
        path: '/baseInfoManage/setCatManage',
        component: SettlementCategory,
        iconCls: 'el-icon-message',
        name: '结算类别管理',
        meta: {
          name: '结算类别管理',
        },

      },
      {
        path: '/baseInfoManage/regLevManage',
        component: RegistrationLevel,
        iconCls: 'el-icon-message',
        name: '挂号级别管理',
        meta: {
          name: '挂号级别管理',
        },

      },
      {
        path: '/baseInfoManage/fMedItemManage',
        component: FMedItem,
        iconCls: 'el-icon-message',
        name: '非药品项目管理',
        meta: {
          name: '非药品项目管理',
        },

      },
      {
        path: '/baseInfoManage/diseaseManage',
        component: Disease,
        iconCls: 'el-icon-message',
        name: '诊断目录管理',
        meta: {
          name: '诊断目录管理',
        },

      },
      {
        path: '/baseInfoManage/scheduleRuleManage',
        component: ScheduleRule,
        iconCls: 'el-icon-message',
        name: '排班规则管理',
        meta: {
          name: '排班规则管理',
        },


      },
      {
        path: '/baseInfoManage/scheduleManage',
        component: Schedule,
        iconCls: 'el-icon-message',
        name: '排班信息管理',
        meta: {
          name: '排班信息管理',
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
      {
        path: '/finance/DepartmentWorkCharts',
        component: DepartmentWorkCharts,
        name: '部门工作量统计图表',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '部门工作量统计图表',
        },
      },
      {
        path: '/finance/UserWorkCharts',
        component: UserWorkCharts,
        name: '个人工作量统计图表',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '个人工作量统计图表',
        },
      },
    ],
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
        hidden: true,
        meta: {
          name: '检查检验审核',
        },
      },
      {
        path: '/medicalTech/inspectionExcute',
        component: InspectionExcute,
        name: '检查检验执行',
        iconCls: 'el-icon-message',//图标样式class
        hidden: true,
        meta: {
          name: '检查检验执行',
        },
      }
    ]
  },
  {
    path: '/medicalTech',
    component: Home,
    name: '处置',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '处置',
    },
    children: [
      {
        path: '/medicalTech/disposalSearch',
        component: DisposalSearch,
        name: '处置查询',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '处置查询',
        },
      },
      {
        path: '/medicalTech/disposalCheck',
        component: DisposalCheck,
        name: '处置审核',
        iconCls: 'el-icon-message',//图标样式class
        hidden: true,
        meta: {
          name: '处置审核',
        },
      }

    ]
  }

]

export const outpatientRoutes = [
  {
    path: '/outpatient',
    component: Home,
    name: '门诊人员管理',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '门诊人员管理',
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

  {
    path: '/outpatient',
    component: Home,
    name: '门诊管理',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '门诊管理',
    },
    children: [
      {
        path: '/outpatient/SearchPatient',
        component: SearchPatient,
        name: '患者列表',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '患者列表',
        },
      },


      {
        path: '/outpatient/MedicalRecHome',
        component:MedicalRecHome,
        name: '病历首页编辑',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '病历首页编辑',
        },

      },
      {
        path: '/outpatient/ApplyInspection',
        component: ApplyInspection,
        name: '申请检查项目',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '申请检查项目',
        },
      },


      {
        path: '/outpatient/ApplyDisposal',
        component: ApplyDisposal,
        name: '申请处置项目',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '申请处置项目',
        },
      },
      {
        path: '/outpatient/ApplyPrescription',
        component: ApplyPrescription,
        name: '申请处方',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '申请处方',
        },
      },
      {
        path: '/outpatient/CommonDiagnosis',
        component: CommonDiagnosis,
        name: '常用诊断',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '常用诊断',
        },
      },
      {
        path: '/outpatient/CommonDisposal',
        component: CommonDisposal,
        name: '常用处置',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '常用处置',
        },
      },
      {
        path: '/outpatient/CommonDrugs',
        component: CommonDrugs,
        name: '常用药品',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '常用药品',
        },
      },
      {
        path: '/outpatient/CommonInspection',
        component: CommonInspection,
        name: '常用检查检验项目',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '常用检查检验项目',
        },
      },
      {
        path: '/outpatient/Diagnosis',
        component: Diagnosis,
        name: '诊断',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '诊断',
        },
      },
      {
        path: '/outpatient/MedicalRecHomeTemp',
        component: MedicalRecHomeTemp,
        name: '病历模板',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '病历模板',
        },
      },
      {
        path: '/outpatient/ProjectTemp',
        component: ProjectTemp,
        name: '项目组套',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '项目组套',
        },
      },


    ],
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
  {
    path: '/pharmacy',
    component: Home,
    name: '药房管理',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '药房管理',
    },
    children: [
      {
        path: '/pharmacy/PharmacySearch',
        component: PharmacySearch,
        name: '药房搜索',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '药房搜索',
        },
      },
      {
        path: '/pharmacy/PharmacyDeal',
        component: PharmacyDeal,
        name: '药房处理',
        iconCls: 'el-icon-message',//图标样式class
        hidden: true,
        meta: {
          name: '药房处理',
        },
      }
    ]
  }
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
    ],
  },
  {
    path: '/registerAndCharge',
    component: Home,
    name: '挂号管理',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '挂号管理',
    },
    children: [
      {
        path: '/registerAndCharge/Register',
        component: Register,
        name: '门诊挂号',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '门诊挂号',
        },
      },
      {
        path: '/reg/RegInfo',
        component: RegisterInfoList,
        name: '查询及退号',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '查询及退号',
        },
      },
      {
        path: '/reg/applyPatientCard',
        component: ApplyPatientCard,
        name: '申请就诊卡',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '申请就诊卡',
        },
      },
      {
        path: '/reg/patientCardManage',
        component: PatientCardManage,
        name: '就诊卡管理',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '就诊卡管理',
        },
      },
    ]
  },
  {
    path: '/registerAndCharge',
    component: Home,
    name: '费用管理',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '费用管理',
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
      }, {
        path: '/registerAndCharge/Toll',
        component: Toll,
        name: '门诊收费',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '门诊收费',
        },
      },
    ]
  },
   {
    path: '/registerAndCharge',
    component: Home,
    name: '日结',
    iconCls: 'el-icon-message',//图标样式class
    meta: {
      name: '日结',
    },
    children: [
      {
        path: '/registerAndCharge/DailySettle',
        component: DailySettle,
        name: '收费员日结',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '收费员日结',
        },
      },
      {
        path: '/registerAndCharge/DailySettleSearch',
        component: DailySettleSearch,
        name: '日结查询',
        iconCls: 'el-icon-message',//图标样式class
        meta: {
          name: '日结查询',
        },
      },
    ]
  }

]

export default routes;
