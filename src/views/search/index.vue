<template>
  <div class="search-container">
    <div class="w900">
      <!--搜索页-->
      <!--<div class="search-wrapper">
        <el-input
          v-model="search"
          class="custom-inps h40 no-border"
          placeholder="请输入内容"
        />
        <svg-icon class-name="search" icon-class="search" @click.stop="click" />
      </div>-->

      <div v-loading="listLoading" class="search-listContent">
        <div v-if="getLists.length > 0">
          <div v-for="news in getLists" :key="news.id" class="search-list" @click="handleClick( news ) ">
            <div class="search-list--title syBold ellipsis">
              {{ news.title }}
            </div>
            <div class="search-list--sub-title syRegular">
              {{ news.digest | subStringStr(125) }}
            </div>
            <div class="search-info syRegular clearfix">
              <div class="time fl">{{ news.publishTime | formatDate }}</div>
              <div class="type fl">{{ news.typeName }}</div>
            </div>
          </div>
        </div>
        <div v-else class="no-content">
          很抱歉，没有找到您搜索的结果，请重新输入内容
        </div>
      </div>
      <!--分页-->
      <pagination
        v-show="total > 0"
        class="pagination-wrapper"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="searchArticles"
      />
    </div>
    <back-to-top />
  </div>
</template>

<script>
import * as request from '@/api/request'
import Pagination from '@/components/Pagination'
import { getAllNavs } from '@/api/navs'
import BackToTop from '@/components/BackToTop'
export default {
  name : 'Search',
  components : { Pagination, BackToTop },
  data() {
    return {
      currentType : 23,
      listLoading : true,
      search : '',
      listQuery : {
        page : 1,
        limit : 10
      },
      total : 0,
      navs : [],
      list : []
    }
  },
  computed : {
    getLists() {
      if ( this.list.length == 0 ) {
        return []
      } else {
        this.list.forEach( item => {
          const { nav, path } = this.getNavs( item.type )
          item.typeName = nav || ''
          item.route = path || ''
        } )
      }
      return this.list
    }
  },
  watch : {
    '$route.query' : {
      async handler( query ) {
        const { search } = query
        if ( !query || !search ) {
          await this.$router.push( '/' )
          return false
        }
        this.search = search
        await this.searchArticles()
      },
      immediate : true,
      deep : true
    }
  },
  async created() {
    this.navs = getAllNavs()
  },
  mounted() {},
  methods : {
    getNavs( type ) {
      let nav
      let path
      this.navs.forEach( item => {
        if ( item.id == type ) {
          nav = item.label
          path = item.redirect1
        } else {
          if ( item.children ) {
            item.children.forEach( child => {
              if ( child.id == type ) {
                nav = child.label
                path = child.redirect1
              }
            } )
          }
        }
      } )
      return { nav, path }
    },
    async handleClick( data ) {
      const { route, id } = data
      // console.log( 'data', { ...data } )

      const whiteList = [
        '/about/join',
        '/dynamic/politics',
        '/dynamic/association',
        '/dynamic/member',
        '/dynamic/notice',
        '/feature/secretariat',
        '/feature/office',
        '/feature/science',
        '/feature/international',
        '/feature/chapter',
        '/feature/education',
        '/member/demeanor',
      ]
      const path = whiteList.find( item => item == route ) ? route : this.getPath( route )

      // console.log( 'path', path )
      // console.log( 'sdf', { path : `${path}details`, query : { id : id } } )

      this.$router.push( { path : `${route}`, query : { id : id }} )
    },
    async searchArticles( payload ) {
      const that = this
      that.listLoading = true
      if ( payload ) {
        that.listQuery.page = payload.page
        that.listQuery.limit = payload.limit
      }
      const params = {
        search : that.search,
        page : that.listQuery.page,
        limit : that.listQuery.limit
      }
      try {
        const { data } = await request.searchLists( params )
        console.log( '首页 - 搜索文章 data', data )
        this.total = data.count
        this.list = data.list
      } catch ( e ) {
        this.tabs = []
        console.log( '首页 - 搜索文章出错', e )
      } finally {
        that.listLoading = false
      }
    },

    getPath( route ){
      let path
      if ( route.startsWith( '/about' ) ) {
        path = '/about/jobDetail'
      } else if ( route.startsWith( '/dynamic' ) ) {
        path = '/dynamic/details'
      } else if ( route.startsWith( '/feature' ) ) {
        path = '/feature/details'
      } else if ( route.startsWith( '/member' ) ) {
        path = '/member/details'
      } else {
        path = '/about/jobDetail'
      }
      return path
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-wrapper {
    height: 40px;
    position: relative;
    border : 1px solid #aaa;
    border-radius: 4px;
    width: 100%;
    .custom-inps{
      position: absolute;
      width: calc(100% - 30px);
      top: 0;
      left: 0;
      height: 40px;
      line-height: 40px;
      border: none;
    }
    .search{
      cursor: pointer;
      color: #C1C2C5;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

  .search-container{
    background-color: #fff;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .search-listContent{
    margin-top: 20px;

    .search-list{
      padding-top: 20px;
      /*padding-bottom: 30px;*/
      border-top: 1px solid #ddd;
      margin-bottom: 20px;
      cursor: pointer;
      .search-list--title{
        color: rgba(16, 16, 16, 100);
        font-size: 18px;
        line-height: 28px;
      }
      .search-list--sub-title{
        margin-top: 10px;
        color: rgba(16, 16, 16, 100);
        font-size: 14px;
        line-height: 20px;
      }
      .search-info {
        @extend .search-list--sub-title;
        .time {
          margin-right: 30px;
        }
      }
      &:last-child {
        border-bottom: 1px solid #ddd;
        padding-bottom: 30px;
      }
    }
    .no-content {
      color: rgba(16, 16, 16, 100);
      font-size: 14px;
      line-height: 20px;
      height: 500px;
      text-align: center;
      padding-top: 40px;
    }
  }
</style>
