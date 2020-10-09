import Statistics from '@/views/Statistics.vue';
<template>
  <Layout>
    <!-- <Types class-prefix="statistics" :value="type" v-on:update:value="type = $event" /> -->
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div class="content">
      <div class="date">今天</div>
      <div class="detail" v-for="item in recordList" :key="item.id">
        <span class="tag">{{ item.tags[0].name }}</span>
        <span class="use">{{ item.notes }}</span>
        <span class="money">￥{{ item.amount }}</span>
      </div>
    </div>
    <div class="content">
      <div class="date">今天</div>
      <div class="detail">
        <span class="tag">淘宝</span>
        <span class="use">买了一条裤子</span>
        <span class="money">￥169</span>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "Statistics",
  components: { Types, Tabs },
})
export default class Statistics extends Vue {
  type: string = "-";
  interval: string = "day";
  intervalList= [
    {text:'按天', value: 'day'},
    {text:'按周', value: 'week'},
    {text:'按月', value: 'mouth'}
  ]
  typeList= [
    {text:'支出', value: '-'},
    {text:'收入', value: '+'}
  ]
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecord");
    console.log(this.recordList);
  }
}
</script>
<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected{
    background: #c4c4c4;
    &::after{
      display: none;
    }
  }
}
.content {
  > .date {
    background: #eee;
    line-height: 40px;
    padding-left: 10px;
  }
  > .detail {
    position: relative;
    display: flex;
    justify-content: space-between;
    min-height: 44px;
    align-items: center;
    padding: 0 10px;
    background: white;
    .use,.tag,.money{
      &::after{
        content:'';
        position:absolute;
        left: 10px;
        right: 10px;
        bottom: 0;
        min-height: 1px;
        background: #eee;
      }
    }
    
    > .use {
      flex-grow: 1;
      padding-left: 10px;
      color: #888;
    }
  }
}
</style>
