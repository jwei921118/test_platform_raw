'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  // 用户路由
  router.post('/contract/user/create', controller.user.create);
  router.get('/contract/user/list', controller.user.list);
  router.post('/contract/user/delete', controller.user.delUser);
  // 合约信息
  router.post('/contract/bytecode/add', controller.contract.addCntInfo);
  router.get('/contract/bytecode/list', controller.contract.cntInfoList);
  router.post('/contract/bytecode/delete', controller.contract.delCntInfo);
  // 部署合约
  router.post('/contract/bytecode/deploy', controller.contract.deployCnt);
  // 获取合约部署列表
  router.post('/contract/deploy/list', controller.contract.deployedCntList);

  // 删除部署的合约
  router.post('/contract/deploy/delete', controller.contract.delDeployCntFromDB);

  // 执行sdr合约
  router.post('/contract/execute', controller.contract.execute);

  // 区块链
  router.get('/contract/blockchain/getpath', controller.blockchain.getPath)
  router.post('/contract/blockchain/getIdentity', controller.blockchain.getIdentity);
};