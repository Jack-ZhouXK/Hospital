import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './components/login/loginUser.vue'
import home from './components/home.vue'
import Welcome from '@/components/Welcome.vue'
import users from '@/components/user/users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //  用户访问/自动重定向到/login
    { path: '/', redirect: '/pageHome' },
    { path: '/login', component: login },
    //首页头部组件
    {
      path: '/pageHome',
      name: '首页',
      component: () =>
        import('@/components/pageHome/page_home.vue'),
    },
    {
      path: '/introduction',
      name: '医院简介',
      component: () =>
        import('@/components/pageHome/hospital_introduction.vue'),
    },
    {
      path: '/journalism',
      name: '新闻中心',
      component: () =>
        import('@/components/pageHome/Journalism_centre.vue'),
    },
    {
      path: '/serve',
      name: '患者服务',
      component: () =>
        import('@/components/pageHome/page_serve.vue'),
    },
    {
      path: '/guide',
      name: '就医指南',
      component: () =>
        import('@/components/pageHome/medical_guide.vue'),
    },
    {
      path: '/adminManage',
      name: '管理员管理',
      component: () =>
        import('@/components/admin/adminManage.vue'),
    },
    {
      path: '/MedicalManage',
      name: '病史管理',
      component: () =>
        import('@/components/admin/MedicalManage.vue'),
    },
    {
      path: '/makeManage',
      name: '预约管理',
      component: () =>
        import('@/components/admin/makeManage.vue'),
    },

    {
      path: '/doctorManage',
      name: '医生管理',
      component: () =>
        import('@/components/admin/doctorManage.vue'),
    },
    {
      path: '/drugsManage',
      name: '药品管理',
      component: () =>
        import('@/components/admin/drugsManage.vue'),
    },
    {
      path: '/diseaseManage',
      name: '疾病管理',
      component: () =>
        import('@/components/admin/diseaseManage.vue'),
    },
    {
      path: '/patientManage',
      name: '患者管理',
      component: () =>
        import('@/components/admin/patientManage.vue'),
    },
    {
      path: '/subjectSelect',
      name: '科目查询管理',
      component: () =>
        import('@/components/admin/subjectSelect.vue'),
    },
    {
      path: '/doctorPageHome',
      name: '医生首页',
      component: () =>
        import('@/components/doctor/doctorPageHome.vue'),
    },
    {
      path: '/patientPageHome',
      name: '患者首页',
      component: () =>
        import('@/components/patient/patientPageHome.vue'),
    },
    {
      path: '/registration',
      name: '挂号首页',
      component: () =>
        import('@/components/patient/registration.vue'),
    },



  ],
})

//挂载路由导航
router.beforeEach((to, from, next) => {
  //to:代表将要访问的路径
  //from:代表从哪里跳转路径而来
  //next() 放行  next("/login") 强制跳转
  if (to.path == '/login' || to.path == '/pageHome' || to.path == '/journalism'  || to.path == '/guide') return next()
  //获取页面token
  const tokenStr = window.sessionStorage.getItem('username')
  if (!tokenStr) {
    // 等于空直接返回登录页面
    alert('您还未登录,请您先登录')
    return next('/login')
  }
  //不等于空直接放行
  next()
})

export default router
