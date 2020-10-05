<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text"
             v-model="value"
             :placeholder="placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import  Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';

  @Prop({required:true}) fieldName!: string;
  @Prop(String) placeholder?: string;
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
