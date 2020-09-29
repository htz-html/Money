<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit = "saveRecord" />
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{record}}
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue'
import Tags from '@/components/Money/Tags.vue'
import Notes from '@/components/Money/Notes.vue'
import Types from '@/components/Money/Types.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import {Component, Watch} from 'vue-property-decorator'

//1.我要把选中的标签、备注内容、类型、输入的数字收集到一个对象里面。
//2.ts对象的声明需要在外面先做一下操作: record 记录的意思
type Record = {
  tags:string[]
  notes: string
  type: string
  amount: number
}
//3.最后在34行写在data()里面

@Component({
  name: "Money",
  components:{ Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  tags = ['衣','食','住','行'];
  recordList : Record[] = [];

  record : Record = {
    tags:[], notes: '', type:'-', amount: 0
  }

  onUpdateTags(value:string[]){
    this.record.tags = value
  }
  onUpdateNotes(value:string) {
    this.record.notes = value
  }

  //保存到localStorage
  //1.点击NumberPad组建的OK时，保存到localStorage
  //2.在OK里面传submit，此页面接收，并触发saveRecord
  //3.为了方便每次保存，需要以数组的形式，所以定义了了34行的数组recordList
  //4.把this.record，push进recordList
  //5.因为有可能很多地方修改recordList，所以为了统一管理，用到了监听watch
  //6.保存localStorage的条件是字符，所以转换成JSON形式。
  //7.此时，出现一个bug，两次点击ok，里面存的值是一样的。因为push的时候第二次给record赋值，是地址值
  //8.反正这里要做一个push之前把对象深拷贝一下；
  //9.深拷贝：第一，先变成字符串，然后字符串创造出一下新的对象就好了。

  saveRecord(){
    const record2 = JSON.parse(JSON.stringify(this.record))
    this.recordList.push(record2)
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
  }
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>