<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome tooo Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
//在script里面引入组件或者js文件时使用: import x from '@/components/Test.vue'
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
