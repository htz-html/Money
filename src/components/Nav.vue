<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money3" />
      <p>记账</p>
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />
      <p>标签</p>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      <p>统计</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { filter } from "vue/types/umd"; //是自动生成的，不写
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
@import "~@/assets/styles/helper.scss";
nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: white;
  display: flex;
  @extend %outerShadow;
  flex-direction: row;
  >.item {
    padding: 4px 0;
    width: 33.3333%;
    font-size: 12px;
    text-decoration: none;
    color: #333;
    text-align: center;
  }
  .item.selected{
    color: $color-heightlight;
  }
  .icon{
    width: 26px;
    height: 26px;
  }
}
</style>
