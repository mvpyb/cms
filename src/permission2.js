import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure( { showSpinner : false } )
import { getRouters } from '@/api/request'

var getRouter
const fakeRouter = {
  "router" : [
    /* 关于协会*/
    {
      "path" : "/about",
      "component" : "About",
      "redirect" : "/about/index",
      "alwaysShow" : true,
      "meta" : {
        "noCache" : true,
        "title" : "关于协会"
      },
      "children" : [
        {
          "path" : "index",
          "component" : "about/index",
          "name" : "Index",
          "meta" : {
            "title" : "协会简介",
            "noCache" : true
          }
        },
        {
          "path" : "rule",
          "component" : "about/rule",
          "name" : "Rule",
          "meta" : {
            "title" : "协会章程",
            "noCache" : true
          }
        },
        {
          "path" : "organization",
          "component" : "about/organization",
          "name" : "Organization",
          "meta" : {
            "title" : "组织架构",
            "noCache" : true
          }
        },
        {
          "path" : "leader",
          "component" : "about/leader",
          "name" : "Leader",
          "meta" : {
            "title" : "协会领导",
            "noCache" : true
          }
        },
        {
          "path" : "join",
          "component" : "about/join",
          "name" : "Join",
          "meta" : {
            "title" : "人才招聘",
            "noCache" : true
          }
        },
        {
          "path" : "jobDetail",
          "component" : "about/jobDetail",
          "hidden" : true,
          "name" : "JobDetail",
          "meta" : {
            "title" : "招聘详情",
            "noCache" : true
          }
        },
        {
          "path" : "contacts",
          "component" : "about/contacts",
          "name" : "Contacts",
          "meta" : {
            "title" : "联系我们",
            "noCache" : true
          }
        }

      ]
    },
    /* 工作动态*/
    {
      "path" : "/dynamic",
      "component" : "Dynamic",
      "redirect" : "/dynamic/politics",
      "alwaysShow" : true,
      "meta" : {
        "noCache" : true,
        "title" : "工作动态"
      },
      "children" : [
        {
          "path" : "politics",
          "component" : "dynamic/politics",
          "name" : "Politics",
          "meta" : {
            "title" : "时政要闻",
            "noCache" : true
          }
        },
        {
          "path" : "association",
          "component" : "dynamic/association",
          "name" : "Association",
          "meta" : {
            "title" : "协会动态",
            "noCache" : true
          }
        },
        {
          "path" : "member",
          "component" : "dynamic/member",
          "name" : "Member",
          "meta" : {
            "title" : "会员动态",
            "noCache" : true
          }
        },
        {
          "path" : "notice",
          "component" : "dynamic/notice",
          "name" : "Notice",
          "meta" : {
            "title" : "通知公告",
            "noCache" : true
          }
        },
        {
          "path" : "details",
          "component" : "dynamic/details",
          "name" : "Details",
          "hidden" : true,
          "meta" : {
            "title" : "详情",
            "noCache" : true
          }
        }
      ]
    },
    /* 专题服务*/
    {
      "path" : "/feature",
      "component" : "Feature",
      "redirect" : "/feature/secretariat",
      "alwaysShow" : true,
      "meta" : {
        "noCache" : true,
        "title" : "专题服务"
      },
      "children" : [
        {
          "path" : "secretariat",
          "component" : "feature/secretariat",
          "name" : "Secretariat",
          "meta" : {
            "title" : "秘书处",
            "noCache" : true
          }
        },
        {
          "path" : "office",
          "component" : "feature/office",
          "name" : "Office",
          "meta" : {
            "title" : "党建办公室",
            "noCache" : true
          }
        },
        {
          "path" : "science",
          "component" : "feature/science",
          "name" : "Science",
          "meta" : {
            "title" : "科技创新委员会",
            "noCache" : true
          }
        },
        {
          "path" : "international",
          "component" : "feature/international",
          "name" : "International",
          "meta" : {
            "title" : "国际合作办公室",
            "noCache" : true
          }
        },
        {
          "path" : "chapter",
          "component" : "feature/chapter",
          "name" : "Chapter",
          "meta" : {
            "title" : "专业分会管理办公室",
            "noCache" : true
          }
        },
        {
          "path" : "education",
          "component" : "feature/education",
          "name" : "Education",
          "meta" : {
            "title" : "教育培训机构",
            "noCache" : true
          }
        },
        {
          "path" : "details",
          "component" : "feature/details",
          "name" : "Details",
          "hidden" : true,
          "meta" : {
            "title" : "详情",
            "noCache" : true
          }
        }
      ]
    },
    /* 会员天地*/
    {
      "path" : "/member",
      "component" : "Member",
      "redirect" : "/member/membership",
      "alwaysShow" : true,
      "meta" : {
        "noCache" : true,
        "title" : "会员天地"
      },
      "children" : [
        {
          "path" : "membership",
          "component" : "member/membership",
          "name" : "Membership",
          "meta" : {
            "title" : "入会条件",
            "noCache" : true
          }
        },
        {
          "path" : "demeanor",
          "component" : "member/demeanor",
          "name" : "Demeanor",
          "meta" : {
            "title" : "会员风采",
            "noCache" : true
          }
        },
        {
          "path" : "details",
          "component" : "member/details",
          "name" : "Details",
          "hidden" : true,
          "meta" : {
            "title" : "详情",
            "noCache" : true
          }
        }
      ]
    },
    {
      "path" : "*",
      "redirect" : "/404",
      "hidden" : true
    }
  ]
}
router.beforeEach( async( to, from, next ) => {
  NProgress.start()
  document.title = getPageTitle( to.meta.title )
  if ( !getRouter ) {
    // getRouter = fakeRouter.router
    const { data } = await getRouters()
    getRouter = data
    await routerGo( to, next, data )
    // if ( !getStorageBy( 'router' ) ) {
    //   getRouter = fakeRouter.router // 假装模拟后台请求得到的路由数据
    //   addStorageBy( 'router', getRouter ) // 存储路由到localStorage
    //   await routerGo( to, next ) // 执行路由跳转方法
    // } else {
    //   getRouter = getStorageBy( 'router' )
    //   await routerGo( to, next )
    // }
    NProgress.done()
  } else {
    next()
    NProgress.done()
  }
} )

async function routerGo( to, next ) {
  getRouter = await store.dispatch( 'permission/getAsyncRoutes', getRouter )
  router.addRoutes( getRouter ) // 动态添加路由
  next( { ...to, replace : true } )
}
