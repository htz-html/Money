<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="btns">
      <button @click="inputNum">1</button>
      <button @click="inputNum">2</button>
      <button @click="inputNum">3</button>
      <button @click="remove">删除</button>
      <button @click="inputNum">4</button>
      <button @click="inputNum">5</button>
      <button @click="inputNum">6</button>
      <button @click="clear">清空</button>
      <button @click="inputNum">7</button>
      <button @click="inputNum">8</button>
      <button @click="inputNum">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputNum" class="zero">0</button>
      <button @click="inputNum">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString()

  inputNum(event: MouseEvent){
    const button = (event.target as HTMLButtonElement)  //as HTMLButtonElement一种强制去掉警告，也就是告诉检查者button的值不可能为空
    const input = button.textContent!  //表示不要判断为空的情况了。去掉”！“试试就知道了
    if(this.output.length === 16) {
      return
    }
    if(this.output === '0') {
      if('01234567889'.indexOf(input) >= 0) {
        this.output = input
      } else {
        this.output += input
      }
      return
    }
    if(this.output.indexOf('.') >= 1 && input === '.') {
      return 
    }
    
    this.output += input
  }
  remove(){
    let del = this.output;
    if(del.length === 1){
      this.output = '0'
    } else {
      this.output = del.substring(0, del.length-1);
      // this.output = del.slice(0,-1);
    }
  }
  clear(){
    this.output = '0'
  }
  ok() {
    this.$emit("update:value", +this.output)
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.numberPad {
  .output {
    padding-right: 10px;
    text-align: right;
    font-size: 36px;
    font-family: Consolas, monospace; //直接使用字体
    line-height: 60px;
    min-height: 60px;
    @extend %innerShadow;
    // box-shadow: inset 0 -5px 5px -5px fade-out(black,0.7); // 向上的阴影，想要同时添加上下阴影
    // box-shadow: inset 0 -5px 5px -5px fade-out(black,0.7), //向上的阴影，想要同时添加上下阴影
    // inset 0 -5px 5px -5px  fade-out(black,0.7);//向上的阴影
  }
  .btns {
    @extend %clearFix; //extend继承；是把当前选择器复制到 “%clearflex”那里去，使用clearflex的scss
    font-size: 16px;
    button {
      height: 64px;
      width: 25%;
      border: none;
      background: transparent;
      &.ok {
        height: 64 * 2px;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f2f6ff;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>
