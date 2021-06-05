<template>
  <div class="about-container w920">
    <div class="min-height">
      <div class="about-title syBold">
        联系我们
      </div>
      <div class="about-content ">
        <div class="about-content-item sub-info">
          <div class="time">
            发布时间：{{ details.publishTime | formatUnixToDayTime }}
          </div>
          <div class="source">来源：{{ details.source }}</div>
          <div class="shares clearfix">
            <div class="share-link fl wechat">
              <svg-icon class-name="icons" icon-class="wechat" @click.stop="click" />
              <div class="wx-share-qrcode">
                <img :src="require('@/assets/test/wechat-1.png')" alt="">
              </div>
            </div>
            <div class="share-link fl weibo">
              <svg-icon class-name="icons" icon-class="weibo" @click.stop="shareWeibo" />
            </div>
            <div class="share-link fl copy">
              <svg-icon class-name="icons" icon-class="link" @click.stop="copyLink" />
            </div>
          </div>
        </div>
        <div class="article about-content-item">
          {{ details.content }}
        </div>
        <div class="contacts-item about-content-item syRegular" style="margin-top: 30px;">
          <span> 邮箱：</span> {{ details.email }}
        </div>
        <div class="contacts-item about-content-item syRegular">
          <span> 电话：</span> {{ details.phone }}
        </div>
        <div class="contacts-item about-content-item syRegular">
          <span> 地址：</span> {{ details.address }}
        </div>

        <div class="map-info">
          style=" width: 582px;height: 427px;"
          <!--          <img :src="require('@/assets/test/map.png')" alt="">-->
          <baidu-map
            ak="ov7zC5g8Ac0ScLPp1zG8TZDuiGfty9Hh"
            :zoom="map.zoom"
            :style="{ width:map.width,height:map.height }"
            :scroll-wheel-zoom="true"
            @ready="handler"
            @click="getClickInfo"
          />
          <!-- <baidu-map
            :style="{ width:map.width,height:map.height }"
            class="map"
            ak="ov7zC5g8Ac0ScLPp1zG8TZDuiGfty9Hh"
            :zoom="map.zoom"
            :center="{lng: map.center.lng, lat: map.center.lat}"
            :scroll-wheel-zoom="true"
            @ready="handler"
            @click="getClickInfo"
          >
            &lt;!&ndash;比例尺控件&ndash;&gt;
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT" />
            &lt;!&ndash;缩放控件&ndash;&gt;
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" />
          </baidu-map>-->
        </div>

      </div>
    </div>
    <back-to-top />
  </div>
</template>

<script>
// https://www.cnblogs.com/jiekzou/p/10485604.html
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
// import BmScale from 'vue-baidu-map/components/controls/Scale'
// import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
// import BmMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer'
// import BmMarker from 'vue-baidu-map/components/overlays/Marker'
// import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BackToTop from '@/components/BackToTop'
export default {
  name : 'Contacts',
  components : {
    BackToTop,
    BaiduMap
    // BmScale,
    // BmNavigation,
    // BmMarkerClusterer,
    // BmMarker,
    // BmInfoWindow
  },
  data() {
    return {
      map : {
        center : { lng : 121.493108, lat : 31.218167 }, // '南京市',
        zoom : 12,
        width : '800px',
        height : '800px'
      },

      details : {
        id : 1,
        publishTime : 1605277390,
        source : 'SIAB',
        url : 'https://192.168.60.72:9527/#/dashboard',
        content : '上海中小企业国际合作协会苹是一家立足上海、扎根本土、服务全球中小企业的国际合作组织。由XXX和XXXX等人于1993年X月X日创立，并命名为上海中小企业国际合作协会。',
        creator : 1,
        type : 1,
        phone : '020-00000000',
        email : 'bd@siab.com.cn',
        address : '上海市黄浦区陆家浜路林荫路258号'
      }
    }
  },
  computed : {},
  created() {},
  async mounted() {},
  methods : {
    // https://www.jianshu.com/p/350e4488248d
    handler( { BMap, map } ) {
      console.log( 'handler', BMap, map )
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
      // console.log( 'getClickInfo', e, e.point.lng, e.point.lat )
      this.map.center.lng = e.point.lng
      this.map.center.lat = e.point.lat

      // const geoCoder = new BMap.Geocoder()
      // geoCoder.getLocation( e.point, res => {
      //   console.log( '利用坐标获取地址的详细信息', res )
      //   this.adressName = res.address
      // } )
      // this.map.clearOverlays()
      // var icon = new BMap.Icon( './static/map2.png', new BMap.Size( 20, 20 ) )
      // var pointer = new BMap.Point( e.point.lng, e.point.lat )
      // var marker = new BMap.Marker( pointer, { icon : icon } )
      // this.map.addOverlay( marker )
      // var circle = new BMap.Circle( pointer, 500 )
      // circle.setFillColor( 'blue' ) // 填充颜色
      // circle.setStrokeWeight( 1 )// 设置圆形边线的宽度，取值为大于等于1的整数。
      // circle.setFillOpacity( 0.3 )// 返回圆形的填充透明度。
      // circle.setStrokeOpacity( 0.3 )// 设置圆形的边线透明度，取值范围0 - 1。
      // this.map.addOverlay( circle )// 把圆添加到地图中
      // // 以定位点为中心自定义画圆
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
</style>
