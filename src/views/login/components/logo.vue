<template>
  <div class="logo-contanier">
    <img :src="require('@/assets/imgs/logo.png')" alt="">
    <span class="name name1">S</span>
    <span class="name name2">hadow Creator</span>
  </div>
</template>

<script>
export default {
  name : 'Logo'
}
</script>

<style lang="scss" scoped>
  img{
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .name {
    vertical-align: middle;
    font-weight: 400;
    font-size: 26px;
    color: rgba(156, 52, 41, 1);
    font-style: normal;
    letter-spacing: 0;
    line-height: 42px;
    text-decoration: none;
  }
  .name1{

  }
  .name2{
    color: rgba(22, 23, 22, 1);
  }
</style>
