<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text"
             v-model="value"
             placeholder="在这里添加备注" />
    </label>
  </div>
</template>

<script lang="ts">
import  Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
  @Watch('value')
  onValueChanged(value:string){
    this.$emit("update:value", value)
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

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
</style>
