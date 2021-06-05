<template>
  <div class="about-container w920">
    <div class="min-height">
      <div class="about-title syBold">
        联系我们
      </div>
      <div class="about-content ">
        <div class="about-content-item sub-info">
          <div class="time">
            发布时间：{{ details.updatedAt | formatDate }}
          </div>
          <div class="source">来源：SIAB</div>
          <div class="shares clearfix">
            <div class="share-link fl wechat">
              <wechat />
            </div>
            <div class="share-link fl weibo">
              <wei-bo title="联系我们" :share-url="shareUrl" :share-pic="sharePic" />
            </div>
            <div class="share-link fl copy">
              <links />
            </div>
          </div>
        </div>
       <!-- <div class="article about-content-item">
          {{ details.intro }}
        </div>-->
        <div class="contacts-item about-content-item syRegular" style="margin-top: 30px;">
          <span class="contacts-item--label"> 邮箱：</span> {{ details.email }}
        </div>
        <div class="contacts-item about-content-item syRegular">
          <span class="contacts-item--label"> 电话：</span>
          <div class="phone-box contacts-item--value">
            <div v-for="( item, index ) in details.phoneData" :key="'phone_' + index">{{ item }}</div>
          </div>
        </div>
        <div class="contacts-item about-content-item syRegular">
          <span class="contacts-item--label"> 地址：</span>{{ details.address }}
        </div>

        <div class="contacts-item about-content-item qrcode-content-item syRegular">
          <span class="contacts-item--label"> 公众号：</span>
         <!-- <div style="display: inline-block;color: #787878;">
            <span class="mid" style="color: #7b7b7c">上海中小企业国际合作协会</span>
            <img class="mid" :src="require('@/assets/imgs/gongzhonghao.jpg')" alt="">
          </div>-->

          上海中小企业国际合作协会
          <img class="abs" :src="require('@/assets/imgs/gongzhonghao.jpg')" alt="">
        </div>

        <div class="map-info" style=" width: 530px;height: 340px;">
          <baidu-map
            ak="a9b347MFCwT7RT1sQ39TD1tsW62rPOGR"
            :zoom="map.zoom"
            :style="{ width:map.width,height:map.height }"
            :scroll-wheel-zoom="true"
            @ready="handler"
            @click="getClickInfo"
          />
        </div>

      </div>
    </div>
    <back-to-top />
  </div>
</template>

<script>
// https://www.cnblogs.com/jiekzou/p/10485604.html
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BackToTop from '@/components/BackToTop'
import * as request from '@/api/request'
import Wechat from '@/views/components/wechat'
import WeiBo from '@/views/components/weibo'
import Links from '@/views/components/links'
export default {
  name : 'Contacts',
  components : {
    BackToTop,
    BaiduMap, Links, Wechat, WeiBo
  },
  data() {
    return {
      sharePic : '',
      shareUrl : '',
      loading : false,
      map : {
        center : { lng : 121.493108, lat : 31.218167 }, // '南京市',
        zoom : 12,
        width : '530px',
        height : '340px'
      },
      details : {}
    }
  },
  computed : {},
  async created() {
    this.shareUrl = window.location.href
    await this.getContacts()
  },
  async mounted() {},
  methods : {
    // https://www.jianshu.com/p/350e4488248d
    handler( { BMap, map } ) {
      // 初始化地图,设置中心点坐标
      var point = new BMap.Point( this.map.center.lng, this.map.center.lat )
      map.centerAndZoom( point, 30 )
      const marker = new BMap.Marker( point ) // 创建标注
      map.addOverlay( marker ) // 将标注添加到地图中
      const circle = new BMap.Circle( point, 6, { strokeColor : 'Red', strokeWeight : 6, strokeOpacity : 1, Color : 'Red', fillColor : '#f03' } )
      map.addOverlay( circle )
      // 添加鼠标滚动缩放
      map.enableScrollWheelZoom()
      // 添加缩略图控件
      map.addControl( new BMap.OverviewMapControl( { isOpen : false, anchor : BMAP_ANCHOR_BOTTOM_RIGHT } ) )
      // 添加缩放平移控件
      map.addControl( new BMap.NavigationControl() )
      // 添加比例尺控件
      map.addControl( new BMap.ScaleControl() )
      // 添加地图类型控件
      map.addControl( new BMap.MapTypeControl() )
      this.map = map
    },
    getClickInfo( e ) {
      this.map.center.lng = e.point.lng
      this.map.center.lat = e.point.lat
    },
    async getContacts() {
      const that = this
      that.loading = true
      const params = {
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getContacts( params )
        const { phone } = data
        // if ( phone && phone.indexOf( ',' ) >= 0 ) {
        //   const pData = phone.split(',')
        // }
        this.details = {
          ...data,
          phoneData : phone.split( ',' )
        }
        console.log( '联系我们请求 data', data, this.details, phone )
      } catch ( e ) {
        console.log( '获取联系我们请求出错', e )
      } finally {
        that.loading = false
      }
    },
    async shareWeibo() {

    },
    async copyLink() {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/views/styles/index.scss";
  .about-content {
    .contacts-item {
      position: relative;
      line-height: 30px;
      img {
        width: 150px;
        height: 150px;
        position: absolute;
        top: 0;
        left: 280px;
        transition: all 0.36s;
      }
      &.qrcode-content-item {
        height: 170px;
      }
    }
    .contacts-item--label {
      display: inline-block;
      width: auto;
      margin-right: 5px;
      vertical-align: top;
      line-height: 30px;
    }
    .contacts-item--value {
      display: inline-block;
      vertical-align: top;
      line-height: 30px;
    }
  }

</style>
