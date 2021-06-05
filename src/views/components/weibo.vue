<template>
  <div class="icons-container" @click="handle($event)">
    <svg-icon class-name="icons" icon-class="weibo" />
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'

export default {
  name : 'WeiBo',
  props : {
    title : {
      type : String,
      default : '分享'
    },
    shareUrl : {
      type : String,
      default : window.location.href
    },
    sharePic : {
      type : String,
      default : require( '@/assets/imgs/logo.png' )
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods : {
    async handle() {
      const sharesinastring =
        'https://service.weibo.com/share/share.php?title=' +
        this.title + '&url=' + this.shareUrl + '&content=utf-8&pic=' + this.sharePic
      window.open( sharesinastring, '_blank' )
    }
  }
}
</script>

<style lang="scss" scoped>
  .icons-container {
    width: 100%;
    height: 100%;
    .icons {
      pointer-events: none;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 13px;
      color: #101010;
    }
  }
</style>
