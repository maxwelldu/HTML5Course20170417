import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import GoodsList from '@/components/GoodsList'
import Detail from '@/components/Detail'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/list/:cat_id',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/detail/:goods_id',
      name: 'Detail',
      component: Detail
    }
  ]
})
