<template>
  <div v-loading="listLoading" class="index-teamContent aos-init aos-animate" data-aos="fade-up" data-aos-duration="1300">
    <div class="w1200">
      <div class="section--header">
        <span class="section--border" />
        <div class="section--title syBold">国际合作办公室</div>
      </div>
      <div class="team-swiper-container swiper-container">
        <swiper
          ref="swiperMien"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="( item, index ) in getList"
            :key="index + '_teams' "
          >
            <div class="team-swiper--list clearfix">
              <div class="team-swiper--item clearfix">
                <div
                  v-for="( teamItem, teamIndex ) in item"
                  :key="teamItem.id"
                  class="team-swiper-txt fl syRegular ellipsis"
                  :class="{ 'last' : (teamIndex + 1)%5 == 0 }"
                  @click="handleClick(teamItem)"
                >{{ teamItem.title }}</div>
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
  name : 'Team',
  data() {
    return {
      listLoading : true,
      swiperOptions : {
        slidesPerView : 1,
        grabCursor : false,
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
      return changeData( 10, this.list )
    }
  },
  async created() {
    await this.getArticleList()
  },
  mounted() {

  },
  methods : {
    async handleClick( data ) {
      await this.$router.push( { path : '/feature/details', query : { id : data.id }} )
    },
    // 获取列表请求
    async getArticleList( payload ) {
      const that = this
      that.listLoading = true
      const params = {
        type : 19,
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getArticle( params )
        // console.log( '国际合作办公室', JSON.parse( JSON.stringify( data.list ) ) )
        that.total = data.count
        that.list = data.list
      } catch ( e ) {
        console.log( '国际合作办公室请求错误', e )
      } finally {
        that.listLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /*国际合作办公室*/
  .index-teamContent{
    height: 157px;
    .team-swiper-container{
      height: 100px;
      .team-swiper--list{
        .team-swiper--item{
          cursor: pointer;
          .team-swiper-txt{
            margin: 8px 0;
            width: 20%;
            height: 20px;
            line-height: 20px;
            padding-right: 30px;
            box-sizing: border-box;
            &.last{
              text-indent: 20px;
            }
          }
        }
      }
    }
  }
</style>
