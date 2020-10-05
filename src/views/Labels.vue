<template>
  <Layout>
    <div class="tag-all">
            <router-link 
              class="tag"
              v-for="tag in tags"
              :key="tag.id"
              :to="`/labels/edit/${tag.id}`"
            >
                <span>{{tag.name}}</span>
                <span class="icon">
                  <Icon name = "right"/>
                </span>
            </router-link>
      </div>
      <div class="createTag-btnBox">
        <button class="createTag" @click="createTag">新建标签</button>
      </div>
  </Layout>
</template>

<script lang="js">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import tagListModel from '@/models/tagListModel.ts';

tagListModel.fetch() //一开始就fetch()一下
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;
  createTag(){
    const name = window.prompt("请输入标签名")
    if(name){
      const message = tagListModel.create(name);
      if(message === 'success'){
        alert(message,"新增标签成功")
      }else if(message === 'duplicated'){
        alert( message,"标签重复")
      }
    } 
  }
};
</script>
<style lang="scss" scoped>
.tag-all {
  padding-left:14px;
  background: white;
  > .tag {
    display: flex;
    min-height: 44px;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    align-items: center;
    svg{
      width: 16px;
      color: #888;
      margin-right: 14px;
    }
  }
}
.createTag{
  padding: 0 20px;
  min-height: 40px;
  border: none;
  background: #aaa;
  border-radius: 5px;
  color: white;
  &-btnBox {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
