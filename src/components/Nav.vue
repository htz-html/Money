<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money3" />标签
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import { filter } from "vue/types/umd";
//下面的import会报错，解决办法
//答：去谷歌搜索typescript svg cannot find module，得到一个全英文网站，意思就是要你去创建一个.d.ts的文件，
//里面添加它所要求的的一段代码。要因为我们的文件有“.d.ts”后缀的文件，所以可以不用新创建文件，直接添加到shims-vue.d.ts文件里面。
// import x from '@/assets/icons/money.svg';
import Icon from '@/components/Icon.vue';

let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0 0 5px;
  flex-direction: row;
  >.item {
    padding: 5px 0;
    width: 33.3333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;;
    font-size: 12px;
    text-decoration: none;
    color: #333;
  }
  .item .selected{
    color: rgb(0, 72, 255);
  }
  .icon{
    width: 28px;
    height: 28px;
  }
}
</style>
