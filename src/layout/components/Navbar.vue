<template>
  <div class="navbar clearfix syRegular">
    <!--顶部导航文字说明-->
    <headers />
    <!--头部导航-->
    <div class="main-info-container">
      <div class="w1200">
        <topbar />
      </div>
    </div>
    <!--面包屑导航-->
    <div v-show="showBred" class="breadcrumb-container-box">
      <div class="w1200">
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
import Topbar from './topbar'
import Headers from './headers'

export default {
  components : { Topbar, Headers, Breadcrumb },
  data() {
    return {}
  },
  computed : {
    ...mapGetters( [
      'sidebar',
      'avatar',
      'device'
    ] ),
    showBred() {
      return !( ['/dashboard'].find( item => item == this.$route.path ) )
    }
  },
  watch : {
    'filterBg' : {
      handler( val ) {
        this.$store.dispatch( 'user/setFilterBg', val )
      },
      immediate : false
    }
  },
  mounted() {
  },
  methods : {

  }
}
</script>

<style lang="scss" scoped>
  $height : 60px;
  .navbar {
    height: auto;
    overflow: hidden;
    position: relative;
    .main-info-container {
      background-color: #274898;
      color: #fff;
      height: 60px;
    }

    /*margin-bottom: 14px;*/
  }
  .breadcrumb-container-box{
    background-color: #fff;
    height: 50px;
    .w1200 {
      height: 50px;
      border-bottom: 1px dashed #bbb;
    }

  }
</style>
