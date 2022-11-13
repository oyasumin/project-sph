import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home模块的小仓库
const state = {
    // state中数据默认初始值根据后续存值来定义
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    // floor组件的数据
    floorList: []
};
// mutations是唯一能修改state的地方
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
// 用户处理派发action
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        let result = await reqCategoryList();
        if(result.code == 200) {
            commit("GETCATEGORYLIST",result.data);
        }
    },
    // 获取首页轮播图数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        console.log(result);
        if(result.code == 200) {
            console.log("200");
            commit("GETBANNERLIST",result.data);
            console.log("commit success");
        }
    },
    // 获取floor数据
    async getFloorList({commit}) {
        let result = await reqFloorList();
        console.log(result);
        if(result.code == 200) {
            console.log("200");
            commit("GETFLOORLIST",result.data);
            console.log("commit success");
        }
    }
};
// 计算属性
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}