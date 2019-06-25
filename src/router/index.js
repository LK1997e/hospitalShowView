import Vue from 'vue'
import Router from 'vue-router'
import Department from '@/components/Basic/Department'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

let router =new Router({
  routes: [
    {
      path: '/',
      name: '基础信息管理',
      component: Home,
      iconCls: 'el-icon-message',
      children:[
        { path: '/baseInfoManage/departmentManage', component: Department, name: '挂号' }
      ]

    }]
});

export const t1 = [
  {
    path: '/',
    name: '基础信息',
    component: Home,
    iconCls: 'el-icon-message',
    children: [
      {
        path:'/t',
        component: HelloWorld,
        name: 'HelloWorld'
      },
    ]


  },  {
    path: '/',
    name: '基础信息',
    component: Home,
    iconCls: 'el-icon-message',
    children: [
      {
        path:'/t1',
        component: HelloWorld,
        name: 'HelloWorld'
      },
    ]


  }

];








export default router;
