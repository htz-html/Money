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
import { Component, Prop } from 'vue-property-decorator';  

@Component 
export default class Types extends Vue{
  type = '-'
  @Prop(Number) toFather: number | undefined
  // @Prop(Number) toFather = 0;
  selectType (type: string) { 
    if(type !== '-' && type !== '+'){
      throw new Error('type is unkonw')
    }
    this.type = type
  }
  mounted(){
    if(this.toFather===undefined) {
      console.log('没有toFather')
    }else{
      console.log(this.toFather.toString())
    }
  }
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
