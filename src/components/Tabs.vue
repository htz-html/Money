<template>
  <ul class="tabs">
      <li v-for="item in dataSource" 
      :key="item.value"
      :class="liClass(item)"
      @click="select(item)"
      >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component,Prop } from "vue-property-decorator";

type DataSourceItem = {text:string, value:string}

@Component({
    name: "Tabs"
})
export default class Tabs extends Vue {
    @Prop({ required:true, type:Array}) dataSource!: DataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix!:string;

    liClass(item:DataSourceItem){
      return {[this.classPrefix+'-tabs-item']:this.classPrefix, selected: item.value === this.value }
    }
    select(item:DataSourceItem){
      this.$emit('update:value',item.value)
    }

}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background: #c4c4c4;
  > li {
    position: relative;
    width: 50%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
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
