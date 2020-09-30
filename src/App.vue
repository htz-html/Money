<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
//在script里面引入组件或者js文件时使用: import x from '@/components/Test.vue'
import Vue from 'vue'
export default class App extends Vue {
}
</script>
<style lang="scss">
//在 scss里引入外部的scss文件: @import "~@/assets/styles/test.scss";
@import "~@/assets/styles/helper.scss";
@import "~@/assets/styles/reset.scss";
body{

  //如果是两个团队合作的话，这些最好是写在下面#app里面
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-hei;
  line-height: 1.5;
  color: #333;
  font-size: 14px;
  background: #f4f4f4;
}
</style>
