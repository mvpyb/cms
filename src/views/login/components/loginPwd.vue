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
        <div class="">
          <el-form-item prop="account">
            <el-input
              ref="account"
              v-model="newAccount"
              name="account"
              placeholder="请输入账号"
              :clearable="true"
              tabindex="1"
              type="text"
              maxlength="30"
              autocomplete="new-password"
            />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="">
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="newPassword"
              show-password
              name="password"
              placeholder="请输入密码"
              :clearable="true"
              tabindex="2"
              maxlength="12"
              type="password"
              autocomplete="new-password"
              @keyup.enter.native="login"
            />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="">
          <el-form-item>
            <div class="">
              <el-button
                :loading="loading"
                :disabled="!newAccount || !newPassword"
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
// import { GetOs, isPc } from '@/utils/browser'
// import { getCookieByKey } from '@/utils/auth'
import { login } from '@/api/request.js'
import { validPhone, validEmail, validPasswrod } from '@/utils/validate'
const _ = require( 'lodash' )

export default {
  name : 'LoginPwd',
  components : {},
  data() {
    const validatePassword = ( rule, value, callback ) => {
      if ( !validPasswrod( value ) ) {
        callback( new Error( '密码格式错误' ) )
      } else {
        callback()
      }
    }
    const validateAccount = ( rule, value, callback ) => {
      if ( !validPhone( value ) && !validEmail( value ) ) {
        callback( new Error( '账号格式错误' ) )
      } else {
        callback()
      }
    }
    return {
      activeName : '1',
      codeSrc : '',
      baseUrl : '',
      ruleForm : {
        account : '15961917987',
        password : '123qweqwe'

        // account: '',
        // password: ''
      },
      rules : {
        account : [
          { required : true, trigger : ['blur', 'change'], validator : validateAccount }
        ],
        password : [
          { required : true, trigger : ['blur', 'change'], validator : validatePassword }
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
        return this.ruleForm.account.replace( /\s/g, '' )
      },
      set : function( val ) {
        this.ruleForm.account = val.replace( /\s/g, '' )
      }
    },
    newPassword : {
      get : function() {
        return this.ruleForm.password.replace( /\s/g, '' )
      },
      set : function( val ) {
        this.ruleForm.password = val.replace( /\s/g, '' )
      }
    }
  },
  watch : {
    $route : {
      handler : function( route ) {
        const query = route.query
        if ( query ) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery( query )
        }
      },
      immediate : true
    }
  },
  created() {},
  methods : {
    login : _.throttle( function() {
      this.$refs['ruleForm'].validate( ( valid ) => {
        if ( valid ) {
          const loginParams = {
            ...this.ruleForm
            // deviceId: getCookieByKey('device_fingerprint') || window.location.href,
            // deviceOS: GetOs(),
            // deviceType: 'web',
            // source: isPc() ? 'pc' : 'mobile'
          }
          login( loginParams )
            .then( response => {
              return this.$store.dispatch( 'user/saveToken', response.data.token )
            } )
            .then( () => {
              this.$router.push( { path : this.redirect || '/', query : this.otherQuery } )
              this.loading = false
            } )
            .catch( () => {
              this.loading = false
            } )
        }
        return false
      } )
    }, 500 ),
    getOtherQuery( query ) {
      return Object.keys( query ).reduce( ( acc, cur ) => {
        if ( cur !== 'redirect' ) {
          acc[cur] = query[cur]
        }
        return acc
      }, {} )
    }

  }
}
</script>

<style lang="scss" scoped>
  /*@import '~@/styles/variables.scss';*/
  .imgCode{
    display: inline-block;
    width: 100%;
    height: 36px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
    }
  }
</style>
