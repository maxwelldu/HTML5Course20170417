import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi from '@/components/Hi'
import Beijing from '@/components/Beijing'
import Wuhan from '@/components/Wuhan'
import Xian from '@/components/Xian'
import Changsha from '@/components/Changsha'
import City from '@/components/City'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/hi',
      component: Hi,
      children: [
        {
          path: 'beijing',
          component: Beijing
        },
        {
          path: 'xi\'an',
          component: Xian
        },
        {
          path: 'changsha',
          component: Changsha
        },
        {
          path: 'wuhan',
          component: Wuhan
        },
        {
          path: '',
          component: City
        }
      ]
    }
  ]
})
