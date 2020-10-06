import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import tagListModel from '@/models/tagListModel.ts';

Vue.config.productionTip = false

Vue.component('Nav',Nav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)

window.tagList = tagListModel.fetch();
//创建标签
window.createTag=(name:string)=>{
  const message = tagListModel.create(name);
    if(message === 'success'){
      alert("新增标签成功")
    }else if(message === 'duplicated'){
      alert( "标签重复")
    }
}
//删除标签
window.removeTag =(id:string)=>{
  return tagListModel.remove(id)
}
//更新标签
// window.updateTag(id:string, Tag){ 如要传多个参数，这里可以传一个Tag对象。Tag里面不能有id，除了id都可以传，可写成：Exclude<Tag,'id'>。意思是Tag里面的除了id所有的东西
window.updateTag=(id:string, name:string)=>{
  return tagListModel.update(id,name)
}
window.findTag = (id:string) =>{
  return window.tagList.filter((t) => t.id === id)[0];
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
