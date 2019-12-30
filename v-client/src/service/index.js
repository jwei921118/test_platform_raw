/*
 * @Author: fergus
 * @Date: 2019-09-05 14:41:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-18 16:23:25
 */

import serviceBase from './serviceBase';

const urlLoaction = window.location.origin;
// const urlLoaction = 'http:127.0.0.1:7001';

window.ctxPath = urlLoaction;

const URLS = {
    // 创建用户
    createUser: `${urlLoaction}/contract/user/create`,
    // 获取用户列表
    userList: `${urlLoaction}/contract/user/list`,
    delUser: `${urlLoaction}/contract/user/delete`,
    // 添加合约信息
    addCntBytecode: `${urlLoaction}/contract/bytecode/add`,
    //  获取合约信息
    cntBytecodeList: `${urlLoaction}/contract/bytecode/list`,
    // 删除合约信息
    delCntBytecode: `${urlLoaction}/contract/bytecode/delete`,
    // 部署合约
    deployCnt: `${urlLoaction}/contract/bytecode/deploy`,
    // 已经部署合约列表
    deployedCntList: `${urlLoaction}/contract/deploy/list`,
    // sdr 合约列表
    sdrCntList: `${urlLoaction}/contract/sdrcnt/list`,
    // 执行sdr 合约
    executecnt: `${urlLoaction}/contract/execute`,
    // pisa 商户合约列表
    pisaCntList: `${urlLoaction}/contract/pisacnt/list`,
    // 获取一个产品合伙人
    proPartnerList: `${urlLoaction}/contract/propartner/list`,
    // 商户合伙人列表
    merchantPartnerList: `${urlLoaction}/contract/merchantpartner/list`,
    // 对账合约列表
    confirmCntList: `${urlLoaction}/contract/confirmcnt/list`,
    // 删除已经部署合约
    delDeployedCnt: `${urlLoaction}/contract/deploy/delete`
};

export default {
    // post请求
    ajaxPost(url, params, axiosParmas) {
        return serviceBase.request(URLS[url], params, {
            ...{
                method: 'POST'
            },
            ...axiosParmas
        });
    },
    // 资金端GET请求
    ajaxGet(url, params, axiosParmas) {
        return serviceBase.request(URLS[url], params, {
            ...{
                method: 'GET'
            },
            ...axiosParmas
        });
    }
};