<template>
  <div>
    <ul class="types">
      <li :class="type==='-' && 'selected'" 
      @click="selectType('-')">支出</li>
      <li :class="type==='+' && 'selected'" 
      @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator';  

@Component 
export default class Types extends Vue{
  @Prop(String) readonly type!: string;
  selectType (type: string) { 
    if(type !== '-' && type !== '+'){
      throw new Error('type is unkonw')
    }
    this.$emit('update:value', type)
  }
  
  //type是外面传来的，所以这个页面只能读不能写。所以监听也不需要了
  // @Watch('type')  //为什么要使用watch，而不是24行呢。因为watch只在变化的时候触发。而24行是每点击一次都会触发，点击相同的也会触发
  // onTypeChanged(value:string){
  //   this.$emit('update:value', value)
  // }
}
</script>
<style lang="scss" scoped>
.types {
  display: flex;
  background: #bbb;
  > li {
    position: relative;
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    &.selected::after {
      // &表示当前li
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: #666;
      
    }
  }
}
</style>
