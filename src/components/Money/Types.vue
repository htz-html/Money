import Types from '@/components/Money/Types.vue';
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
import { Component } from 'vue-property-decorator';  //是干嘛的，谷歌搜索vue-property-decorator

@Component  //输入@Com出来之后按tab键，上面{Component}就会自动引入
export default class Types extends Vue{
  type = '-'
  selectType (type: string) {  // 给type加string是唯一用到ts的语法
    if(type !== '-' && type !== '+'){
      throw new Error('type is unkonw')
    }
    this.type = type
  }
}
// export default {
//   name: 'Types',
//   props:['xxx'],
//   data(){
//     return{
//       type: '-',  // - 表示支出，+ 表示收入
//       selected:'selected'
//     }
//   },
//   mounted(){
//     console.log(this.xxx)
//   },
//   methods: {
//     selectType (type){
//       if(type !== '-' && type !== '+'){
//         throw new Error('type is unkonw')
//       }
//       this.type = type
//     }
//   },
// };
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
