<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit = "saveRecord" />
    <!-- <Types :value.sync="record.type"/> -->
    <Tabs class="money-tabs" class-prefix="money" :value="record.type" @update:value="onUpdateTypes" :data-source="typeList" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="请输入标签名" :value.sync="record.notes"/>
    </div>
    <Tags @update:value = "onUpdateTags" />
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue'
import Tags from '@/components/Money/Tags.vue'
import FormItem from '@/components/Money/FormItem.vue'
import Tabs from '@/components/Tabs.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import {Component} from 'vue-property-decorator'

//1.数据迁移，也就是说最开始我可能没有createdAt(记录时间)，但是后面我又要每次点击OK的试试记录下时间
//2.那么我们就要把之前的数据，都添加一个时间，但是这个时间没办法找，就只能设置一个固定值。
//3.所以我们最开始的时候就要给项目一个版本0.0.1
// window.localStorage.setItem('version', '0.0.1')
//4.获取当前版本
const version = window.localStorage.getItem('version') || '0';
//5.要获取之前的数据
type RecordItem = {
    tags:string[]
    notes: string
    type: string
    amount: number
    createdAt?:string
}
// const recordList = this.$store.state.recordList;
// // const tagList = tagListModel.fetch();
// //6.做判断
// if(version === '0.0.1') {
// //7.数据库升级，数据迁移
//   recordList.forEach(record => {
//     //46行先定义createdAt属性。然后添加到record里面
//     record.createdAt = new Date(2020,0,1)
//   })
// //8.数据迁移之后，要保存下来
//   window.localStorage.setItem('recordList', JSON.stringify(recordList))
// }
// //9.版本改成0.0.2
// window.localStorage.setItem('version', '0.0.2')

//1.我要把选中的标签、备注内容、类型、输入的数字收集到一个对象里面。
//2.ts对象的声明需要在外面先做一下操作: record 记录的意思

//3.最后在34行写在data()里面

@Component({
  name: "Money",
  components:{ Tags, FormItem, Tabs, NumberPad },
})
export default class Money extends Vue {
  typeList= [
    {text:'支出', value: '-'},
    {text:'收入', value: '+'}
  ]
  get recordList(){
    return this.$store.state.recordList
  }
  created() {
    this.$store.commit('fetchRecord')
  }
  record : RecordItem = {
    tags:[], notes: '', type:'-', amount: 0
  }
  onUpdateTags(value:string[]){
    this.record.tags = value
  }
  onUpdateNotes(value:string) {
    this.record.notes = value
  }
  onUpdateTypes(value:string){
    this.record.type = value
  }
  saveRecord(){
    if(!this.record.tags||this.record.tags.length === 0){
      window.alert("请选择一个标签")
      return
    }
    this.$store.commit('createRecord',this.record)
    if(this.$store.state.createRecordError === null) {
      window.alert("已保存")
      this.record.notes = ''
    }
  }
};
</script>
<style lang="scss">
.notes{
  padding:10px 0; 
}
</style>
<style lang="scss" scoped>
  .money-tabs ::v-deep .money-tabs-item{
    font-size: 22px;
    height: 60px;
  } 
</style>