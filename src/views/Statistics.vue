
<template>
  <Layout>
    <!-- <Types class-prefix="statistics" :value="type" v-on:update:value="type = $event" /> -->
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <div class="content" v-for="(group, index) in result" :key="index">
        <h3>{{group.title}}</h3>
        <div class="detail" v-for="item in group.items" :key="item.id">
          <span>{{tagString(item.tags)}}</span>
          <span class="use">{{item.notes}}</span>
          <span>￥{{item.amount}}</span>
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
import store from '@/store';

@Component({
  name: "Statistics",
  components: { Tabs },
})
export default class Statistics extends Vue {
  type: string = "-";
  interval: string = "day";
  intervalList= intervalList;
  typeList= recordTypeList;
  
  tagString(tags:Tag[]){
    console.log(tags)
    return tags.length===0? "无": tags[0].name
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;  //要在这里断言一下，说明一下store.state类型，不然就是any，导致recordList没有类型（早成的原因是ts和vue不配合）
  }
  get result(){
    const {recordList} = this;
    type HashTableValue = {title: string, items: RecordItem[]}
    const hashTable:{[key:string]:HashTableValue} = {};  //声明hashTable的类型，记住，如何声明一个空对象的类型
    for(let i=0;i<recordList.length;i++){
      const [date, time] = recordList[i].createdAt!.split('T')
      hashTable[date] = hashTable[date] || {title:date, items:[] }  //等于他自己，如果是个空的，就等于一个空数组
      hashTable[date].items.push(recordList[i]);
    }
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
  > h3{
    min-height: 40px;
    line-height: 40px;
    padding-left: 15px;
  }
  > .detail {
    position: relative;
    display: flex;
    justify-content: space-between;
    min-height: 44px;
    align-items: center;
    padding: 0 15px;
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
