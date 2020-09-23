declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
// 谷歌搜索typescript svg cannot find module得出的。解决Nav组件里面svg的问题
declare module "*.svg" {
  const content: any;
  export default content;
}