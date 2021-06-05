<template>
  <el-button
    type="primary"
    style="width: 100%;"
    :disabled="!receiveNum || cutDowmTime > 0"
    :loading="getCodeLoading"
    @click.prevent="getSMSCode"
  >{{ regainGet }}</el-button>
</template>

<script>
import { getStorageBy, addStorageBy } from '@/utils/auth'
import { request } from '@/api/http'
import _ from 'loadsh'
export default {
  name : 'GetMsgCode',
  props : {
    receiveNum : {
      type : String,
      default : ''
    },
    txt : {
      type : Number,
      default : 1
    },
    type : {
      type : String,
      default : 'phone'
    },
    // 1 注册 2登陆 3 找回密码
    templateId : {
      type : Number,
      default : 1
    }
  },
  data() {
    return {
      // 获取验证码倒计时
      expirationTime : 0,
      cutDowmTime : 0,
      regainGet : '获取验证码',
      getCodeLoading : false
    }
  },
  computed : {
    key() {
      return ( this.templateId === 1 ? 'register' : ( this.templateId === 2 ? 'login' : 'change' ) )
    }
  },
  mounted() {
    this.initTime()
  },
  /**
   * 1、 先从缓存获取时间
   *    1、如果时间为0 则忽略倒计时 并且可以正常获取验证码
   *    2、 如果不 == 0
   *      1、如果小于等于当前时间， 则重复上一步
   *      2、如果大于当前时间， 初始时就开始倒计时
   *      3、当倒计时时间 <= 0, 重置按钮状态
   *
   * 2、点击发送
   *    1、现获取剩余时间 ( 缓存中的倒计时时间 - 当前时间 )
   *        如果剩余时间 <= 0，则重置到期时间 并且重新开始 倒计时
   *         3、当倒计时时间 <= 0, 重置按钮状态
   *        如果剩余时间 > 0 则 return false
   * */
  methods : {
    // 更新时间
    updateTime() {
      const self = this
      const currentTimes = Date.parse( new Date() ) / 1000
      self.cutDowmTime = 60
      self.regainGet = self.txt === 1 ? '获取验证码' : '发送验证码'
      const timeRes = getStorageBy( 'phoneTime' ) || {}
      timeRes[this.key] = currentTimes + self.cutDowmTime
      addStorageBy( 'phoneTime', timeRes )
      const timer = setInterval( () => {
        self.cutDowmTime--
        self.cutDowmTime = Math.max( 0, self.cutDowmTime )
        if ( self.cutDowmTime <= 0 ) {
          self.init()
          clearInterval( timer )
        } else {
          self.regainGet = self.txt === 1 ? self.cutDowmTime + 's后重新获取' : self.cutDowmTime + 's后重新发送'
        }
      }, 1000 )
      self.$once( 'hook:beforeDestroy', () => {
        clearInterval( timer )
      } )
    },
    // 初始化设置时间
    init() {
      this.cutDowmTime = 0
      this.regainGet = this.txt === 1 ? '获取验证码' : '发送验证码'
      const timeRes = getStorageBy( 'phoneTime' ) || {}
      timeRes[this.key] = 0
      addStorageBy( 'phoneTime', timeRes )
    },
    // 初次加载页面
    initTime() {
      const self = this
      const timeRes = getStorageBy( 'phoneTime' ) || {}
      if ( !timeRes || JSON.stringify( timeRes ) === '{}' || !timeRes[this.key] ) {
        self.expirationTime = 0
      } else {
        self.expirationTime = timeRes[this.key]
      }
      if ( !self.expirationTime || self.expirationTime <= 0 ) {
        self.init()
      } else {
        const currentTimes = Date.parse( new Date() ) / 1000
        if ( self.expirationTime <= currentTimes ) {
          self.init()
        } else if ( self.expirationTime - currentTimes > 60 ) {
          self.init()
        } else {
          self.cutDowmTime = self.expirationTime - currentTimes
          const timer = setInterval( () => {
            self.cutDowmTime--
            self.cutDowmTime = Math.max( 0, self.cutDowmTime )
            if ( self.cutDowmTime <= 0 ) {
              self.init()
              clearInterval( timer )
            } else {
              self.regainGet = self.txt === 1 ? self.cutDowmTime + 's后重新获取' : self.cutDowmTime + 's后重新发送'
            }
          }, 1000 )
          self.$once( 'hook:beforeDestroy', () => {
            clearInterval( timer )
          } )
        }
      }
    },
    getSMSCode : _.throttle( function() {
      const self = this
      self.getCodeLoading = true
      const params = {
        template_id : self.templateId
      }
      params.action = 10001
      params.phone = self.receiveNum
      request( params )
        .then( () => {
          this.$emit( 'sendSuccess' )
          self.getCodeLoading = false
          const timeRes = getStorageBy( 'phoneTime' ) || {}
          if ( !timeRes || JSON.stringify( timeRes ) === '{}' || !timeRes[this.key] ) {
            self.expirationTime = 0
          } else {
            self.expirationTime = timeRes[this.key]
          }
          if ( self.expirationTime <= 0 ) {
            self.updateTime()
          } else {
            const currentTimes = Date.parse( new Date() ) / 1000
            if ( self.expirationTime <= currentTimes || self.expirationTime - currentTimes > 60 ) {
              self.updateTime()
            }
          }
        } )
        .catch( () => {
          this.$emit( 'sendError' )
          self.getCodeLoading = false
          self.cutDowmTime = 0
          self.regainGet = self.txt === 1 ? '重新获取' : '重新发送验证码'
        } )
    }, 500 )
  }
}
</script>
