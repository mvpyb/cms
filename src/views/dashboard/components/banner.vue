<template>
  <div v-loading="loading" class="slide">
    <div class="block teswst">
      <swiper ref="bannerSwiper" :options="swiperOptions">
        <swiper-slide
          v-for="banner in bannerList"
          :key="banner.id"
        >
          <div class="index-swiper--link" @click="handleClick( banner ) ">
            <img :draggable="false" :src="banner.url || host + banner.path" alt="banner轮播图">
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// // https://swiperjs.com/vue/
// import 'swiper/swiper-bundle.min.css'
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper' // 使用大佬包装的组件
// // 使用swiper6的模组扩展
// import SwiperCore, { Autoplay, Navigation } from 'swiper'
// // Import Swiper styles
// SwiperCore.use( [Navigation, Autoplay] ) // 注册模块
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import 'swiper/swiper.scss'
// // import 'swiper/components/navigation/navigation.scss'
// // import 'swiper/components/pagination/pagination.scss'
// // import 'swiper/components/scrollbar/scrollbar.scss'
// SwiperCore.use( [Navigation, Pagination, Scrollbar, A11y] )

import * as request from '@/api/request'
import { changeBanners } from '@/utils/tools'
import { getNavsByType } from '@/api/navs'
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )
export default {
  name : 'Banner',
  data() {
    return {
      host : 'http://',
      loading : false,
      total : 0,
      swiperOptions : {
        slidesPerView : 1,
        grabCursor : true,
        spaceBetween : 50,
        centeredSlides : true,
        autoplay : {
          delay : 4000,
          disableOnInteraction : false
        },
        loop : false
      },
      bannerList : []
    }
  },
  async created() {
    this.host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
    await this.getBannerList()
  },
  methods : {
    handleClick( data ) {
      // console.log( 'handleClick', { ...data } )
      const { types, redirect, id } = data
      // 1 不关联 2 本地文章， 3 外链
      if ( types == 2 ) {
        const res = redirect.split( '-' ).map( item => parseInt( item ) )
        const { path } = getNavsByType( res[0] )
        this.$router.push( { path : `${path}/details`, query : { id : res[2] }} )
      } else if ( types == 3 ) {
        const name = `newwindow_${id}_${redirect}`
        window.open( redirect, name )
      }
    },
    // 获取banner
    async getBannerList() {
      const that = this
      that.loading = true
      const params = {
        // 状态筛选 1：大 banner 2  小 banner
        type : 1,
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getBanners( params )
        that.total = data.count
        that.bannerList = changeBanners( data.list )
        // console.log( 'that.bannerList', JSON.parse( JSON.stringify( that.bannerList ) ) )
      } catch ( e ) {
        console.log( '首页- 后去banner请求错误', e )
      } finally {
        that.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 100%;
  }
   .slide {
     height: 385px;
     overflow: hidden;
     position: relative;
     .block {
       width: 100%;
       height: 100%;
     }
     .swiper-slide{
       width: 100%;
       height: 100%;
       img{
         width: 100%;
         height: 385px;
       }
     }
   }
</style>
