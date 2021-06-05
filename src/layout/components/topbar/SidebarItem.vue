<template>
  <div v-if="!item.hidden" class="horizontal-menu-wrapper ">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!--<item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />-->
          <item :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      class="top-bar--sub-menu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <!-- <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />-->
        <item v-if="item.meta" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path + '_' + index"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name : 'SidebarItem',
  components : { Item, AppLink },
  mixins : [FixiOSBug],
  props : {
    // route object
    item : {
      type : Object,
      required : true
    },
    isNest : {
      type : Boolean,
      default : false
    },
    basePath : {
      type : String,
      default : ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  mounted() {
    // console.log( 'item', this.item.path, this.item )
  },
  methods : {
    hasOneShowingChild( children = [], parent ) {
      const showingChildren = children.filter( item => {
        if ( item.hidden ) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      } )

      // When there is only one child router, the child router is displayed by default
      if ( showingChildren.length === 1 ) {
        return true
      }

      // Show parent if there are no child router to display
      if ( showingChildren.length === 0 ) {
        this.onlyOneChild = { ... parent, path : '', noShowingChildren : true }
        return true
      }

      return false
    },
    resolvePath( routePath ) {
      if ( isExternal( routePath ) ) {
        return routePath
      }
      if ( isExternal( this.basePath ) ) {
        return this.basePath
      }
      return path.resolve( this.basePath, routePath )
    }
  }
}
</script>

<style lang="scss" scoped>
  .horizontal-menu-wrapper {
    display: inline-block;
    width : 170px;
    vertical-align: middle;
    &.nest-menu {
      width: 100%;
      width: 170px;
      display: block;
      height: 40px;
      line-height : 40px;
      ::v-deep .el-menu-item {
        height: 40px;
        line-height : 40px;
        span{
          height: 40px;
          line-height : 40px;
          font-size: 14px;
          text-align: left;
          text-indent: 5px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .el-menu--popup {
    min-width: auto;
  }
  .horizontal-menu-wrapper{
    height: 60px;
  }
  .el-menu-item, .top-bar--sub-menu, .el-submenu{
    padding: 0;

    height: 60px;
    .el-submenu__title{
      height: 100%;
      padding: 0;
    }
  }
</style>
