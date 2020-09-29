
<template>
    <div>  
        <ul class="tag-all">
            <li 
                v-for="label in labelSource"
                :key="label"
            >
                <span>{{label}}</span>
                <span>></span>
            </li>
      </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Label extends Vue {
    @Prop(Array) labelSource: string[] | undefined
}

</script>
<style lang="scss" scoped>
.tag-all {
  padding: 0 10px;
  > li {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    border-bottom: 1px solid #eee;
  }
}
</style>