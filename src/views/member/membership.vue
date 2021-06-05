<template>
  <div class="about-container w920">
    <div class="min-height">
      <div class="about-title syBold">
        入会条件
      </div>
      <div class="about-content">
        <div class="about-content-item sub-info">
          <div class="time">
            发布时间：{{ details.publishTime | formatDate }}
          </div>
          <div class="source">
            来源：
            <span v-if="details.classify == 1">SIAB</span>
            <a style="color: #409EFF" v-else :href="details.quoteUrl" >{{details.quoteName}}</a>
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
        <div class="article about-content-item" v-html="details.contents"></div>

        <div class="accessory" v-if="details.accessory && accessoryInfo">
          <a :href="host + details.accessory" :download="accessoryInfo.name + '.' + accessoryInfo.fix">附件下载</a>
        </div>

        <fields :fields="details.keywords" v-if="details.keywords && details.keywords.length > 0" />
      </div>
      <div v-if="!details.id && !loading"  class="empty">
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
  name : 'Membership',
  components : { BackToTop, Wechat, WeiBo, Links, Fields },
  data() {
    return {
      host : 'http://',
      loading : true,
      currentType : 22,
      sharePic : '',
      shareUrl : '',
      details : {}
    }
  },
  computed : {
    accessoryInfo() {
      const accessory = this.details.accessory
      if ( accessory && accessory.indexOf( '.' ) >= 0 ) {
        const data = accessory.split( '.' )
        return {
          name : data[data.length - 2],
          fix : data[data.length - 1]
        }
      } else {
        return ''
      }
    }
  },
  async created() {
    this.host = location.href.startsWith( 'https' ) ? 'https://' : 'http://'
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

      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/views/styles/index.scss";
  .accessory {
    a {
      color: #0b86dc;
      cursor: pointer;
    }
  }
</style>

