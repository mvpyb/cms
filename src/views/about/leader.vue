
<template>
  <div class="about-container w920">
    <div class="min-height">
      <div class="about-title syBold"> 协会领导 </div>
      <div class="about-content">
        <div class="about-content-item sub-info">
          <!--<div class="time">
            发布时间：{{ about.publishTime | formatUnixToDayTime }}
          </div>-->
          <div class="source">来源：SIAB</div>
          <div class="shares clearfix">
            <div class="share-link fl wechat">
              <wechat />
            </div>
            <div class="share-link fl weibo">
              <wei-bo title="协会领导" :share-url="shareUrl" :share-pic="sharePic" />
            </div>
            <div class="share-link fl copy">
              <links />
            </div>
          </div>
        </div>
        <div v-loading="loading" class="leaders-list">
          <div
            v-for="item in getNewList"
            :key="item.id"
            class="rank-item"
          >
            <div class="rank-title syBold">
              <el-tooltip class="item" effect="dark" :content="item.desc" placement="top">
                <span class="rank-title--txt">{{ item.title }} </span>
              </el-tooltip>
            </div>
<!--            <div class="rank-title syBold"> {{ item.title }} </div>-->
            <div class="rank-list">
              <div v-for="user in item.children" :key="user.id" class="rank-list--item clearFloat">
                <div class="fl rank-list--preview">
                  <img :src="host + user.photo" :alt="user.name">
                </div>
                <div class="fl rank-list--info">
                  <div class="rank-list--info-title syBold"> 姓名：{{ user.name }}  </div>
                  <div class="rank-list--info-description syRegular"> {{ user.desc }} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <back-to-top />
  </div>
</template>

<script>
import Wechat from '@/views/components/wechat'
import WeiBo from '@/views/components/weibo'
import Links from '@/views/components/links'
import BackToTop from '@/components/BackToTop'
import * as request from '@/api/request'
import { changeWorkers } from '@/utils/tools'
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )

export default {
  name : 'Leader',
  components : { BackToTop, Links, Wechat, WeiBo },
  data() {
    return {
      host : 'http://',
      sharePic : '',
      shareUrl : '',
      loading : false,
      total : 0,
      rankList : [],
      about : {},
      list : []
    }
  },
  computed : {
    getNewList() {
      const result = this.rankList.filter( item => item.children && item.children.length > 0 )
      result.sort( ( a, b ) => b.weight - a.weight )
      // console.log( 'result', JSON.parse(JSON.stringify( result )) )
      return result
    }
  },
  async created() {
    this.host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
    await this.getJobAndUsers()
    // this.sharePic = this.getNewList.length > 0 ? this.getNewList[0]['children']['url'] : ''
    this.shareUrl = window.location.href
  },
  mounted() {},
  methods : {
    // 获取职位员工信息
    async getJobAndUsers() {
      const that = this
      that.loading = true
      const params = {
        type : 1,
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getWorkers( params )
        const { list, host } = data
        that.rankList = changeWorkers( list, host )
        // console.log( '获取协会领导职位', _.cloneDeep( that.rankList ) )
      } catch ( e ) {
        console.log( '获取协会领导职位出错', e )
      } finally {
        that.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/views/styles/index.scss";
</style>

