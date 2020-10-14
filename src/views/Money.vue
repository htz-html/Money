<template>
  <div class="box">
    <Layout class-prefix="layout">
    <Tabs class="money-tabs" class-prefix="money" :value="record.type" @update:value="onUpdateTypes" :data-source="typeList" />
    <!-- <Types :value.sync="record.type"/> -->
    <Tags @update:value = "onUpdateTags" :clientHeight = "clientHeight" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="请输入标签名" :value.sync="record.notes"/>
    </div>
    <NumberPad :value.sync="record.amount" @submit = "saveRecord" />
  </Layout>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Tags from '@/components/Money/Tags.vue'
import FormItem from '@/components/Money/FormItem.vue'
import Tabs from '@/components/Tabs.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import {Component} from 'vue-property-decorator'

const version = window.localStorage.getItem('version') || '0';
type RecordItem = {
    tags:string[]
    notes: string
    type: string
    amount: number
    createdAt?:string
}
@Component({
  name: "Money",
  components:{ Tags, FormItem, Tabs, NumberPad },
})
export default class Money extends Vue {
  clientHeight=0;
  typeList= [
    {text:'支出', value: '-'},
    {text:'收入', value: '+'}
  ]
  get recordList(){
    return this.$store.state.recordList
  }
  created() {
    this.$store.commit('fetchRecord')
    this.clientHeight=document.documentElement.clientHeight;
    console.log(document.documentElement.clientHeight)
    
  }
  mounted() {
    window.onresize = function temp() {
    this.clientHeight=document.documentElement.clientHeight;
    }
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
<style lang="scss" scoped>
  .box{
    margin-top: 60px;
    margin-bottom: 55px;
  }
  .money-tabs ::v-deep .money-tabs-item{
    font-size: 20px;
    height: 60px;
  } 
</style>