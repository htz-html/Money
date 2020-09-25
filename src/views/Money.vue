import Layout from '@/components/Layout.vue'; import { Prop } from
'vue-property-decorator';
<template>
  <Layout class-prefix="layout">
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>住</li>
        <li>行</li>
        <li>食</li>
      </ul>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里添加备注" />
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="btns">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
export default {
  name: "Money",
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>

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
.notes {
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background: #eee;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    border: none;
    background: none;
    flex-grow: 1;
  }
}
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
.numberPad {
  .output {
    padding-right: 10px;
    text-align: right;
    font-size: 36px;
    font-family: Consolas, monospace; //直接使用字体
    line-height: 60px;
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
