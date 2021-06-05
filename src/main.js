// import 'babel-polyfill'
// import 'core-js/stable'
// import Promise from 'core-js/features/promise'
// import 'regenerator-runtime/runtime'
import Vue from 'vue'
import '@/assets/fonts/fonts.css'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import './assets/iconfonts/iconfont.css'
import Element from 'element-ui'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import './icons'
import './permission'
import * as filters from './filters'

// https://www.jianshu.com/p/fe96a103f26a
import VueAwesomeSwiper from 'vue-awesome-swiper' // 导入两个组件
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.min.css' // 使用样式
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel } from 'swiper'// 导入模组
SwiperCore.use( [Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel] )// 使用模组
Vue.use( VueAwesomeSwiper, /* { default options with global component } */ )// 全局注册插件

import AOS from 'aos'
import 'aos/dist/aos.css'
Vue.use( AOS )
AOS.init( {
  easing : 'ease-out-back',
  duration : 1000
} )

Vue.use( Element, {
  size : Cookies.get( 'size' ) || 'medium'
} )

Object.keys( filters ).forEach( key => {
  Vue.filter( key, filters[key] )
} )

Vue.config.productionTip = false

new Vue( {
  el : '#app',
  router,
  store,
  render : h => h( App )
} )
