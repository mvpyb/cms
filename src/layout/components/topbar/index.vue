<template>
  <div>
    <div class="navbar-menu">
      <el-menu
        class="top-nav-bar-menu"
        mode="horizontal"
        menu-trigger="hover"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        :unique-opened="true"
        :default-active="activeMenu"
        @select="handleSelect"
      >
        <sidebar-item
          :curretActivepath="curretActivepath"
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name : 'Topbar',
  components : { SidebarItem },
  data() {
    return {
      curretActivepath : ''
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
        return this.curretActivepath || meta.activeMenu
      }
      return this.curretActivepath || path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch : {
    '$route.query' : {
      handler( query ) {
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
  mounted() {
    // console.log( 'top routes', this.permission_routes )
  },
  methods : {
    handleSelect( key, keyPath ) {
      // console.log( key, keyPath )
    }
  }
}
</script>

<style lang="scss">
  .navbar-menu{
    background-color: transparent;
  }
  .el-menu.el-menu--horizontal{
    border: none;
  }

  .el-submenu__icon-arrow.el-icon-arrow-down{
    display: none;
    opacity: 0;
  }
</style>
