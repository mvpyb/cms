<template>
  <div class="icons-container">
    <svg-icon class-name="icons" icon-class="wechat" />
    <div class="wx-share-qrcode">
      <div id="wx-qrcode" class="wx-qrcode" />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name : 'Wechat',
  props : {
    text : {
      type : String,
      default : window.location.href
    }
  },
  data() {
    return {}
  },
  async mounted() {
    await this.creatQrCode()
  },
  methods : {
    async creatQrCode() {
      const qrcode = new QRCode( 'wx-qrcode', {
        text : this.text,
        width : 100,
        height : 100,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
      } )
    }
  }
}
</script>

<style lang="scss" scoped>
  .icons-container {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
    .icons {
      pointer-events: none;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 13px;
      color: #101010;
    }
    .wx-share-qrcode {
      position: absolute;
      top: 35px;
      left: 50%;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: 5px;
      width: 80px;
      height: 80px;
      background: #fff;
      margin-left: -40px;
      display: none;
    }
    &:hover {
      .wx-share-qrcode{
        display: block;
      }
    }
  }

</style>
