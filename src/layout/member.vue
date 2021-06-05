<template>
  <div :class="classObj" class="app-wrapper about-wrapper">
    <navbar />
    <div class="main-containers">
      <div class="w1200 clearfix">
        <div class="fl about-wrapper-left">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              v-for="nav in getCurrentNav"
              :key="nav.path"
              index="2"
              class="side-bar-item"
              :class="{ 'active' : $route.path == `/member/${nav.path}` || curretActivepath == `/member/${nav.path}` }"
            >
              <div class="side-bar-item--box" @click="changeRoute( nav )">
                <span slot="title">{{ nav.meta.title }}</span>
                <i class="el-icon-arrow-right" />
              </div>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content fr">
          <app-main />
        </div>
      </div>
    </div>
    <footbar />
  </div>
</template>

<script>
import { AppMain, Navbar } from './components'
import Footbar from './components/Footbar'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name : 'Member',
  components : {
    AppMain,
    Footbar,
    Navbar
  },
  mixins : [ResizeMixin],
  data() {
    return {
      curretActivepath : ''
    }
  },
  watch : {
    '$route.query' : {
      handler( query ) {
        console.log( 'watch query', query )
        const { fromPath } = query
        if ( fromPath ) {
          this.curretActivepath = fromPath
        } else {
          this.curretActivepath = ''
        }
      },
      immediate : true,
      deep : true
    }
  },
  computed : {
    ...mapState( {
      routes : state => state.permission.routes,
      sidebar : state => state.app.sidebar,
      device : state => state.app.device,
      showSettings : state => state.settings.showSettings,
      needTagsView : state => state.settings.tagsView,
      fixedHeader : state => state.settings.fixedHeader
    } ),
    classObj() {
      return {
        hideSidebar : !this.sidebar.opened,
        openSidebar : this.sidebar.opened,
        withoutAnimation : this.sidebar.withoutAnimation,
        mobile : this.device === 'mobile'
      }
    },
    getCurrentNav() {
      // const currentRoutes = this.$router.options.routes.find( item => item.path == '/member' )
      const currentRoutes = this.routes.find( item => item.path == '/member' )
      if ( currentRoutes ) {
        const { children } = currentRoutes
        return children.filter( item => item.hidden !== true )
      } else {
        return []
      }
    }
  },
  mounted() {},
  methods : {
    changeRoute( data ) {
      this.$router.push( `/member/${data.path}` )
    }
  }
}
</script>

<style lang="scss" scoped>
  .about-wrapper {

  }
  .main-containers{
    padding-top: 14px;
    background-color: #fff;
    min-height: calc(100vh - 205px - 57px - 60px - 145px);
    padding-bottom: 30px;
  }
  .about-wrapper-left{
    width: 250px;
    .side-bar-item{
      background-color: #eee;
      color: #000;
      &:hover {
        background-color: #264898;
        color: #fff;
        .side-bar-item--box{
          .el-icon-arrow-right{
            color: #fff;
            display: inline-block;
          }
        }
      }
      &.active {
        background-color: #264898;
        color: #fff;
        .side-bar-item--box{
          .el-icon-arrow-right{
            color: #fff;
            display: inline-block;
          }
        }
      }
      .side-bar-item--box{
        position: relative;
        .el-icon-arrow-right {
          display: none;
          position: absolute;
          right: 0;
          top: 0;
          font-size: 14px;
          line-height: 60px;
          color: #000;
        }
      }
    }
  }
  .content {
    width: 920px;
  }
</style>
