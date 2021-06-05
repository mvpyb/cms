<template>
  <!--  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
      </div>
    </el-form>
    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>-->

  <div class="section-container login-container syNormal un-select">
    <div class="body fix-width">
      <div class="top">
        <logo class="logos" />
        <div class="desc" />
      </div>
      <div class="main">
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane label="账号密码登录" name="account">
            <login-pwd />
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="phone">
            <login-phone />
          </el-tab-pane>
        </el-tabs>

        <div class="foot-link clearfix">
          <router-link class="fl link-item" :to="{ name: 'SelectVaild' }">忘记密码</router-link>
          <router-link class="fr link-item" :to="{ name: 'Register' }">立即注册</router-link>
        </div>
      </div>
      <div class="footer">
        <div class="desc" />
      </div>
    </div>
  </div>

</template>

<script>
// import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'

import Logo from './components/logo'
// import LoginPhone from './compontents/login/loginPhone'
import LoginPwd from './components/loginPwd'
import LoginPhone from './components/loginPhone'

export default {
  name : 'Login',
  components : { Logo, LoginPwd, LoginPhone },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // loginForm: {
      //   username: 'admin',
      //   password: '111111'
      // },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      // },
      // passwordType: 'password',
      // capsTooltip: false,
      // loading: false,
      showDialog : false,
      // redirect: undefined,
      // otherQuery: {},

      activeName : 'account',
      logo : require( '@/assets/imgs/logo.png' )
    }
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       const query = route.query
  //       console.log('route', route, query)
  //       if (query) {
  //         this.redirect = query.redirect
  //         this.otherQuery = this.getOtherQuery(query)
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    const res = this.$route.params && this.$route.params.type
    this.activeName = res || 'account'
  },
  mounted() {
    // const query = this.$route.query
    // this.redirect = query.redirect
    // this.otherQuery = this.getOtherQuery(query)
    // console.log('mounted $route', this.$route, query)
    // console.log('mounted redirect', this.redirect)
    // console.log('mounted otherQuery', this.otherQuery)

    // if (this.loginForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
    // window.removeEventListener('storage', function() {
    //   console.log(  )
    // } )
  },
  methods : {
    // checkCapslock(e) {
    //   const { key } = e
    //   this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    // },
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },

    // handleLogin() {
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       this.loading = true
    //       this.$store.dispatch('user/login', this.loginForm)
    //         .then(() => {
    //           this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
    //           this.loading = false
    //         })
    //         .catch(() => {
    //           this.loading = false
    //         })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },

    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<!--<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>-->

<style lang="scss" scoped>
  /*自定义tab*/
  .logos{
    text-align: center;
    margin: 30px 0 15px;
  }
  @import '~@/styles/variables.scss';
  $fsizeA : 20px;
  $fsizeB : 14px;
  .login-container{
    width: 100%;
    min-height: 100%;
    padding: 160px 0 144px;
    position: relative;
    background-image: url('~@/assets/imgs/bgimg.svg');
  }
  .main {
    .title{
      font-size : $fsizeA;
      text-align: center;
      font-weight:bold;
      color: #000;
    }
    .foot-link{
      text-align: center;
      .link-item{
        margin: 0;
        font-size: 12px;
        color:#1890ff;
      }
    }
  }
  .body {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #fff;
    padding: 10px 30px;
  }
  .fix-width{
    min-width: 260px;
    width: 390px;
    margin: 0 auto;
  }
  .top {
    .header{
      position: relative;
      padding-top: 20px;
    }
    .rtc-logo {
      text-align: center;
      color : #4578fb;
      .icons{
        width: 80px;
        height: 80px;
      }
      img{
        display: inline-block;
        vertical-align: middle;
      }
      span{
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        font-size: $fsizeA;
        color: $font01;
        font-weight: bold;
      }
    }
    .settings {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      .iconfont{
        color: #777;
        font-size: 20px;
        line-height: 40px;
      }
    }
  }
  .desc{
    text-align: center;
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }

</style>

