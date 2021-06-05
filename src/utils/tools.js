
import GLOBAL_DATA from '@/api/global.js'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// 获取设备指纹
export const getFingerprint = async() => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  const visitorId = result.visitorId
  return visitorId
}

// 获取当前env环境名称
export function getEnvs() {
  const env = process.env.NODE_ENV
  const href = window.location.href
  let envStr = ''
  if ( env === 'development' ) {
    envStr = 'dev'
  } else {
    if ( href.indexOf( 'fat' ) >= 0 ) {
      envStr = 'fat'
    } else if ( href.indexOf( 'uat' ) >= 0 ) {
      envStr = 'uat'
    } else {
      envStr = 'pro'
    }
  }
  return envStr
}

// 根据环境获取URL
export function initUrl() {
  const envStr = getEnvs()
  const baseUrl = envStr === 'dev' ? process.env.VUE_APP_BASE_URL : GLOBAL_DATA[envStr]['baseUrl']
  return {
    baseUrl
  }
}
// 根据当前 协议名称 自动转化url（https  http 互转）
export function changeProtocol( url ) {
  const protocol = window.location.protocol
  let result
  if ( protocol.startsWith( 'https' ) && !url.startsWith( 'https' ) ) {
    result = 'https' + url.substring( 4 )
  } else if ( !protocol.startsWith( 'https' ) && url.startsWith( 'https' ) ) {
    result = 'http' + url.substring( 5 )
  }
  return result
}

// 时间格式互转 s =>
export function secondsToStr( temp ) {
  const years = Math.floor( temp / 31536000 )
  if ( years ) {
    return years + ' year' + numberEnding( years )
  }
  const days = Math.floor( ( temp %= 31536000 ) / 86400 )
  if ( days ) {
    return days + ' day' + numberEnding( days )
  }
  const hours = Math.floor( ( temp %= 86400 ) / 3600 )
  if ( hours ) {
    return hours + ' hour' + numberEnding( hours )
  }
  const minutes = Math.floor( ( temp %= 3600 ) / 60 )
  if ( minutes ) {
    return minutes + ' minute' + numberEnding( minutes )
  }
  const seconds = temp % 60
  return seconds + ' second' + numberEnding( seconds )
  function numberEnding( number ) {
    return ( number > 1 ) ? 's' : ''
  }
}

export function kebabCase( s ) {
  return s.replace( /[A-Z]/g, ( m ) => `-${m.toLowerCase()}` )
}

// 获取文件大小
export function getFileSizes( size ) {
  let num
  const size1 = size / 1024
  if ( size1 >= 512000 ) {
    num = ( size1 / 1024 / 1024 ).toFixed( 1 ) + 'GB'
  } else if ( size1 >= 500 && size1 <= 512000 ) {
    num = ( size1 / 1024 ).toFixed( 1 ) + 'MB'
  } else {
    num = size1.toFixed( 1 ) + 'KB'
  }
  return num
}

// 获取文件的临时路径 blob:....
export const getObjectURL = async( file ) => {
  let url = null
  if ( window.createObjectURL != undefined ) { // basic
    url = await window.createObjectURL( file )
  } else if ( window.URL != undefined ) { // mozilla(firefox)
    url = await window.URL.createObjectURL( file )
  } else if ( window.webkitURL != undefined ) { // webkit or chrome
    url = await window.webkitURL.createObjectURL( file )
  }
  return {
    url
  }
}
// 读取image 用来验证图片宽高大小等
export function readImage( file, success, error ) {
  const reader = new FileReader()
  reader.readAsDataURL( file )
  reader.onload = () => {
    const image = new Image()
    image.src = reader.result
    image.onload = () => {
      success && success( {
        image,
        url : reader.result
      } )
    }
  }
  reader.onerror = () => {
    error && error()
  }
}
// 读取文件， 用来验证文件
export function readFiles( file, success, error ) {
  const reader = new FileReader()
  reader.readAsDataURL( file )
  reader.onload = () => {
    success && success( {
      url : reader.result
    } )
  }
  reader.onerror = () => {
    error && error()
  }
}
// 把一维数组转为二维， 每个维度最多5个
export function changeData( num, arr ) {
  const iconsArr = [] // 声明数组
  arr.forEach( ( item, index ) => {
    const page = Math.floor( index / num ) // 计算该元素为第几个素组内
    if ( !iconsArr[page] ) { // 判断是否存在
      iconsArr[page] = []
    }
    iconsArr[page].push( item )
  } )
  return iconsArr
}

// 修改导航数据
export function chagneNavs( data ) {
  let result
  if ( data.length == 0 ) {
    result = []
  } else {
    data.forEach( item => {
      const nav = {}
      result.push( nav )
    } )
  }
}

// 首页 大banner 数据 TODO
export function changeBanners( data ) {
  let result = []
  if ( data.length > 0 ) {
    // const protocol = location.protocol
    const protocol = location.href.startsWith( 'https' ) ? 'https://' : 'http://'
    data.forEach( item => {
      result.push( {
        ...item,
        url : protocol + item.path,
        // url : require( '@/assets/test/swiper-banner.png' )
      } )
    } )
  } else {
    result = []
  }
  return result
}

// 关于协会 -协会领导 - 友情链接
export function changeWorkers( data, host ) {
  let result = []
  if ( data.length > 0 ) {
    const protocol = location.href.startsWith( 'https' ) ? 'https://' : 'http://'
    data.forEach( item => {
      if ( item.children.length > 0 ) {
        item.children.forEach( child => {
          child.url = child.photo ? protocol + host + child.photo : ''
          // child.url = require( '@/assets/test/swiper-banner.png' )
        } )
      }
    } )
    result = [...data]
  } else {
    result = []
  }
  return result
}


// TODO 以下组件待整改
// // alert 错误提示
// export function alertMsg(self, message, title = '错误', confirmButtonText = '是') {
//   return self.$alert(`${message}`, title, {
//       customClass: 'describe-contacts-msg-box custom-msg-box center-btn',
//       showClose: false,
//       confirmButtonClass: 'success-btn ',
//       confirmButtonText: confirmButtonText
//     })
//     .then(res => {
//       return new Promise(resolve => {
//         resolve(res)
//       })
//     })
// }
//
// // confirm 错误提示
// export function confirmMsg(self, params) {
//   return self.$confirm(`${params.message}`, params.title ? params.title : '提示',
//     {
//       customClass: params.customClass ? params.customClass : 'describe-contacts-msg-box custom-msg-box',
//       showClose: params.showClose ? params.showClose : false,
//       cancelButtonClass: params.cancelButtonClass ? params.cancelButtonClass : 'w100',
//       cancelButtonText: params.cancelButtonText ? params.cancelButtonText : '取消',
//       confirmButtonClass: params.confirmButtonClass ? params.confirmButtonClass : 'purple-btn',
//       confirmButtonText: params.confirmButtonText ? params.confirmButtonText : '确定',
//       dangerouslyUseHTMLString: params.dangerouslyUseHTMLString ? params.dangerouslyUseHTMLString : false
//     })
// }
//
// export function unsupportRtc(self, title = '', confirmButtonText = '是') {
//   const msg = `<div class="custom-unsupport-info">
//                     <p class="item title"> <i class="el-icon-warning"></i> <span>注意</span></p>
//                     <p class="item support-version">本系统最低支持浏览器为Chrome 60</p>
//                     <p class="item error-msg" style="color: red;font-weight:bold;">当前浏览器不支持，无法正常使用上传文件夹功能。</p>
//                     <p class="item">建议您立即前往 <a class="download-link" href="https://www.google.cn/chrome/" target="_blank" style="color:#46a6ff">>https://www.google.cn/chrome/</a> 下载最新Chrome浏览器，重新打开网页即可。
//                    </p>
//                  </div>`
//   self.$alert(`${msg}`, title, {
//     customClass: 'describe-contacts-msg-box custom-msg-box center-btn white-bg',
//     showClose: false,
//     closeOnClickModal: true,
//     closeOnPressEscape: true,
//     dangerouslyUseHTMLString: true,
//     confirmButtonClass: 'success-btn ',
//     confirmButtonText: confirmButtonText
//   })
//     .then(res => {
//       return new Promise(resolve => {
//         resolve(res)
//       })
//     })
// }
