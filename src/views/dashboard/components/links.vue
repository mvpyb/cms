<template>
  <div class="gray-bg index-linksContent aos-init aos-animate" data-aos="fade-up" data-aos-duration="2900">
    <div class="w1200">
      <div class="section--header clearfix">
        <div class="fl">
          <span class="section--border" />
          <div class="section--title syBold">友情链接</div>
        </div>
      </div>
      <div v-if="list.length > 0" class="index-links-section">
        <div
          v-for="item in list"
          :key="item.id"
          class="links-list clearfix"
        >
          <div class="links-title fl syBold">{{ item.name }}</div>
          <div class="clearfix fl links-txt-box">
            <div
              v-for="( child, cIndex ) in item.children"
              :key="list.id + '-' + cIndex"
              class="links-txt syRegular"
            >
              <a :href="child.redirect" target="_blank">{{ child.name }}</a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="index-links-section nothing">
        <div class="center">
          <svg-icon class-name="nothing" icon-class="no-data1" />
          <span>暂无数据</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as request from '@/api/request'
export default {
  name : 'Links',
  data() {
    return {
      loading : false,
      total : 1,
      list : []
    }
  },
  async created() {
    await this.getLinks()
  },
  methods : {
    // 获取友情链接
    async getLinks() {
      const that = this
      that.loading = true
      const params = {
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getLinks( params )
        that.list = data
      } catch ( e ) {} finally {
        that.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /*友情链接*/
  .index-linksContent {
    padding-bottom: 30px;
    .index-links-section{
      .links-list{
        margin: 10px 0;
        .links-title{
          display: inline-block;
          height: 24px;
          color: #101010;
          font-size: 16px;
          line-height: 24px;
          margin-right: 20px;
          /*min-width: 64px;*/
          width: 150px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          text-align: left;
        }
        .links-txt-box {
          width: calc(100% - 175px );
        }
        .links-txt{
          display: inline-block;
          height: 24px;
          color: #101010;
          font-size: 16px;
          line-height: 24px;
          margin-right: 60px;
          cursor: pointer;
        }
      }

      .center {
        text-align: center;
      }
      .nothing {
        width: 80px;
        height: 80px;
        color: #dfe4ed;
      }
      span {
        display: block;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #ccc;
      }
    }
  }
</style>
