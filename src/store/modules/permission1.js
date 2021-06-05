import { asyncRoutes, constantRoutes } from '@/router'
import Dynamic from '@/layout/dynamic'
import Feature from '@/layout/feature'
import About from '@/layout/about'
import Member from '@/layout/member'

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

// https://segmentfault.com/a/1190000015419713
// https://github.com/Mrblackant/dynamicRouter

// const _import = require( './router/_import_' + process.env.NODE_ENV )// 获取组件的方法
// const _import = file => () => import('@/views/' + file + '.vue')
// const _import = file => require('@/views/' + file + '.vue').default // developer
import tye from '@/layout/about' // Layout 是架构组件，不在后台返回，在文件里单独引入
import About1 from '@/layout/about'
import Dynamic1 from '@/layout/dynamic'
import Feature1 from '@/layout/feature'
import Member1 from '@/layout/member'
// console.log( 'About', About )
const whiteList = {
  About : About1, Dynamic : Dynamic1, Feature : Feature1, Member : Member1
}
// console.log( 'whiteList', whiteList )

export function filterAsyncRouter( asyncRouterMap ) {
  const accessedRouters = asyncRouterMap.filter( route => {
    if ( route.component ) {
      if ( whiteList[route.component] ) {
        route.component = whiteList[route.component]
      }
      // else {
      //   route.component = _import( route.component )
      // }
    }
    // if ( route.children && route.children.length ) {
    //   route.children = filterAsyncRouter( route.children )
    // }
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
  generateRoutes( { commit }, roles ) {
    return new Promise( resolve => {
      let accessedRoutes
      setTimeout( () => {
        accessedRoutes = [
          /* 关于协会*/
          {
            path : '/about',
            component : 'About',
            redirect : '/about/index',
            alwaysShow : true,
            meta : {
              noCache : true,
              title : '关于协会'
              // icon : 'project'
            },
            children : [
              {
                path : 'index',
                component : () => import( '@/views/about/index' ),
                name : 'Index',
                meta : {
                  title : '协会简介',
                  noCache : true
                }
              },
              {
                path : 'rule',
                component : () => import( '@/views/about/rule' ),
                name : 'Rule',
                meta : {
                  title : '协会章程',
                  noCache : true
                }
              },
              {
                path : 'organization',
                component : () => import( '@/views/about/organization' ),
                name : 'Organization',
                meta : {
                  title : '组织架构',
                  noCache : true
                }
              },
              {
                path : 'leader',
                component : () => import( '@/views/about/leader' ),
                name : 'Leader',
                meta : {
                  title : '协会领导',
                  noCache : true
                }
              },
              {
                path : 'join',
                component : () => import( '@/views/about/join' ),
                name : 'Join',
                meta : {
                  title : '人才招聘',
                  noCache : true
                }
              },
              {
                path : 'jobDetail',
                component : () => import( '@/views/about/jobDetail' ),
                hidden : true,
                name : 'JobDetail',
                meta : {
                  title : '招聘详情',
                  noCache : true
                }
              },
              {
                path : 'contacts',
                component : () => import( '@/views/about/contacts' ),
                name : 'Contacts',
                meta : {
                  title : '联系我们',
                  noCache : true
                }
              }

            ]
          },
          /* 工作动态*/
          {
            path : '/dynamic',
            component : 'Dynamic',
            redirect : '/dynamic/politics',
            alwaysShow : true,
            meta : {
              noCache : true,
              title : '工作动态'
            },
            children : [
              {
                path : 'politics',
                component : () => import( '@/views/dynamic/politics' ),
                name : 'Politics',
                meta : {
                  title : '时政要闻',
                  noCache : true
                }
              },
              {
                path : 'association',
                component : () => import( '@/views/dynamic/association' ),
                name : 'Association',
                meta : {
                  title : '协会动态',
                  noCache : true
                }
              },
              {
                path : 'member',
                component : () => import( '@/views/dynamic/member' ),
                name : 'Member',
                meta : {
                  title : '会员动态',
                  noCache : true
                }
              },
              {
                path : 'notice',
                component : () => import( '@/views/dynamic/notice' ),
                name : 'Notice',
                meta : {
                  title : '通知公告',
                  noCache : true
                }
              },
              {
                path : 'details',
                component : () => import( '@/views/dynamic/details' ),
                name : 'Details',
                hidden : true,
                meta : {
                  title : '详情',
                  noCache : true
                }
              }
            ]
          },
          /* 专题服务*/
          {
            path : '/feature',
            component : 'Feature',
            redirect : '/feature/secretariat',
            alwaysShow : true,
            meta : {
              noCache : true,
              title : '专题服务'
            },
            children : [
              {
                path : 'secretariat',
                component : () => import( '@/views/feature/secretariat' ),
                name : 'Secretariat',
                meta : {
                  title : '秘书处',
                  noCache : true
                }
              },
              {
                path : 'office',
                component : () => import( '@/views/feature/office' ),
                name : 'Office',
                meta : {
                  title : '党建办公室',
                  noCache : true
                }
              },
              {
                path : 'science',
                component : () => import( '@/views/feature/science' ),
                name : 'Science',
                meta : {
                  title : '科技创新委员会',
                  noCache : true
                }
              },
              {
                path : 'international',
                component : () => import( '@/views/feature/international' ),
                name : 'International',
                meta : {
                  title : '国际合作办公室',
                  noCache : true
                }
              },
              {
                path : 'chapter',
                component : () => import( '@/views/feature/chapter' ),
                name : 'Chapter',
                meta : {
                  title : '专业分会管理办公室',
                  noCache : true
                }
              },
              {
                path : 'education',
                component : () => import( '@/views/feature/education' ),
                name : 'Education',
                meta : {
                  title : '教育培训机构',
                  noCache : true
                }
              },
              {
                path : 'details',
                component : () => import( '@/views/feature/details' ),
                name : 'Details',
                hidden : true,
                meta : {
                  title : '详情',
                  noCache : true
                }
              }
            ]
          },
          /* 会员天地*/
          {
            path : '/member',
            component : 'Member',
            redirect : '/member/membership',
            alwaysShow : true,
            meta : {
              noCache : true,
              title : '会员天地'
            },
            children : [
              {
                path : 'membership',
                component : () => import( '@/views/member/membership' ),
                name : 'Membership',
                meta : {
                  title : '入会条件',
                  noCache : true
                }
              },
              {
                path : 'demeanor',
                component : () => import( '@/views/member/demeanor' ),
                name : 'Demeanor',
                meta : {
                  title : '会员风采',
                  noCache : true
                }
              },
              {
                path : 'details',
                component : () => import( '@/views/member/details' ),
                name : 'Details',
                hidden : true,
                meta : {
                  title : '详情',
                  noCache : true
                }
              }
            ]
          }
        ]
        const result = filterAsyncRouter( accessedRoutes )
        commit( 'SET_ROUTES', result )
        resolve( accessedRoutes )
      }, 3000 )

      // if ( roles.includes( 'admin' ) ) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes( asyncRoutes, roles )
      // }
      // commit( 'SET_ROUTES', accessedRoutes )
      // resolve( accessedRoutes )
    } )
  }
}

export default {
  namespaced : true,
  state,
  mutations,
  actions
}
