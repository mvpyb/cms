<template>
  <div class="gray-bg clearfix index-ztContent aos-init aos-animate" data-aos="fade-up" data-aos-duration="1300">
    <div class="w1200 clearFloat">
      <div class="section--header">
        <span class="section--border" />
        <div class="section--title syBold">专题服务</div>
      </div>
      <div class="index-zt--section">
        <el-row :gutter="50">
          <el-col v-for="item in list" :key="item.id" :span="8">
            <div class="zt-item" @click="handleClick(item)">
              <img :draggable="false" class="zt-item--img" :src="item.url" alt="">
              <div class="zt-item--title filter-bg filter-bg5">
                <div class="title">{{ item.title }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Feature',
  data() {
    return {
      list : [
        {
          id : 1,
          title : '秘书处',
          createTime : 1605277390,
          creator : 1,
          url : require( '@/assets/imgs/feature/1.png' )
        },
        {
          id : 2,
          title : '党建办公事',
          createTime : 1605277390,
          creator : 1,
          url : require( '@/assets/imgs/feature/2.png' )
        },
        {
          id : 3,
          title : '科技创新委员会',
          createTime : 1605277390,
          creator : 1,
          url : require( '@/assets/imgs/feature/3.png' )
        },
        {
          id : 4,
          title : '国际合作办公室',
          createTime : 1605277390,
          creator : 1,
          url : require( '@/assets/imgs/feature/4.png' )
        },
        {
          id : 5,
          title : '专业分会管理办公室',
          createTime : 1605277390,
          creator : 1,
          url : require( '@/assets/imgs/feature/5.png' )
        },
        {
          id : 6,
          title : '国际商学院',
          createTime : 1605277390,
          creator : 1,
          url : require( '@/assets/imgs/feature/6.png' )
        }
      ]
    }
  },
  methods : {
    handleClick( data ) {
      const { id } = data
      let router
      if ( id == 1 ) {
        router = '/feature/secretariat'
      } else if ( id == 2 ) {
        router = '/feature/office'
      } else if ( id == 3 ) {
        router = '/feature/science'
      } else if ( id == 4 ) {
        router = '/feature/international'
      } else if ( id == 5 ) {
        router = '/feature/chapter'
      } else if ( id == 6 ) {
        router = '/feature/education'
      } else if ( id == 1 ) {
        router = '/feature/secretariat'
      }
      this.$router.push( router )
    }
  }
}
</script>

<style lang="scss" scoped>
  /*专题*/
  .index-ztContent{
    margin-top: 30px;
    .index-zt--section{
      width: 100%;
      padding-bottom: 20px;
      .zt-item{
        /*width: 365px;*/
        height: 236px;
        cursor: pointer;
        position: relative;
        margin: 10px 0;
        .zt-item--img{
          position: absolute;
          top: 0;
          left: 0;
        }
        .zt-item--title{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 64px;
          font-family: Roboto;
          text-align: center;
          color: #000;
          font-size: 16px;
          line-height: 64px;
          transition: all 0.5s;
          .title{
            position: absolute;
            width: 100%;
            height: 64px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &:hover .zt-item--title{
          height: 236px;
        }
      }
    }
  }
</style>
