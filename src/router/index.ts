import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue'



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path:'/money',
    component: Money
  },
  {
    path:'/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    // 会匹配所有路径,你输入的链接会先依次匹配上面的，都没有才进入这个页面。
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
