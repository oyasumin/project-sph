// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store';

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call|apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call传递参数用逗号隔开，apply方法执行传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // call|apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call传递参数用逗号隔开，apply方法执行传递数组
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
let router = new VueRouter({
  // 配置路由，kv一致可以省略v
  routes: routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // y=0代表滚动条在最上方
    return { y: 0 };
  },
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
  // to：可以获取到你要跳转到那个路由的信息
  // from：可以获取到你从哪个路由来的信息
  // next：放行函数
  // next(); next('/login');->跳转至指定路由 next(false);->跳转至from的路由
  // next()的效果和return不一样，不会导致函数退出
  
  // 用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token
  // 用户信息，字符串空为false，但是对象空为true
  let name =  store.state.user.userInfo.name;

  if (token) {
    // 已经登录了则不可以去login[不能去，停留在首页]
    if (to.path=='/login') {
      next('/');
    } else {
      // 登录了，但是去的不是login
      // 如果用户名已有
      if (name) {
        next();
      } else {
        // 没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // 获取用户信息失败，可能是token已过期导致获取不到用户信息，需要重新登录
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {   
    // 未登录，不能去交易相关页面
    let toPath = to.path;
    if (toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1) {
      // 把未登录的时候想去没去成的地址存在路由中
      next('/login?redirect='+toPath);
    } else {
      next();
    }
  }
});

export default router;
