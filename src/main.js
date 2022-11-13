import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';

// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 引入mockServe.js---mock数据
import '@/mock/mockServe'; 

// 引入仓库
import store from '@/store';
// 引入swiper样式，因样式不需要对外暴露，所以不存在 import A from B
import "swiper/css/swiper.css";
import {reqGetSearchInfo} from '@/api';

// 测试
// import {reqCategoryList} from '@/api';
// reqCategoryList();

new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route和$router属性
  router,
  // 注册仓库，组件实例的身上会多一个属性$store
  store
}).$mount('#app')
