<template>
  <div class="about-container w920 pb10">
    <div class="min-height">
      <div class="about-title list-title syBold">
        专业分会管理办公室
      </div>
      <div v-loading="listLoading" class="about-content no-border">
        <div >
          <div
            v-for="( list, index ) in lists"
            :key="list.id"
            class="list-item syRegular clearfix"
            :class="{'pb30' : (index+1)%5 == 0}"
            @click="viewDetails( list )"
          >
            <div class="list-item--title fl ellipsis">
              <span>· </span>{{ list.title }}
            </div>
            <div class="list-item--time fr">
              {{ list.publishTime | formatDate }}
            </div>
          </div>
        </div>
        <div v-if="lists.length == 0 && !listLoading" class="empty">
          <svg-icon class-name="svg-icons" icon-class="empty" />
          <div class="empty-txt">什么也没有...</div>
        </div>
      </div>
      <!--分页-->  <!--v-show="total > 9"-->
      <pagination
        v-show="total > 0"
        class="pagination-wrapper"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getArticleList"
      />
    </div>
    <back-to-top />
  </div>
</template>

<script>
import * as request from '@/api/request'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
export default {
  name : 'Chapter',
  components : { Pagination, BackToTop },
  data() {
    return {
      currentType : 20,
      listQuery : {
        page : 1,
        limit : 10
      },
      total : 0,
      listLoading : true,
      lists : []
    }
  },
  computed : {},
  async created() {
    await this.getArticleList()
  },
  mounted() {

  },
  methods : {
    // 获取列表请求
    async getArticleList( payload ) {
      const that = this
      that.listLoading = true
      if ( payload ) {
        that.listQuery.page = payload.page
        that.listQuery.limit = payload.limit
      }
      const params = {
        type : that.currentType,
        page : that.listQuery.page,
        limit : that.listQuery.limit
      }
      try {
        const { data } = await request.getArticle( params )
        that.total = data.count
        that.lists = data.list
      } catch ( e ) {
        console.log( 'e', e )
      } finally {
        that.listLoading = false
      }
    },
    async viewDetails( data ) {
      console.log( data )
      this.$router.push( { path : '/feature/details', query : { id : data.id, fromPath : '/feature/chapter' }} )
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/views/styles/index.scss";
</style>

