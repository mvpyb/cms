<template>
  <div class="about-container w920">
    <div v-loading="loading" class="min-height">
      <div class="about-title syBold">
        {{ details.title }}
      </div>
      <div v-if="details.id" class="about-content">
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
        <fields v-if="details.keywords.length > 0" :fields="details.keywords" />
      </div>
      <div v-else class="empty">
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
  name : 'Details',
  components : { BackToTop, Links, Wechat, WeiBo, Fields },
  data() {
    return {
      loading : true,
      currentId : 0,
      sharePic : '',
      shareUrl : '',
      details : {}
    }
  },
  computed : {},
  async created() {
    this.shareUrl = window.location.href
    const query = this.$route.query

    console.log( 'query', query )

    if ( !query || !query.id ) {
      this.$router.back( -1 )
      return false
    }
    this.currentId = query.id
    await this.getArticles()
  },
  mounted() {},
  methods : {
    async getArticles() {
      this.loading = true
      try {
        const { data } = await request.getArticleContent( {
          id : this.currentId
        } )
        console.log( 'data', data )
        this.details = { ...data }
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

