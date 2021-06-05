<template>
  <div class="about-container w920">
    <div v-loading="loading" class="min-height">
      <div class="about-title syBold">
        中国中小企业国际合作协会招聘启事
      </div>
      <div v-show="details.id" class="about-content">
        <div class="about-content-item sub-info">
          <div class="time">
            发布时间：{{ details.publishTime | formatDate }}
          </div>
          <div class="source">
            来源：
            <span v-if="details.classify == 1">SIAB</span>
            <a v-else style="color: #409EFF" :href="details.quoteUrl" target="_blank">{{ details.quoteName }}</a>
          </div>
          <div class="shares clearfix">
            <div class="share-link fl wechat">
              <wechat />
            </div>
            <div class="share-link fl weibo">
              <wei-bo title="协会简介" :share-url="shareUrl" :share-pic="sharePic" />
            </div>
            <div class="share-link fl copy">
              <links />
            </div>
          </div>
        </div>
        <div class="article about-content-item" v-html="details.contents" />
        <fields v-if="details.keywords && details.keywords.length > 0" :fields="details.keywords" />
      </div>
      <div v-show="!loading && !details.id" class="empty">
        <svg-icon class-name="svg-icons" icon-class="empty" />
        <div class="empty-txt">什么也没有...</div>
      </div>
    </div>
    <back-to-top />
  </div>
</template>

<script>
import * as request from '@/api/request'
import Fields from '@/views/components/fields'
import Wechat from '@/views/components/wechat'
import WeiBo from '@/views/components/weibo'
import Links from '@/views/components/links'
import BackToTop from '@/components/BackToTop'
export default {
  name : 'Organization',
  components : { BackToTop, Wechat, WeiBo, Links, Fields },
  data() {
    return {
      loading : true,
      currentType : 8,
      sharePic : '',
      shareUrl : '',
      details : {}
    }
  },
  computed : {},
  async created() {
    this.shareUrl = window.location.href
    await this.getArticles()
  },
  mounted() {},
  methods : {
    async getArticles() {
      this.loading = true
      try {
        const { data } = await request.getArticle( {
          // 'search' : '',
          type : this.currentType,
          page : 1,
          limit : 1
        } )
        const { list } = data
        if ( list && list.length > 0 ) {
          this.details = list[0]
        } else {
          this.details = {}
        }
        console.log( 'list', list )
        console.log( 'details', { ...this.details } )
      } catch ( e ) {
        this.details = {}
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/views/styles/index.scss";
</style>

