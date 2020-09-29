<template>
    <div class="label-title">
        <div class="left"></div>
        <div class="center">标签</div>
        <div class="right">x</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class LabelTitle extends Vue {
    
}
</script>

<style lang="scss" scoped>
.label-title{
    display: flex;
    min-height: 44px;
    align-items: center;
    > .left,.right{
        width: 22px;
    }
    > .center{
        flex-grow: 1;
    }
}
</style>