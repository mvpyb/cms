<template>
  <div class="user-info-container syRegular">
    <div class="user-info-box">
      <div class="header clearfix">
        <div class="title un-select">个人信息</div>
        <svg-icon class-name="handle-icon" icon-class="close" @click="close" />
      </div>
      <div class="body">
        <div class="body-item avatar-item clearfix">
          <div class="label un-select fl">当前头像：</div>
          <div class="value fr">
            <div style="display: inline-block" @click="imagecropperShow=true">
              <pan-thumb :image="image" width="97px" height="97px" style="cursor: pointer" />
            </div>
            <image-cropper
              v-show="imagecropperShow"
              :key="imagecropperKey"
              class="edit-avatar-container"
              :width="300"
              :height="300"
              url="https://httpbin.org/post"
              lang-type="en"
              @close="close"
              @crop-upload-success="cropSuccess"
            />
          </div>
        </div>
        <div class="body-item clearfix account-item">
          <div class="label un-select fl">当前账号：</div>
          <div class="value fr">
            13288889999
          </div>
        </div>
        <div class="body-item clearfix active-item">
          <div class="label un-select fl">未激活账号：</div>
          <div class="value un-select fr">
            <el-button v-waves class="remote-default mini-size h32" @click="showPer">账号权限</el-button>
            <el-button v-waves class="remote-default mini-size h32">激活/续费</el-button>
          </div>
        </div>
        <div class="body-item clearfix nickname-item">
          <div class="label un-select fl">用户昵称：</div>
          <div class="value fr">
            <el-input v-model="nickname" class="inps" placeholder="请输入昵称" clearable />
          </div>
        </div>
      </div>
      <div class="footer un-select">
        <el-button v-waves class="remote-default mini-size h32">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
// import ScrollPane from './ScrollPane'
// import path from 'path'

export default {
  components : { ImageCropper, PanThumb },
  directives : {
    waves
  },
  data() {
    return {
      nickname : '',
      imagecropperShow : false,
      imagecropperKey : 0,
      image : require( '@/assets/imgs/avatar.png' )
    }
  },
  computed : {

  },
  mounted() {

  },
  methods : {
    cropSuccess( resData ) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
      this.$emit( 'closeUserInfo' )
    },
    showPer() {
      this.$emit( 'showPer' )
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
