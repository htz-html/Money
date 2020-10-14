<template>
  <div class="nav-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="js">
export default {
    props:["classPrefix"],
    name:"Layout"
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  .content {
    overflow: auto;
    flex-grow: 1;
  }
}
</style>
