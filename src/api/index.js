// 当前这个模块，：API进行统一管理
import requests from './request';
import mockRequests from './mockAjax';

// 三级联动接口
export const reqCategoryList = ()=>{
    // 发请求：axios发请求返回结果Promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    });
}

// 获取banner（Home首页轮播图）
export const reqGetBannerList = ()=>mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

// 获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要带参数
// 当前的这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({
    url: '/list',
    method: 'post',
    data: params
})

// 获取产品详情信息的接口
export const reqGoodsInfo = (skuId)=>requests({
    url: `/item/${skuId}`,
    method: 'get'
})

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

// 获取购物车列表数据的接口
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

// 修改商品选中的状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});

// 登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});

// 获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});