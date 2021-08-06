import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure( { showSpinner : false } )
import { getRouters } from '@/api/request'

let getRouter

router.beforeEach( async( to, from, next ) => {
  NProgress.start()
  document.title = getPageTitle( to.meta.title )
  if ( !getRouter ) {
    getRouter = await getRouters()
    await routerGo( to, next, getRouter )
    NProgress.done()
  } else {
    next()
    NProgress.done()
  }
} )

async function routerGo( to, next ) {
  // getRouter = await store.dispatch( 'permission/generateRoutes', ['admin'] )
  getRouter = await store.dispatch( 'permission/getAsyncRoutes', getRouter )
  router.addRoutes( getRouter ) // 动态添加路由
  next( { ...to, replace : true } )
}
