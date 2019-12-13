/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-14 15:21:33
 * @LastEditTime: 2019-06-14 15:21:33
 * @LastEditors: your name
 */
import axios from "axios";
import tools from "../utils/tools";


// 创建axios实例
const serviceBase = axios.create({
    // baseURL: '',
    timeout: 60000 // 请求的超时时间
    // withCredentials: true // 允许携带cookie   //先暂时关闭，这个会影响设备管理上传http文件跨域
});

// 请求拦截器
serviceBase.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

let flag = true;
// 响应拦截器

serviceBase.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            return {};
        }
        let {
            data
        } = response;

        if (data && parseInt(data.code, 10) === 403 && flag) {
            flag = false;
            window.sessionStorage.removeItem("access-token");
        }
        tools.closeLoading();
        return data;
    },
    error => {
        tools.message("网络错误,请刷新重试!", "error");
        tools.closeLoading();
        return Promise.reject(error);
    }
);

function errorHandler(error) {
    if (process.env.NODE_ENV !== "production") {
        console.info("%c [axios error]:", "color: yellow", error);
    }
}
/**
 * 封装axios的请求
 * @param url {String} 请求url
 * @param queryParams {Object} 请求参数，参数为对象
 * @param axiosParams {Object} axios的相关设置参数，如 method，loading，responseType
 */
function request(url, queryParams, axiosParams) {
    console.log(url);
    if (!url) {
        tools.message("url null", "error");
        return;
    }
    queryParams = queryParams || {};
    axiosParams = axiosParams || {};

    //queryParams._$_ = new Date().getTime();
    // 丑陋的设置默认值
    axiosParams.method = axiosParams.method || "GET";
    axiosParams.url = url;
    axiosParams.responseType = axiosParams.responseType || "json";
    axiosParams.loading = axiosParams.loading || false;
    if (axiosParams.loading) {
        tools.showLoading(axiosParams.loadingText);
    }
    // 根据请求类型，将params设置到对应的属性中
    if (axiosParams.method.toLowerCase() === "post") {
        axiosParams.data = queryParams;
    } else {
        axiosParams.params = queryParams;
    }
    return serviceBase(axiosParams).catch(errorHandler);
}


export default {
    request
};