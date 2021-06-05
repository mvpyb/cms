<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="login-ruleForm"
  >
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-form-item prop="phone">
            <el-input
              ref="phone"
              v-model="newAccount"
              name="phone"
              placeholder="手机号"
              :clearable="true"
              tabindex="1"
              type="text"
              maxlength="11"
              autocomplete="new-password"
            >
              <template slot="prepend">+ 86 </template>
            </el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item prop="msgcode">
                <el-input
                  ref="msgcode"
                  v-model="newMsgCode"
                  maxlength="6"
                  :clearable="true"
                  placeholder="验证码"
                  name="msgcode"
                  @keyup.enter.native="login"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <get-msg-code :receive-num="ruleForm.phone" :template-id="2" />
                <div style="text-align: right" @click="$router.push( '/noReceivedCode' )">
                  <el-button type="text" size="mini" style="font-size: 12px">收不到验证码？</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-form-item>
            <div class="grid-content bg-purple">
              <el-button
                :loading="loading"
                :disabled="!newMsgCode || !newAccount"
                type="primary"
                style="width:100%;"
                @click.prevent="login"
              >
                登录
              </el-button>
            </div>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { GetOs, isPc } from '@/utils/browser'
import { getCookieByKey } from '@/utils/auth'
import { request } from '@/api/http'
// import { initUrl } from '@/utils/init'
import getMsgCode from './getMsgCode'
import { validPhone, validCode } from '@/utils/validate'

export default {
  name : 'LoginPhone',
  components : { getMsgCode },
  data() {
    const validateCode = ( rule, value, callback ) => {
      if ( !validCode( value ) ) {
        callback( new Error( '请输入合法验证码' ) )
      } else {
        callback()
      }
    }
    const checkPhone = ( rule, value, callback ) => {
      // console.log( 'value', value, validPhone( value ) )
      if ( !validPhone( value ) ) {
        return callback( new Error( '请输入正确的手机号' ) )
      } else {
        callback()
      }
    }
    return {
      activeName : '1',
      codeSrc : '',
      // baseUrl: '',
      ruleForm : {
        phone : '',
        code : ''
      },
      rules : {
        phone : [
          { required : true, trigger : ['blur', 'change'], validator : checkPhone }
        ],
        code : [
          { required : true, trigger : ['blur', 'change'], validator : validateCode }
        ]
      },
      loading : false,
      redirect : undefined,
      otherQuery : {}
    }
  },
  computed : {
    newAccount : {
      get : function() {
        return this.ruleForm.phone.replace( /\s/g, '' )
      },
      set : function( val ) {
        this.ruleForm.phone = val.replace( /\s/g, '' )
      }
    },
    newMsgCode : {
      get : function() {
        return this.ruleForm.code.replace( /\s/g, '' )
      },
      set : function( val ) {
        this.ruleForm.code = val.replace( /\s/g, '' )
      }
    }
  },
  created() {
    // const { loginUrl } = initUrl()
    // this.baseUrl = loginUrl
  },
  methods : {
    login() {
      this.loading = true
      this.$refs['ruleForm'].validate( ( valid ) => {
        if ( valid ) {
          const loginParams = Object.assign( {}, this.ruleForm, {
            action : 10005,
            deviceId : getCookieByKey( 'device_fingerprint' ) || '',
            deviceOS : GetOs(),
            deviceType : 'web',
            source : isPc() ? 'pc' : 'mobile'
          } )
          request( loginParams )
            .then( response => {
              return this.$store.dispatch( 'user/saveToken', response.data.token )
            } )
            .then( () => {
              this.$router.push( `/menu` )
              this.loading = false
            } )
            .catch( () => {
              this.loading = false
            } )
        }
        return false
      } )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
