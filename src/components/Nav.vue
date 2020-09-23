<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="money" />
      <div>记账</div>
    </router-link>
    <router-link to="/labels">
      <Icon name="label" />
      <div>标签</div>
    </router-link>
    <router-link to="/statistics">
      <Icon name="statistics" />
      <div>统计</div>
    </router-link>
  </div>
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
.nav {
  display: flex;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.214) 0 0 5px;
  a {
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding-top: 5px;
  }
}
</style>
