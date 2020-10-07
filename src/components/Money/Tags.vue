<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li 
        v-for="tag in tagList" 
        :key="tag.id"
        @click="selecte(tag)"
        :class="{active:selectedTags.indexOf(tag)>=0}"
        >{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue'
import { mixins } from 'vue-class-component';
import { Component, Prop} from 'vue-property-decorator';  
import {TagHelper} from '@/mixins/TagHelper.ts'

@Component({
  computed:{
    tagList(){
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  //dataSource:数据源的意思
  //TODO
  selectedTags: string[] = [];
  created(){
    this.$store.commit('fetchTags')
  }

  selecte(tag:string){
    //我这个只能选中一个
    this.selectedTags = [tag];

    //这是老师的,可以选中和取消
    // const index = this.selectedTags.indexOf(tag)
    // if(index>=0){
    //   this.selectedTags.splice(index, 1)
    //   console.log(this.selectedTags)
    // }else{
    //   this.selectedTags.push(tag)
    // }
    this.$emit('update:value', this.selectedTags)
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.tags { 
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 5px;
  background: white;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      display: flex;
      align-items: center;
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      padding: 0 15px;
      margin: 10px;
      background-color: #d9d9d9;
    }
    > li.active{
      background-color: $color-heightlight;
      color: #fff;
    }
  }
  > .new {
    padding: 15px 0 10px 10px;
    > button {
      border: none;
      border-bottom: 1px solid;
      color: #666;
      background: transparent;
    }
  }
}
</style>
