import { reqGetSearchInfo } from "@/api";

// search模块的小仓库
const state = {
    // 仓库初始状态
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params={}) {
        // 当前这个函数在调用获取服务器数据的时候至少传递一个参数（空对象），即没有参数获取全部的时候
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code==200) {
            commit("GETSEARCHLIST",result.data);
        }
    }
};
// 计算属性
// 项目当中getters主要的作用是：简化仓库中的数据（简化数据而生）
// 可以把我们将来在组件当中需要用的数据简化一下（将来组件在获取数据的时候就方便了）
const getters = {
    // 当前形参state是当前仓库中的state，并非大仓库中的那个state
    goodsList(state){
        // 正常情况下服务器返回数组数据，但是假如网络不佳，则返回的是undefined，此种情况下计算新的属性的属性值至少得是个数组
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}