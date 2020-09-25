<template>
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
</template>

<script lang="ts">
export default {};
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
