<template>
  <Layout class-prefix="layout">
    <NumberPad :value="record.amount" @update:value="onUpdateAmount" />
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
import {Component} from 'vue-property-decorator'

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
  record : Record = {
    tags:[], notes: '', type:'-', amount: 0
  }


  onUpdateTags(value:string[]){
    this.record.tags = value
  }
  onUpdateNotes(value:string) {
    this.record.notes = value
  }
  onUpdateAmount(value: string){
    this.record.amount = parseFloat(value)
  }
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>