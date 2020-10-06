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

window.createTag=(name:string)=>{
  const message = tagListModel.create(name);
    if(message === 'success'){
      alert("新增标签成功")
    }else if(message === 'duplicated'){
      alert( "标签重复")
    }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
