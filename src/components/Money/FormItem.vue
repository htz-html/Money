<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import  Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default:''}) readonly value!: string;
  @Prop({required:true}) fieldName!: string;
  @Prop(String) placeholder?: string;
  onValueChanged(value:string){
    this.$emit("update:value", value)
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.formItem {
  @extend %positionFixed;
  bottom: 355px;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background: #eee;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    border: none;
    background: none;
    flex-grow: 1;
  }
}
</style>
