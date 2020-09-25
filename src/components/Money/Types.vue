<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {};
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
