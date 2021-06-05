<template>
  <div class="user-info-container per-container syRegular">
    <div class="user-info-box">
      <div class="header clearfix">
        <div class="title">账号权限</div>
        <svg-icon class-name="handle-icon" icon-class="close" @click="close" />
      </div>
      <div class="body">
        <div class="body-item body-item--head clearfix">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="tab-item" />
            </el-col>
            <el-col :span="8">
              <div class="tab-item">
                未激活账号
              </div>
            </el-col>
            <el-col :span="8">
              <div class="tab-item">
                已激活账号
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="tab-item">
                房间人数
              </div>
            </el-col>
            <el-col :span="8">
              <div class="tab-item unActive">
                2人
              </div>
            </el-col>
            <el-col :span="8">
              <div class="tab-item actived">
                10人
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="tab-item">
                房间录屏
              </div>
            </el-col>
            <el-col :span="8">
              <div class="tab-item unActive">
                <svg-icon class-name="handle-icon" icon-class="unSupport" />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="tab-item actived">
                <svg-icon class-name="handle-icon" icon-class="support" />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="tab-item">
                文件下载
              </div>
            </el-col>
            <el-col :span="8">
              <div class="tab-item unActive">
                <svg-icon class-name="handle-icon" icon-class="unSupport" />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="tab-item actived">
                <svg-icon class-name="handle-icon" icon-class="support" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed : {

  },
  mounted() {

  },
  methods : {
    close() {
      this.$emit( 'closePer' )
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
