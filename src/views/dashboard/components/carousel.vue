<template>
  <div
    v-loading="loading"
    class="index-showContent aos-init aos-animate"
    data-aos="fade-up"
    data-aos-duration="1700"
  >
    <div class="w1200 clearfix">
      <div class="swiper-container show-swiper-container">
        <swiper
          ref="swiperShow"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="banner in list"
            :key="banner.id"
          >
            <div class="index-swiper--link" @click="handleClick(banner)">
              <img :draggable="false" :src="banner.url || host + banner.path" alt="banner轮播图">
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import * as request from '@/api/request'
import { changeBanners } from '@/utils/tools'
import { getNavsByType } from '@/api/navs'
// eslint-disable-next-line no-unused-vars
// const _ = require( 'lodash' )
export default {
  name : 'Carousel',
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
        // observeParents : true,
        // observeSlideChildren : true,
        // observer : true,
      },
      list : []
    }
  },
  async created() {
    this.host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
    await this.getBannerList()
  },
  methods : {
    async handleClick( data ) {
      // console.log( 'handleClick', { ...data } )
      const { types, redirect, id } = data
      if ( types == 2 ) {
        const res = redirect.split( '-' ).map( item => parseInt( item ) )
        const { path } = getNavsByType( res[0] )
        this.$router.push( { path : `${path}/details`, query : { id : res[2] }} )
      } else if ( types == 3 ) {
        const name = `newwindow_${id}_${redirect}`
        window.open( redirect, name )
      }
    },
    async getBannerList() {
      const that = this
      that.loading = true
      const params = {
        type : 2, // 状态筛选 1：大 banner 2  小 banner
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getBanners( params )
        that.total = data.count
        that.list = changeBanners( data.list )
        // console.log( '广告轮播 ', _.cloneDeep( that.list ) )
      } catch ( e ) {
        console.log( '广告轮播请求错误', e )
      } finally {
        that.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /*轮播 展示区域*/
  .index-showContent{
    height: 160px;
    margin: 30px 0;
    .show-swiper-container{
      height: 160px;
      img{
        height: 160px;
      }
    }
  }
</style>
