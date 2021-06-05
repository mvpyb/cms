<template>
  <div class="dashboard-container">
    <!--轮播图-->
    <banner />
    <!--主体内容-->
    <div class="content content-bj">
      <!--通知公告-->
      <notices />
      <!--专题服务-->
      <feature />
      <!--广告 轮播区域-->
      <carousel />
      <!--重点会员风采-->
      <mien />
      <!--国际合作办公室-->
      <team />
      <!--友情链接-->
      <links />
    </div>
    <back-to-top />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import BackToTop from '@/components/BackToTop'
import Banner from './components/banner'
import Notices from './components/notices'
import Feature from './components/feature'
import Carousel from './components/carousel'
import Mien from './components/mien'
import Team from './components/team'
import Links from './components/links'

export default {
  name : 'Dashboard',
  components : {
    Banner, Notices, Feature, Carousel, Mien, Team, Links, BackToTop
  },
  data() {
    return {
      currentRole : 'adminDashboard'
    }
  },
  computed : {},
  created() {},
  mounted() {},
  methods : {

  }
}
</script>

<style lang="scss" scoped>
  .sub-txt{
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    line-height: 20px;
  }
  /*主体*/
  .content{
    background-color: #fff;
  }
</style>
