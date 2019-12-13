// 合约字节码
const sequelize = require('../config')

const Sequelize = require('sequelize')
const Model = Sequelize.Model

class DeployContract extends Model {}

DeployContract.init({
  // 合约名称
  contract_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  belong: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // 合约类型
  contract_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // 合约地址
  identity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // 部署人
  deployer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // 交易哈希
  txhash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
}, {
  sequelize,
  modelName: 'deployContract',
  tableName: 'deploy_contract',
  timestamps: false
})

module.exports = DeployContract;