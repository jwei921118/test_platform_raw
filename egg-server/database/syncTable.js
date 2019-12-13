// 用户表
const user = require('./tables/userInfo');
// 尚未部署合约表
const contractByteCode = require('./tables/contract_bytecode');
// 已经部署的合约
const deployContract = require('./tables/deploy_contract');

// 披萨合约表
const pisaContract = require('./tables/pisa_contract.js');

// 商户合伙人表
const merchantPartner = require('./tables/merchant_partner.js');

// sdr 智能合约
const sdrContract = require('./tables/sdr_contract.js');

// 项目合伙人

const proPartner = require('./tables/pro_partner.js');

// 对账合约
const confirmContract = require('./tables/confirm_contract');


// 生成一个合伙人表


// merchantPartner.belongsTo(pisaContract, {
//     foreignKey: 'merchantId'
// })

// merchantPartner.sync({
//     force: true
// });

// pisaContract.sync();

// proPartner.belongsTo(sdrContract, {
//     foreignKey: 'project_id'
// });

// proPartner.sync({
//     force: true
// });

// sdrContract.sync();

confirmContract.sync();