import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCookieByKey, getStorageBy, addStorageBy } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import Dynamic from '@/layout/dynamic'
import Feature from '@/layout/feature'

NProgress.configure( { showSpinner : false } )

const whiteList = [
  '/login', '/auth-redirect'
  // '/icon', '/external-link'
]
// const init = false
// async function addRouter( fn ) {
//   // const accessRoutes = await store.dispatch( 'permission/generateRoutes' )
//   // console.log( '动态accessRoutes', accessRoutes )
//   // router.addRoutes( accessRoutes )
//   // init = true
//   fn && fn()
//   // return router
// }
// addRouter( function() {
//   console.log( 99 )
//   router.beforeEach( async( to, from, next ) => {
//     NProgress.start()
//     document.title = getPageTitle( to.meta.title )
//
//     if (!getRouter) {//不加这个判断，路由会陷入死循环
//       if (!getObjArr('router')) {
//         axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
//           getRouter = res.data.data.router//后台拿到路由
//           saveObjArr('router', getRouter) //存储路由到localStorage
//
//           routerGo(to, next)//执行路由跳转方法
//         })
//       } else {//从localStorage拿到了路由
//         getRouter = getObjArr('router')//拿到路由
//         routerGo(to, next)
//       }
//     } else {
//       next()
//     }
//
//     // const hasToken = getCookieByKey( 'news_token' )
//     // if ( hasToken ) {
//     //   if ( to.path === '/login' ) {
//     //     next( { path : '/' } )
//     //     NProgress.done()
//     //   } else {
//     //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
//     //     if ( hasRoles ) {
//     //       next()
//     //     } else {
//     //       try {
//     //         const tokenData = {}
//     //         tokenData.token = hasToken
//     //         const { roles } = await store.dispatch( 'user/loginByToken', tokenData )
//     //         const accessRoutes = await store.dispatch( 'permission/generateRoutes', roles )
//     //         router.addRoutes( accessRoutes )
//     //         next( { ...to, replace : true } )
//     //       } catch ( error ) {
//     //         await store.dispatch( 'user/resetInfo' )
//     //         // Message.error(error || 'Has Error')
//     //         next( `/login?redirect=${to.path}` )
//     //         NProgress.done()
//     //       }
//     //     }
//     //   }
//     // } else {
//     //   if ( whiteList.indexOf( to.path ) !== -1 ) {
//     //     next()
//     //   } else {
//     //     // next( `/login?redirect=${to.path}` )
//     //     next( `/` )
//     //     NProgress.done()
//     //   }
//     // }
//
//     // if ( to.path === '/' ) {
//     //   next( { path : '/' } )
//     //   NProgress.done()
//     // } else {
//     //   const hasRoles = store.getters.roles && store.getters.roles.length > 0
//     //   console.log( 'roles', store.getters.roles, hasRoles )
//     //   if ( hasRoles ) {
//     //     // next()
//     //   } else {
//     //     try {
//     //       const accessRoutes = await store.dispatch( 'permission/generateRoutes' )
//     //       console.log( '动态accessRoutes', accessRoutes )
//     //       router.addRoutes( accessRoutes )
//     //       // next( { ...to, replace : true } )
//     //     } catch ( error ) {
//     //       // await store.dispatch( 'user/resetInfo' )
//     //       // // Message.error(error || 'Has Error')
//     //       // next( `/login?redirect=${to.path}` )
//     //       // NProgress.done()
//     //     }
//     //   }
//     // }
//
//     //
//     // if ( 1 ) {
//     //
//     // } else {
//     //   if ( whiteList.indexOf( to.path ) !== -1 ) {
//     //     next()
//     //   } else {
//     //     // next( `/login?redirect=${to.path}` )
//     //     next( `/` )
//     //     NProgress.done()
//     //   }
//     // }
//     next()
//     NProgress.done()
//     // if ( to.path === '/login' ) {
//     //   next( { path : '/' } )
//     //   NProgress.done()
//     // } else {
//     //   next()
//     //   NProgress.done()
//     // }
//
//     // if ( whiteList.indexOf( to.path ) !== -1 ) {
//     //   next()
//     // } else {
//     //   next( `/login` )
//     //   NProgress.done()
//     // }
//   } )
//
//   router.afterEach( () => {
//     NProgress.done()
//   } )
// } )

var getRouter

store.dispatch( 'permission/generateRoutes' )
  .then( async( res ) => {
    console.log( '后台拿到路由', res )
    router.addRoutes( res )

    router.beforeEach( async( to, from, next ) => {
      NProgress.start()
      document.title = getPageTitle( to.meta.title )
      next()
      NProgress.done()
    } )
    router.afterEach( () => {
      NProgress.done()
    } )
  } )
  .catch( () => {
    console.log( 222 )
    router.beforeEach( async( to, from, next ) => {
      NProgress.start()
      document.title = getPageTitle( to.meta.title )
      next()
      NProgress.done()
    } )
    router.afterEach( () => {
      NProgress.done()
    } )
  } )

// new Promise( ( resolve, reject ) => {
//   // setTimeout( () => {
//   //   const accessedRoutes = [
//   //     /* 工作动态*/
//   //     {
//   //       path : '/dynamic',
//   //       component : Dynamic,
//   //       redirect : '/dynamic/politics',
//   //       alwaysShow : true,
//   //       meta : {
//   //         noCache : true,
//   //         title : '工作动态'
//   //       },
//   //       children : [
//   //         {
//   //           path : 'politics',
//   //           component : () => import( '@/views/dynamic/politics' ),
//   //           name : 'Politics',
//   //           meta : {
//   //             title : '时政要闻',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'association',
//   //           component : () => import( '@/views/dynamic/association' ),
//   //           name : 'Association',
//   //           meta : {
//   //             title : '协会动态',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'member',
//   //           component : () => import( '@/views/dynamic/member' ),
//   //           name : 'Member',
//   //           meta : {
//   //             title : '会员动态',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'notice',
//   //           component : () => import( '@/views/dynamic/notice' ),
//   //           name : 'Notice',
//   //           meta : {
//   //             title : '通知公告',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'details',
//   //           component : () => import( '@/views/dynamic/details' ),
//   //           name : 'Details',
//   //           hidden : true,
//   //           meta : {
//   //             title : '详情',
//   //             noCache : true
//   //           }
//   //         }
//   //       ]
//   //     },
//   //     /* 专题服务*/
//   //     {
//   //       path : '/feature',
//   //       component : Feature,
//   //       redirect : '/feature/secretariat',
//   //       alwaysShow : true,
//   //       meta : {
//   //         noCache : true,
//   //         title : '专题服务'
//   //       },
//   //       children : [
//   //         {
//   //           path : 'secretariat',
//   //           component : () => import( '@/views/feature/secretariat' ),
//   //           name : 'Secretariat',
//   //           meta : {
//   //             title : '秘书处',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'office',
//   //           component : () => import( '@/views/feature/office' ),
//   //           name : 'Office',
//   //           meta : {
//   //             title : '党建办公室',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'science',
//   //           component : () => import( '@/views/feature/science' ),
//   //           name : 'Science',
//   //           meta : {
//   //             title : '科技创新委员会',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'international',
//   //           component : () => import( '@/views/feature/international' ),
//   //           name : 'International',
//   //           meta : {
//   //             title : '国际合作办公室',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'chapter',
//   //           component : () => import( '@/views/feature/chapter' ),
//   //           name : 'Chapter',
//   //           meta : {
//   //             title : '专业分会管理办公室',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'education',
//   //           component : () => import( '@/views/feature/education' ),
//   //           name : 'Education',
//   //           meta : {
//   //             title : '教育培训机构',
//   //             noCache : true
//   //           }
//   //         },
//   //         {
//   //           path : 'details',
//   //           component : () => import( '@/views/feature/details' ),
//   //           name : 'Details',
//   //           hidden : true,
//   //           meta : {
//   //             title : '详情',
//   //             noCache : true
//   //           }
//   //         }
//   //       ]
//   //     }
//   //   ]
//   //   resolve( accessedRoutes )
//   // }, 3000 )
//
//   store.dispatch( 'permission/generateRoutes' )
// } )
//   .then( async(res) => {
//     console.log( '后台拿到路由', res )
//
//     getRouter = res// 后台拿到路由
//     addStorageBy( 'router', getRouter ) // 存储路由到localStorage
//     router.addRoutes( getRouter ) // 动态添加路由
//
//     router.beforeEach( async( to, from, next ) => {
//       NProgress.start()
//       document.title = getPageTitle( to.meta.title )
//       next()
//       NProgress.done()
//     } )
//     router.afterEach( () => {
//       NProgress.done()
//     } )
//   } )
//   .catch( () => {} )

router.beforeEach( async( to, from, next ) => {
  NProgress.start()
  document.title = getPageTitle( to.meta.title )

  const hasToken = getCookieByKey( 'news_token' )
  if ( hasToken ) {
    if ( to.path === '/login' ) {
      next( { path : '/' } )
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if ( hasRoles ) {
        next()
      } else {
        try {
          const tokenData = {}
          tokenData.token = hasToken
          const { roles } = await store.dispatch( 'user/loginByToken', tokenData )
          const accessRoutes = await store.dispatch( 'permission/generateRoutes', roles )
          router.addRoutes( accessRoutes )
          next( { ...to, replace : true } )
        } catch ( error ) {
          await store.dispatch( 'user/resetInfo' )
          // Message.error(error || 'Has Error')
          next( `/login?redirect=${to.path}` )
          NProgress.done()
        }
      }
    }
  } else {
    if ( whiteList.indexOf( to.path ) !== -1 ) {
      next()
    } else {
      // next( `/login?redirect=${to.path}` )
      next( `/` )
      NProgress.done()
    }
  }

  // if ( to.path === '/' ) {
  //   next( { path : '/' } )
  //   NProgress.done()
  // } else {
  //   const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //   console.log( 'roles', store.getters.roles, hasRoles )
  //   if ( hasRoles ) {
  //     // next()
  //   } else {
  //     try {
  //       const accessRoutes = await store.dispatch( 'permission/generateRoutes' )
  //       console.log( '动态accessRoutes', accessRoutes )
  //       router.addRoutes( accessRoutes )
  //       // next( { ...to, replace : true } )
  //     } catch ( error ) {
  //       // await store.dispatch( 'user/resetInfo' )
  //       // // Message.error(error || 'Has Error')
  //       // next( `/login?redirect=${to.path}` )
  //       // NProgress.done()
  //     }
  //   }
  // }
  //
  // if ( 1 ) {
  //
  // } else {
  //   if ( whiteList.indexOf( to.path ) !== -1 ) {
  //     next()
  //   } else {
  //     // next( `/login?redirect=${to.path}` )
  //     next( `/` )
  //     NProgress.done()
  //   }
  // }
  next()
  NProgress.done()
  // if ( to.path === '/login' ) {
  //   next( { path : '/' } )
  //   NProgress.done()
  // } else {
  //   next()
  //   NProgress.done()
  // }

  // if ( whiteList.indexOf( to.path ) !== -1 ) {
  //   next()
  // } else {
  //   next( `/login` )
  //   NProgress.done()
  // }
} )

router.afterEach( () => {
  NProgress.done()
} )
