import { request, upload } from '@/api/http.js'
import { getNavsByType, getAllNavs } from '@/api/navs'

export function getRouters( data ) {
  const res = getAllNavs()
  return res
}

export function getArticle( data ) {
  return request( {
    url : '/article/list',
    method : 'get',
    data
  } )
}
export function getArticleContent( data ) {
  return request( {
    url : '/article/detail',
    method : 'get',
    data
  } )
}
// 首页 新闻列表
export function getDynmaicLists( data ) {
  return request( {
    url : '/common/homePage',
    method : 'get',
    data
  } )
}
// 首页 搜索
export function searchLists( data ) {
  return request( {
    url : '/common/homeSearch',
    method : 'get',
    data
  } )
}


export function login( data ) {
  return request( {
    url : '/user/accountLogin',
    method : 'post',
    data
  } )
}

export function tokenLogin( data ) {
  return request( {
    url : '/user/tokenLogin',
    method : 'post',
    data
  } )
}

export function logout() {
  return request( {
    url : '/user/loginOut',
    method : 'post'
  } )
}

// 首页 - 导航列表
export function getNavs( data ) {
  return request( {
    method : 'get',
    url : '/banner/list',
    data
  } )
}
// 首页 - banner列表
export function getBanners( data ) {
  return request( {
    method : 'get',
    url : '/banner/list',
    data
  } )
}

// 首页 - 新闻展示轮播列表
export function getNews( data ) {
  return request( {
    method : 'get',
    url : '/banner/list',
    data
  } )
}
// 首页 - 广告位 banner列表
export function getCases( data ) {
  return request( {
    method : 'get',
    url : '/banner/list',
    data
  } )
}
// 首页 - 友情链接
export function getLinks( data ) {
  return request( {
    method : 'get',
    url : '/friendshipLink/get',
    data
  } )
}
// 关于协会 -协会领导
export function getWorkers( data ) {
  return request( {
    method : 'get',
    url : '/staff/get',
    data
  } )
}

// 关于协会 -联系我们
export function getContacts( data ) {
  return request( {
    method : 'get',
    url : '/contacts/contacts',
    data
  } )
}






// 上传图片
export function uploadImage( data, callback ) {
  return upload( {
    url : '/upload/image',
    method : 'post',
    data,
    callback
  } )
}

// 新闻类型接口
// 修改新闻类型
export function updateNewsType( data ) {
  return request( {
    url : '/news/modifyType',
    method : 'post',
    data
  } )
}
// 修改新闻类型状态
export function changeTypeStatus( data ) {
  return request( {
    url : '/news/modifyStatus',
    method : 'post',
    data
  } )
}
// 新增新闻类型
export function createTypes( data ) {
  return request( {
    url : '/news/createType',
    method : 'post',
    data
  } )
}
// 获取新闻类型列表
export function getTypesList( data ) {
  return request( {
    url : '/news/getList',
    method : 'post',
    data
  } )
}

// 新闻文章接口
// 搜索 | 获取文章列表
export function getArticles( data ) {
  return request( {
    // url : '/news/searchNews',
    url : '/news/backNewsList',
    method : 'post',
    data
  } )
}
// 上下线文章
export function publishArticle( data ) {
  return request( {
    url : '/news/onlineNews',
    method : 'post',
    data
  } )
}
export function offlineArticle( data ) {
  return request( {
    url : '/news/offlineNews',
    method : 'post',
    data
  } )
}
// 创建新闻文章
export function createArticle( data ) {
  return request( {
    url : '/news/createNews',
    method : 'post',
    data
  } )
}
// 删除新闻文章
export function removeArticle( data ) {
  return request( {
    url : '/news/deleteNews',
    method : 'post',
    data
  } )
}
// 前台新闻列表
export function getArticleList( data ) {
  return request( {
    url : '/news/newsList',
    method : 'post',
    data
  } )
}
// 新闻文章预览
export function previewArticle( data ) {
  return request( {
    url : '/news/preview',
    method : 'post',
    data
  } )
}
// 编辑新闻文章
export function updateArticle( data ) {
  return request( {
    url : '/news/modifyNews',
    method : 'post',
    data
  } )
}
// 获取文章详情
export function getArticleDetail( data ) {
  return request( {
    url : '/news/detailNews',
    method : 'post',
    data
  } )
}
// 上传视频
export function uploadMedias( data ) {
  return upload( {
    url : '/upload/video',
    method : 'post',
    data
  } )
}

