import Login from '@/components/Login'
import Home from '@/components/Home'
import page404 from '@/components/404'
import Form from '@/components/nav1/form'
import Table from '@/components/nav1/table'
import User from '@/components/nav1/user'
import Page4 from '@/components/nav2/page4'
import Page5 from '@/components/nav2/page5'
import Page6 from '@/components/nav3/page6'
import Charts from '@/components/charts/echarts'

let routes =  [
    {
      path: '/login',
      name: '',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      name: '404',
      component: page404,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name : '导航一',
      iconCls: 'el-icon-message',
      children: [
          { path: '/table',component: Table, name: 'table'},
          { path: '/form',component: Form, name: 'form'},
          { path: '/user',component: User, name: 'user'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航二',
      iconCls: 'fa fa-id-card-o',
      children : [
          {path: '/page4',component: Page4, name: 'page4'},
          {path: '/page5',component: Page5, name: 'page5'}
      ]
    },
    {
      path: '/',
      component: Home,
      iconCls: 'fa fa-cog',
      name: '',
      leaf :true, //只有一个节点
      children: [
        {path: '/page6',component: Page6, name: '导航三'}
      ]
    },
    {
      path:'/',
      component: Home,
      name: 'charts',
      iconCls: 'fa fa-bar-chart',
      children: [
        {path: '/charts', component: Charts, name: 'echarts'}
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: {path: '/404'}
    }
  ];

  export default routes;
