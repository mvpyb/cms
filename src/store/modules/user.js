// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

import { tokenLogin, logout } from '@/api/request'
import { getCookieByKey, setCookie, clearAllCookies } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token : getCookieByKey( 'news_token' ),
  avatar : 'https://resources.shadowcreator.com/studio/avatar/3.png?imageView2/1/w/80/h/80',
  nickName : '',
  name : '',
  gender : '',
  phone : '',
  email : '',
  address : '',
  birthday : '',
  country : '',
  language : '',
  roles : []
  // introduction: '',
}

const mutations = {
  SET_TOKEN : ( state, token ) => {
    state.token = token || ''
  },
  SET_USERINFOS( state, data ) {
    state.nickName = data.nickName || ''
    state.token = data.token || getCookieByKey( 'news_token' )
    state.name = data.name || ''
    state.gender = data.gender || ''
    state.phone = data.phone || ''
    state.email = data.email
    state.address = data.address
    state.birthday = data.birthday
    state.country = data.country || '中国'
    state.language = data.language
    state.roles = data.roles
  },
  CLEAR_USERINFOS( state ) {
    state.nickName = ''
    state.token = ''
    state.name = ''
    state.gender = ''
    state.phone = ''
    state.email = ''
    state.address = ''
    state.country = ''
    state.language = ''
    state.roles = []
  },
  SET_ROLES : ( state, roles ) => {
    state.roles = roles
  }

  // SET_INTRODUCTION: (state, introduction) => {
  //   state.introduction = introduction
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
}

const actions = {
  // 用户登录成功之后， 保存token
  saveToken( { commit, state, dispatch }, params ) {
    commit( 'SET_TOKEN', params )
    setCookie( 'news_token', params )
  },
  // token 登录
  loginByToken( { commit, state }, payload ) {
    return new Promise( ( resolve, reject ) => {
      tokenLogin( payload )
        .then( response => {
          const { data, code } = response
          if ( !data || code !== 200 ) {
            reject( 'token登录失败' )
          }
          // data.roles = [getRoles( data.authorityId )]
          data.roles = ['admin']
          data.token = payload.token
          commit( 'SET_USERINFOS', data )
          setCookie( 'news_nickName', data.nickName )
          setCookie( 'news_phone', data.phone )
          setCookie( 'news_token', data.token )
          setCookie( 'news_id', data.id )
          setCookie( 'news_uid', data.uid )
          setCookie( 'news_uuid', data.uuid )
          setCookie( 'news_authorityId', data.authorityId )
          resolve( data )
        } )
        .catch( error => {
          reject( error )
          commit( 'CLEAR_USERINFOS' )
          clearAllCookies()
          resetRouter()
        } )
    } )
  },
  // 退出
  LoginOut( { dispatch } ) {
    return new Promise( ( resolve, reject ) => {
      logout()
        .then( () => {
          dispatch( 'user/resetInfo', null, { root : true } )
          resolve()
        } )
        .catch( error => {
          reject( error )
        } )
    } )
  },
  // 清空所有登录信息
  resetInfo( { commit, dispatch } ) {
    return new Promise( ( resolve, reject ) => {
      commit( 'CLEAR_USERINFOS' )
      clearAllCookies()
      resetRouter()
      dispatch( 'tagsView/delAllViews', null, { root : true } )
      resolve()
    } )
  }

  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  //
  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //       const { roles, name, avatar, introduction } = data
  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }
  //
  //       commit('SET_ROLES', roles)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       commit('SET_INTRODUCTION', introduction)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  //
  // // user logout
  // logout({ commit, state, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       commit('SET_ROLES', [])
  //       removeToken()
  //       resetRouter()
  //
  //       // reset visited views and cached views
  //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //       dispatch('tagsView/delAllViews', null, { root: true })
  //
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  //
  // // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     commit('SET_ROLES', [])
  //     removeToken()
  //     resolve()
  //   })
  // },
  //
  // // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token'
  //
  //   commit('SET_TOKEN', token)
  //   setToken(token)
  //
  //   const { roles } = await dispatch('getInfo')
  //
  //   resetRouter()
  //
  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes)
  //
  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true })
  // }
}

export default {
  namespaced : true,
  state,
  mutations,
  actions
}
