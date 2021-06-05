import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission( roles, route ) {
  if ( route.meta && route.meta.roles ) {
    return roles.some( role => route.meta.roles.includes( role ) )
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes( routes, roles ) {
  const res = []
  routes.forEach( route => {
    const tmp = { ...route }
    if ( hasPermission( roles, tmp ) ) {
      if ( tmp.children ) {
        tmp.children = filterAsyncRoutes( tmp.children, roles )
      }
      res.push( tmp )
    }
  } )
  return res
}

const _import = require( '@/router/_import_' + process.env.NODE_ENV ) // 获取组件的方法
import Layout from '@/layout'
import About from '@/layout/about'
import Dynamic from '@/layout/dynamic'
import Feature from '@/layout/feature'
import Member from '@/layout/member'
const whiteList = {
  Layout, About, Dynamic, Feature, Member
}
// 递归后台传来的路由字符串，转换为路由组件对象
export function changeObjectToRouter( asyncRouterMap ) {
  // console.log( 'asyncRouterMap', asyncRouterMap )
  const accessedRouters = asyncRouterMap.filter( route => {
    if ( route.component ) {
      if ( whiteList[route.component] ) {
        route.component = whiteList[route.component]
      } else {
        route.component = _import( route.component )
      }
    }
    if ( route.children && route.children.length ) {
      route.children = changeObjectToRouter( route.children )
    }
    return true
  } )
  return accessedRouters
}

const state = {
  // routes : [],
  routes : constantRoutes,
  addRoutes : []
}

const mutations = {
  SET_ROUTES : ( state, routes ) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat( routes )
  }
}

const actions = {
  // 获取权限路由
  generateRoutes( { commit }, roles ) {
    return new Promise( resolve => {
      let accessedRoutes
      if ( roles.includes( 'admin' ) ) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes( asyncRoutes, roles )
      }
      commit( 'SET_ROUTES', accessedRoutes )
      resolve( accessedRoutes )
    } )
  },
  // 后台返回的动态路由
  getAsyncRoutes( { commit }, routers ) {
    return new Promise( resolve => {
      const accessedRoutes = changeObjectToRouter( routers )
      commit( 'SET_ROUTES', accessedRoutes )
      resolve( accessedRoutes )
    } )
  }
}

export default {
  namespaced : true,
  state,
  mutations,
  actions
}
