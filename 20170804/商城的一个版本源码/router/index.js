import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import GoodsList from '@/components/GoodsList';
import Detail from '@/components/Detail';
import Search from '@/components/Search';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/list/:cat_id',
      name: 'List',
      component: GoodsList,
    },
    {
      path: '/detail/:goods_id',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/search/:search_text',
      name: 'Search',
      component: Search,
    },
  ],
});
