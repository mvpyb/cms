<template>
  <div v-loading="loading" class="w1200 pt15 index-newsContent clearfix">
    <div
      class="index-newsleft fl aos-init aos-animate"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <swiper
        ref="indexNewsImgSwiper"
        :options="swiperOptions"
        class="swiper-no-swiping"
      >
        <swiper-slide
          v-for="item in tabs"
          :key="'imgs_' + item.id"
          class="linka"
        >
          <div class="index-swiper--link" @click="handleClick(item)">
            <img :draggable="false" :src="item.url" :alt="item.title">
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div
      class="index-newsright fr aos-init aos-animate"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div class="js-indexCommittee">
        <div class="js-tabs">
          <div class="tabs clearFloat">
            <span
              v-for="item in tabs"
              :key="item.tIndex"
              class="linka"
              :class="{'active' : item.selected}"
              @mouseenter="mouseEnter(item)"
              @mouseleave="mouseLeave(item)"
            >{{ item.name }}</span>
          </div>
        </div>
        <div class="index-newsrightcot">
          <swiper
            ref="indexNewsSwiper"
            :options="swiperOptions"
            class="swiper-no-swiping"
          >
            <swiper-slide
              v-for="item in tabs"
              :key=" 'news_' + item.id"
              class="linka"
            >
              <div class="index-swiper-news--link">
                <div v-if="item.title || item.id">
                  <div class="index-news--title syBold ellipsis" @click="handleClick(item)">
                    {{ item.title }}
                  </div>
                  <div class="index-news--sub-title sub-txt" @click="handleClick(item)">
                    {{ item.digest | subStringStr(82) }}
                  </div>
                  <div class="driver" />
                  <div
                    v-for="news in item.realted"
                    :key="item.id + '_' + news.id"
                    class="index-news--list"
                  >
                    <div class="index-news--list-item clearfix" @click="handleClick(news)">
                      <div class="sub-txt index-news--list-title ellipsis fl">
                        {{ news.title }}
                      </div>
                      <div class="sub-txt index-news--list-time fr">
                        {{ news.publishTime | formatDate1 }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="empty">
                  <svg-icon class-name="svg-icons" icon-class="empty" />
                  <div class="empty-txt">什么也没有...</div>
                </div>

              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as request from '@/api/request'
import { mapState } from 'vuex'
export default {
  name : 'Notices',
  data() {
    return {
      host : 'http://',
      loading : true,
      total : 0,
      // 当前获取新闻的ID
      currentId : '',
      swiperOptions : {
        slidesPerView : 1,
        grabCursor : false,
        spaceBetween : 50,
        centeredSlides : true,
        autoplay : false,
        loop : false
      },
      currentIndex : 0,
      tabs : [],
      navs : []
    }
  },
  computed : {
    ...mapState( {
      routes : state => state.permission.routes
    } ),
    imgSwiper() {
      return this.$refs.indexNewsImgSwiper.$swiper
    },
    swiper() {
      return this.$refs.indexNewsSwiper.$swiper
    },
    // getCurrentNav() {
    //   console.log( 'this.routes', this.routes )
    //   // const currentRoutes = this.$router.options.routes.find( item => item.path == '/dynamic' )
    //   const currentRoutes = this.routes.find( item => item.path == '/dynamic' )
    //   if ( currentRoutes ) {
    //     const { children } = currentRoutes
    //     return children.filter( item => {
    //       item.selected = item.id == this.currentId
    //       if ( item.hidden !== true ) {
    //         return true
    //       } else {
    //         return false
    //       }
    //     } )
    //   } else {
    //     return []
    //   }
    // },
  },
  async created() {
    this.host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
    await this.getArticleList()
  },
  async mounted() {
    this.imgSwiper.slideToLoop( this.currentIndex, 1000, false )
    this.swiper.slideToLoop( this.currentIndex, 1000, false )
  },
  methods : {
    // 点击文章
    async handleClick( data ) {
      // console.log( '点击文章', { ...data } )
      this.$router.push( {
        path : '/dynamic/details',
        query : {
          id : data.id
        }
      } )
    },
    changeData( data, nav ) {
      let result
      let navName
      let tIndex
      let routers
      if ( nav == 'politics' ) {
        navName = '时政要闻'
        routers = '/dynamic/politics'
        tIndex = 12
      } else if ( nav == 'association' ) {
        routers = '/dynamic/association'
        navName = '协会动态'
        tIndex = 13
      } else if ( nav == 'member' ) {
        navName = '会员动态'
        routers = '/dynamic/member'
        tIndex = 14
      } else if ( nav == 'notice' ) {
        navName = '通知公告'
        routers = '/dynamic/notice'
        tIndex = 15
      }
      if ( data.length > 0 ) {
        result = {
          ...data[0],
          routers : routers,
          name : navName,
          tIndex : tIndex,
          selected : false,
          url : this.host + data[0].preview,
          realted : data.slice( 1 )
        }
      } else {
        result = {}

        result = {
          routers : routers,
          name : navName,
          tIndex : tIndex,
          selected : false,
        }
      }
      return result
    },
    // 获取列表请求 每个导航返回前5个文章
    async getArticleList() {
      const that = this
      that.listLoading = true
      const params = {}
      try {
        const { data } = await request.getDynmaicLists( params )
        const { politics, association, member, notice } = data
        const politicsData = this.changeData( politics, 'politics' )
        const associationData = this.changeData( association, 'association' )
        const memberData = this.changeData( member, 'member' )
        const noticeData = this.changeData( notice, 'notice' )
        this.tabs = [
          {
            ...politicsData,
            selected : true
          },
          associationData, memberData, noticeData]
        console.log( 'this.tabs', JSON.parse( JSON.stringify( this.tabs ) ) )
      } catch ( e ) {
        this.tabs = []
        console.log( '获取首页所需文章列表请求出错', e )
      } finally {
        that.loading = false
      }
    },
    mouseEnter( data ) {
      this.tabs.forEach( ( item, index ) => {
        const selected = item.tIndex == data.tIndex
        if ( item.tIndex == data.tIndex ) {
          this.currentIndex = index
        }
        this.tabs.splice( index, 1, {
          ...item,
          selected
        } )
      } )
      this.imgSwiper.slideToLoop( this.currentIndex, 1000, false )
      this.swiper.slideToLoop( this.currentIndex, 1000, false )
    },
    mouseLeave( data ) {

    }
  }
}
</script>

<style lang="scss" scoped>
  /*新闻 - swiper*/
  .index-newsContent {
    height: 320px;
    background-color: #fff;
  }
  .index-newsleft{
    width: 570px;
    height: 320px;
    img {
      width: 570px;
      height: 320px;
    }
  }
  .index-newsright {
    width: 600px;
    height: 320px;
  }
  /*tab*/
  .js-indexCommittee {
    height: 320px;
    overflow: hidden;
    .js-tabs {
      position: relative;
      margin-bottom: 10px;
      .tabs {
        background: #eee;
        height: 45px;
        line-height: 45px;
        font-size: 0;
        border-bottom: 1px solid #dddddd;
        span {
          cursor: pointer;
          display: inline-block;
          font-size: 18px;
          color: #333333;
          padding: 0 23px;
          height: 45px;
          width: 25%;
          vertical-align: middle;
         /* &:hover {
            color: #274898;
            border-bottom: 4px solid #274898;
            background: #fff;
          }*/
        }
        .active {
          color: #274898;
          border-bottom: 4px solid #274898;
          background: #ffffff;
        }
      }
    }
    .index-newsrightcot {
      height: calc(  100% - 45px - 10px);
      .index-news--title{
        color: #101010;
        margin-bottom: 10px;
        font-size: 18px;
        height: 27px;
        line-height: 27px;
      }
      .index-news--sub-title{
        line-height: 25px;
      }
      .driver{
        width: 100%;
        height: 1px;
        background-color: #bbb;
        margin: 10px 0 15px;
      }
      .index-news--list-item{
        margin: 8px 0;
        .index-news--list-title{
          width: 495px;
        }
        .index-news--list-time{
          width: 75px;
          text-align: right;
        }
      }
    }
  }
  .index-swiper-news--link, .index-swiper--link {
    cursor: pointer;
    img {
      cursor: pointer;
    }
  }
  .ellipsis-col22 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /*空列表*/
  .empty {
    text-align: center;
    .svg-icons {
      display: inline-block;
      width: 150px;
      height: 150px;
      margin-top: 30px;
    }
    .empty-txt {
      font-size: 20px;
      line-height: 50px;
    }
  }
</style>
