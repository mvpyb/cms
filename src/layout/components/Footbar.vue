<template>
  <div class="footbar clearfix syRegular" style="background-color: #242424">
    <div class="w885">
      <div class="footer-top">
        <span
          v-for="route in footNav"
          :key="route.path"
          class="foot-bar-link"
          :class="{ 'active' : route.redirect == activeMenu }"
          @click="footHandle( route )"
        >{{ route.meta.title }}</span>
      </div>
      <div class="footer-cont">
        <p>
          上海中小企业国际合作协会 版权所有 未经授权严禁转载任何内容或建立镜像
          <br>
          制作单位：上海中小企业国际合作协会
          <br>
          <span class="foot-bar-link">沪ICP备2021007053号-1</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name : 'Footbar',
  data() {
    return {

    }
  },
  computed : {
    ...mapGetters( [
      'permission_routes',
      'sidebar'
    ] ),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if ( meta.activeMenu ) {
        return meta.activeMenu
      }
      return path
    },
    footNav() {
      if ( this.permission_routes.length == 0 ) {
        return []
      } else {
        const result = []
        this.permission_routes.forEach( item => {
          if ( !item.hidden ) {
            const { path, meta } = item
            const obj = { ...item }
            // if ( path == '/' && !meta && !meta.title ) {
            if ( path == '/' ) {
              if ( !meta || !meta.title ) {
                obj.meta = {
                  title : '首页'
                }
              }
            } else {

            }
            result.push( obj )
          }
        } )
        return result
      }
    }
  },
  watch : {},
  mounted() {
    // console.log( 'permission_routes', JSON.parse( JSON.stringify( this.permission_routes ) ) )
    // console.log( 'footNav', JSON.parse( JSON.stringify( this.footNav ) ) )
    // console.log( 'activeMenu', this.activeMenu )
  },
  methods : {
    async footHandle( data ) {
      // console.log( 'footHandle', data )
      // const { redirect, path, children } = data
      const { redirect } = data
      // console.log( 'redirect', redirect, redirect == this.activeMenu )
      this.$router.push( `${redirect}` )
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    background: #242424;
    /*border-bottom: 3px solid #274898;*/
  }
  .footer-top {
    text-align: center;
    border-bottom: 1px solid #bbb;
    padding: 20px 0;
    span {
      cursor: pointer;
      color: #AEAEAE;
      padding: 0 30px;
      &:hover {
        color: #AEAEAE;
      }
    }
  }
  .footer-cont {
    padding: 25px 0;
    p {
      font-size: 14px;
      color: #AEAEAE ;
      line-height: 30px;
      text-align: center;
      span {
        color: #AEAEAE;
      }
    }
  }
</style>
