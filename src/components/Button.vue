import Button from '@/components/Button.vue';
<template>
<!-- @click="$emit('click',$event)",是为了触发引用此组件外面的大的Button -->
    <button class="button" @click="$emit('click',$event)">
        <slot />
    </button>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component
export default class Button extends Vue {
    
}
</script>

<style lang="scss" scoped>
.button{
  padding: 0 20px;
  min-height: 40px;
  border: none;
  background: #aaa;
  border-radius: 5px;
  color: white;
}
</style>