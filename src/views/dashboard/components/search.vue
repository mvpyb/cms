<template>
  <div class="index-teamContent aos-init aos-animate" data-aos="fade-up" data-aos-duration="1300">
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
                >{{ teamItem.name }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { changeData } from '@/utils/tools'
export default {
  name : 'Team',
  data() {
    return {
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
      list : [
        {
          id : 1,
          name : '使领馆联络处'
        },
        {
          id : 2,
          name : '使领馆联络处'
        },
        {
          id : 3,
          name : '使领馆联络处'
        },
        {
          id : 4,
          name : '使领馆联络处'
        },
        {
          id : 5,
          name : '使领馆联络处'
        },
        {
          id : 6,
          name : '使领馆联络处'
        },
        {
          id : 7,
          name : '使领馆联络处'
        }
      ]
    }
  },
  computed : {
    getList() {
      return changeData( 10, this.list )
    }
  },
  created() {},
  mounted() {

  },
  methods : {
    handleClick() {

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
            &.last{
              text-indent: 20px;
            }
          }
        }
      }
    }
  }
</style>
