const getters = {
  sidebar : state => state.app.sidebar,
  size : state => state.app.size,
  device : state => state.app.device,
  visitedViews : state => state.tagsView.visitedViews,
  cachedViews : state => state.tagsView.cachedViews,
  permission_routes : state => state.permission.routes,
  errorLogs : state => state.errorLog.logs,

  // 用户信息
  token : state => state.user.token,
  avatar : state => state.user.avatar,
  name : state => state.user.name,
  gender : state => state.user.gender,
  phone : state => state.user.phone,
  email : state => state.user.email,
  idNum : state => state.user.idNum,
  address : state => state.user.address,
  birthday : state => state.user.birthday,
  country : state => state.user.country,
  language : state => state.user.language,
  introduction : state => state.user.introduction,
  roles : state => state.user.roles
}
export default getters
