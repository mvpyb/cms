import Vue from 'vue'
import Router from 'vue-router'
Vue.use( Router )

/* Layout */
import Layout from '@/layout'
import About from '@/layout/about'
import Dynamic from '@/layout/dynamic'
import Feature from '@/layout/feature'
import Member from '@/layout/member'

export const constantRoutes = [
  {
    path : '/redirect',
    component : Layout,
    hidden : true,
    children : [
      {
        path : '/redirect/:path(.*)',
        component : () => import( '@/views/redirect/index' )
      }
    ]
  },
  // {
  //   path : '/login',
  //   component : () => import( '@/views/login/index' ),
  //   hidden : true
  // },
  {
    path : '/auth-redirect',
    component : () => import( '@/views/login/auth-redirect' ),
    hidden : true
  },
  {
    path : '/',
    component : Layout,
    redirect : '/dashboard',
    children : [
      {
        path : 'dashboard',
        component : () => import( '@/views/dashboard/index' ),
        name : 'Dashboard',
        meta : { title : '首页', icon : 'dashboard', affix : true }
      }
    ]
  },
  {
    path : '/search',
    component : Layout,
    redirect : '/search/index',
    alwaysShow : true,
    hidden : true,
    // meta : {
    //   noCache : true,
    //   title : '搜索',
    //   icon : 'project'
    // },
    children : [
      {
        path : 'index',
        component : () => import( '@/views/search/index' ),
        name : 'Search',
        meta : { title : '文章搜索', icon : 'icon', noCache : true }
      }
    ]
  },

  // {
  //   path : '/profile',
  //   component : Layout,
  //   redirect : '/profile/index',
  //   hidden : true,
  //   children : [
  //     {
  //       path : 'index',
  //       component : () => import( '@/views/profile/index' ),
  //       name : 'Profile',
  //       meta : { title : '关于我', icon : 'user', noCache : true }
  //     }
  //   ]
  // },
  {
    path : '/404',
    component : () => import( '@/views/error-page/404' ),
    hidden : true
  },
  {
    path : '/401',
    component : () => import( '@/views/error-page/401' ),
    hidden : true
  },
  {
    path : '/500',
    component : () => import( '@/views/error-page/500' ),
    hidden : true
  },
  // {
  //   path : '/tools',
  //   component : Layout,
  //   children : [
  //     {
  //       path : 'index',
  //       component : () => import( '@/views/tools/icons' ),
  //       name : 'Icons',
  //       meta : { title : 'icons', icon : 'icon', noCache : true }
  //     }
  //   ]
  // }
  // { path : '*', redirect : '/404', hidden : true }
]

export const asyncRoutes = [
  // /* 工作动态*/
  // {
  //   path : '/dynamic',
  //   component : Dynamic,
  //   redirect : '/dynamic/politics',
  //   alwaysShow : true,
  //   meta : {
  //     noCache : true,
  //     title : '工作动态'
  //   },
  //   children : [
  //     {
  //       path : 'politics',
  //       component : () => import( '@/views/dynamic/politics' ),
  //       name : 'Politics',
  //       meta : {
  //         title : '时政要闻',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'association',
  //       component : () => import( '@/views/dynamic/association' ),
  //       name : 'Association',
  //       meta : {
  //         title : '协会动态',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'member',
  //       component : () => import( '@/views/dynamic/member' ),
  //       name : 'Member',
  //       meta : {
  //         title : '会员动态',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'notice',
  //       component : () => import( '@/views/dynamic/notice' ),
  //       name : 'Notice',
  //       meta : {
  //         title : '通知公告',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'details',
  //       component : () => import( '@/views/dynamic/details' ),
  //       name : 'Details',
  //       hidden : true,
  //       meta : {
  //         title : '详情',
  //         noCache : true
  //       }
  //     }
  //   ]
  // },
  // /* 专题服务*/
  // {
  //   path : '/feature',
  //   component : Feature,
  //   redirect : '/feature/secretariat',
  //   alwaysShow : true,
  //   meta : {
  //     noCache : true,
  //     title : '专题服务'
  //   },
  //   children : [
  //     {
  //       path : 'secretariat',
  //       component : () => import( '@/views/feature/secretariat' ),
  //       name : 'Secretariat',
  //       meta : {
  //         title : '秘书处',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'office',
  //       component : () => import( '@/views/feature/office' ),
  //       name : 'Office',
  //       meta : {
  //         title : '党建办公室',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'science',
  //       component : () => import( '@/views/feature/science' ),
  //       name : 'Science',
  //       meta : {
  //         title : '科技创新委员会',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'international',
  //       component : () => import( '@/views/feature/international' ),
  //       name : 'International',
  //       meta : {
  //         title : '国际合作办公室',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'chapter',
  //       component : () => import( '@/views/feature/chapter' ),
  //       name : 'Chapter',
  //       meta : {
  //         title : '专业分会管理办公室',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'education',
  //       component : () => import( '@/views/feature/education' ),
  //       name : 'Education',
  //       meta : {
  //         title : '教育培训机构',
  //         noCache : true
  //       }
  //     },
  //     {
  //       path : 'details',
  //       component : () => import( '@/views/feature/details' ),
  //       name : 'Details',
  //       hidden : true,
  //       meta : {
  //         title : '详情',
  //         noCache : true
  //       }
  //     }
  //   ]
  // },

  { path : '*', redirect : '/404', hidden : true }
]

const createRouter = () => new Router( {
  // mode: 'history', // require service support
  scrollBehavior : () => ( { y : 0 } ),
  routes : constantRoutes
} )

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
