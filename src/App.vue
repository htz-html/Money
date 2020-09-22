<template>
  <div id="app">
    <router-view/>
    <hr>
    <div>
      <router-link to="/money">记账</router-link>|
      <router-link to="/labels">标签</router-link>|
      <router-link to="/statistics">统计</router-link>
    </div>
  </div>
</template>

<script lang="ts">
//在script里面引入组件或者js文件时使用: import x from '@/components/Test.vue'
export default {
  
}
</script>
<style lang="scss">
//在 scss里因为外部的scss文件: @import "~@/assets/styles/test.scss";
@import "~@/assets/styles/test.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
