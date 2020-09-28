<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li 
        v-for="tag in dataSource" 
        :key="tag"
        @click="selecte(tag)"
        :class="{active:selectedTags.indexOf(tag)>=0}"
        >{{tag}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop} from 'vue-property-decorator';  

@Component
export default class Tags extends Vue {
  //dataSource:数据源的意思
  @Prop() readonly dataSource: string[] | undefined;   //tags是一个外部的数据，这里不能给他赋值。因为他的值是由外部决定的
  selectedTags: string[] = [];

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
  }
  create(){
    const name = window.prompt("请输入标签名")
    if(name === ''){
      alert("标签名不能为空！")
    }else if(this.dataSource){
      this.$emit('update:dataSource',
      [...this.dataSource, name]
      )
    }
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
