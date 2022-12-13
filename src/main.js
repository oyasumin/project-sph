import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import {Button,MessageBox} from 'element-ui';

// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// ElementUI注册组件方式一：注册全局组件
Vue.component(Button.name, Button);
// ElementUI注册组件方式二：ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
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

// 统一接收api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api';

import car from '@/assets/car.gif';
// 引入插件
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:car
});

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
});

// 引入表单校验插件（因为仅需文件里面的代码执行即可，所以引入的那个文件不需要暴露）
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    //这里的this其实就是new Vue创建的组件实例
    Vue.prototype.$bus = this;
    // 相当于给每一个组件实例套一个属性，并赋初始值
    Vue.prototype.$API = API;
  },
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route和$router属性
  router,
  // 注册仓库，组件实例的身上会多一个属性$store
  store
}).$mount('#app')
