<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit = "saveRecord" />
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="请输入标签名" @update:value="onUpdateNotes" />
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue'
import Tags from '@/components/Money/Tags.vue'
import FormItem from '@/components/Money/FormItem.vue'
import Types from '@/components/Money/Types.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import {Component, Watch} from 'vue-property-decorator'
import recordListModel from '@/models/recordListModel.ts'
import tagListModel from '@/models/tagListModel.ts';

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
    createdAt?:Date
}
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
//6.做判断
if(version === '0.0.1') {
//7.数据库升级，数据迁移
  recordList.forEach(record => {
    //46行先定义createdAt属性。然后添加到record里面
    record.createdAt = new Date(2020,0,1)
  })
//8.数据迁移之后，要保存下来
  window.localStorage.setItem('recordList', JSON.stringify(recordList))
}
//9.版本改成0.0.2
window.localStorage.setItem('version', '0.0.2')

//1.我要把选中的标签、备注内容、类型、输入的数字收集到一个对象里面。
//2.ts对象的声明需要在外面先做一下操作: record 记录的意思

//3.最后在34行写在data()里面

@Component({
  name: "Money",
  components:{ Tags, FormItem, Types, NumberPad }
})
export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;  //后面recordList就是35行在本地获取的

  record : RecordItem = {
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
    recordListModel.create(this.record)
  }
  @Watch('recordList')
  onRecordListChange(){
    recordListModel.save()
  }
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding:10px 0;
}
</style>