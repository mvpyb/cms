<template>
  <div class="icons-container" @click="handle($event)">
    <svg-icon class-name="icons" icon-class="link" style="pointer-events: none" />
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'

export default {
  name : 'Links',
  props : {
    text : {
      type : String,
      default : window.location.href
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods : {
    async handle( event ) {
      clipboard( this.text, event )
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
