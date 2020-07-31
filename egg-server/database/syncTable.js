// 用户表
const user = require('./tables/userInfo');
// 尚未部署合约表
const contractByteCode = require('./tables/contract_bytecode');
// 已经部署的合约
const deployContract = require('./tables/deploy_contract');

// 清分合约表
const clearRule = require('./tables/clear_rule');


// 生成一个合伙人表

// user.sync();
// contractByteCode.sync();
deployContract.sync();
// clearRule.sync();

// merchantPartner.belongsTo(pisaContract, {
//     foreignKey: 'merchant_id'
// })

// merchantPartner.sync();

// pisaContract.sync();

// proPartner.belongsTo(sdrContract, {
//     foreignKey: 'project_id'
// });

// proPartner.sync({
//     force: true
// });

// sdrContract.sync();

// confirmContract.sync();