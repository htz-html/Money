
<template>
  <Layout>
    <!-- <Types class-prefix="statistics" :value="type" v-on:update:value="type = $event" /> -->
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <!-- <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/> -->
      <div class="content" v-for="(group,index) in groupedList" :key="index">
        <h3>{{beautify(group.title)}} <span>{{group.total}}</span></h3>
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
// import intervalList from '@/constants/intervalList.ts'
import recordTypeList from '@/constants/recordTypeList.ts'
import recordStore from '../store/recordStore';
import store from '@/store';
import dayjs from 'dayjs'
import clone from '@/lib/clone';

const oneDay = 86400*1000
@Component({
  name: "Statistics",
  components: { Tabs },
})
export default class Statistics extends Vue {
  type: string = "-";
  // interval: string = "day";
  // intervalList= intervalList;
  typeList= recordTypeList;
  
  beautify(string: string){
    const day = dayjs(string);
    const now = dayjs()
    if(day.isSame(new Date(), 'day')){
      return '今天';
    } else if(day.isSame(now.subtract(1, 'day'), 'day')){ //subtract: 减的意思
      return '昨天'
    } else if(day.isSame(now.subtract(2, 'day'), 'day')){
      return '前天'
    } else if(day.isSame(now, 'year')){
      return day.format('M月D日')
    } else{
      return day.format('YYYY年M月D日')
    }
  }
  tagString(tags:Tag[]){
    return tags.length===0? "无": tags[0].name
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;  //要在这里断言一下，说明一下store.state类型，不然就是any，导致recordList没有类型（早成的原因是ts和vue不配合）
  }
  get groupedList(){
    const {recordList} = this;
    if(recordList.length === 0) {return [] as Result;}
    //[ {title:xxx,items:{}}]
    const newList = clone(recordList)
    .filter(r=>r.type === this.type)
    .sort((a,b)=> dayjs(b.createdAt).valueOf()- dayjs(a.createdAt).valueOf())  //sort:排序，使用createdAt时间来排序。但是有的地方可能不需要这样的排序，所以我们深克隆了一下
    type Result = {title:string, total?:number, items:RecordItem[]}[]
    const result:Result = [{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items: [newList[0]]}]
    for(let i=1;i<newList.length-1;i++){
      const current = newList[i];
      const last = result[result.length -1]
      if((dayjs(last.title)).isSame(dayjs(current.createdAt),'day')) {
        last.items.push(current)
      } else {
        result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items: [current]})
      }
    }
    result.map(group=>{  //区分map(有返回值的forEach)和forEach（没有返回值的map）
      group.total = group.items.reduce((sum, item)=>sum + item.amount, 0);
    })
    return result 
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
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
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
