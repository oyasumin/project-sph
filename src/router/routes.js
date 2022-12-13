// 引入一级路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder';

// // 该函数只有在用户访问的时候才会执行（路由懒加载）
// const foo = () => {return import("@/pages/Home")};

// 路由配置信息
export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },
    // beforeEnter: (to, from, next) => {
    //   if (from.path=='pay') {
    //     next();
    //   } else {
    //     next(false);
    //   }
    // }
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path=='trade') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if (from.path=='/shopcart') {
        next();
      } else {
        // 从其它路由组件而来则停留在当前
        next(false);
      }
    }
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { show: true },
  },
  {
    path: "/home",
    component: Home,
    // component: foo,
    meta: { show: true },
  },
  {
    // 下面这种写法代表params参数可以传递也可以不传递
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  // 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
  {
    path: "*",
    redirect: "/home",
  },
];
