
<template>
  <Layout>
    <!-- <Types class-prefix="statistics" :value="type" v-on:update:value="type = $event" /> -->
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div class="content">
      <div class="detail" v-for="item in result" :key="item.id">
        {{recordList}}
        <!-- <div class="date">今天</div>
        <span class="tag">{{ item.tags[0].name }}</span>
        <span class="use">{{ item.notes }}</span>
        <span class="money">￥{{ item.amount }}</span> -->
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from '@/constants/intervalList.ts'
import recordTypeList from '@/constants/recordTypeList.ts'
import recordStore from '../store/recordStore';

@Component({
  name: "Statistics",
  components: { Tabs },
})
export default class Statistics extends Vue {
  type: string = "-";
  interval: string = "day";
  intervalList= intervalList;
  typeList= recordTypeList;
    
  get recordList() {
    return (this.$store.state as RootState).recordList;  //要在这里断言一下，说明一下store.state类型，不然就是any，导致recordList没有类型（早成的原因是ts和vue不配合）
  }
  get result(){
    const {recordList} = this;
    const hashTable:{[key:string]: RecordItem[]} = {};  //声明hashTable的类型，记住，如何声明一个空对象的类型
    for(let i=0;i<this.recordList.length;i++){
      const [date, time] = recordList[i].createdAt!.split('T')
      hashTable[date] = hashTable[date] || []  //等于他自己，如果是个空的，就等于一个空数组
      hashTable[date].push(recordList[i])
    }
    console.log(hashTable)
    return hashTable
  }
  created() {
    this.$store.commit("fetchRecord");
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
