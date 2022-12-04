import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
import { setToken,getToken,removeToken } from "@/utils/token";

const state = {
    code: "",
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = {};
        // 本地存储清空
        removeToken();
    },
};
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if (result.code==200) {
            commit("GETCODE",result.data);
            return "ok";
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if (result.code==200) {
            return "ok";
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        // 服务器下发token，用户唯一标识符（uuid）
        // 将来经常要带上token向服务器要数据
        if (result.code==200) {
            commit("USERLOGIN",result.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 获取用户信息
    async getUserInfo(){
        let result = await reqUserInfo();
        if (resulr.code==200) {
            commit("GETUSERINFO",resulr.data);
            // 持久化存储token
            setToken(result.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 只是向服务器发请求，通知服务器清除token
        let result = await reqLogout();
        // action里面不能操作state，需要提交mutation修改state
        if (result.code==200) {
            commit("CLEAR");
            return "ok";
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
};
const getters = {};

export default{
    state,
    mutations,
    actions,
    getters
}