<template>
  <div v-loading="loading" class="gray-bg index-mienContent aos-init aos-animate" data-aos="fade-up" data-aos-duration="1300">
    <div class="w1200">
      <div class="section--header clearfix">
        <div class="fl">
          <span class="section--border" />
          <div class="section--title syBold">重点会员风采</div>
        </div>
        <span class="more-link fr syRegular" @click="goDemeanor">更多</span>
      </div>
      <div class="mien-swiper-container swiper-container">
        <swiper
          ref="swiperMien"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="( item, index ) in getList"
            :key="index + '_miens' "
          >
            <div class="mien-swiper--list clearfix">
              <div
                v-for="mimeItem in item"
                :key="mimeItem.id"
                class="mien-swiper--item fl"
                @click="handleClick( mimeItem )"
              >
                <div class="img-box">
                  <img :draggable="false" class="mien-swiper--img" :src="mimeItem.url" alt="">
                </div>
                <div class="mien-swiper-txt ellipsis syRegular">{{ mimeItem.title }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import * as request from '@/api/request'
import { changeData } from '@/utils/tools'
export default {
  name : 'Mien',
  data() {
    return {
      host : 'http://',
      loading : true,
      swiperOptions : {
        slidesPerView : 1,
        grabCursor : true,
        spaceBetween : 50,
        centeredSlides : true,
        autoplay : false,
        loop : false,
        observeParents : true,
        observeSlideChildren : true,
        observer : true
      },
      list : []
    }
  },
  computed : {
    getList() {
      // console.log( 'getList', changeData( 5, this.list ) )
      return changeData( 5, this.list )
    }
  },
  async created() {
    this.host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
    await this.getArticleList()
  },
  mounted() {},
  methods : {
    handleClick( data ) {
      this.$router.push( { path : '/member/details', query : { id : data.id }} )
    },
    async goDemeanor() {
      this.$router.push( '/member/demeanor' )
    },
    // 获取列表请求
    async getArticleList() {
      const that = this
      that.loading = true
      const params = {
        type : 23,
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getArticle( params )
        data.list.forEach( item => {
          item.url = that.host + item.preview
        } )
        // console.log( '重点会员风采', JSON.parse( JSON.stringify( data.list ) ) )
        that.total = data.count
        that.list = data.list
      } catch ( e ) {
        console.log( '首页-重点会员风采请求错误', e )
      } finally {
        that.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /*重点会员风采*/
  .index-mienContent{
    padding-bottom: 30px;
    height: 253px;
    box-sizing: border-box;
    .mien-swiper-container{
      margin-left: -5px;
      margin-right: -5px;
      .mien-swiper--item{
        position: relative;
        width: 224px;
        margin: 0 9px;
        height: 160px;
        padding: 0;
        .img-box{
          width: 224px;
          height: 126px;
          overflow: hidden;
          position: relative;
          &:hover .mien-swiper--img{
            transform: scale(1.1);
          }
        }
        .mien-swiper--img{
          transition: all 0.26s;
          width: 224px;
          height: 126px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .mien-swiper-txt{
          width: 100%;
          height: 25px;
          position: absolute;
          left: 0;
          bottom: 0;
          color: rgba(16, 16, 16, 100);
          font-size: 16px;
          line-height: 25px;
        }
      }
    }
  }
</style>
