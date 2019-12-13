// 合约字节码
const sequelize = require('../config')

const Sequelize = require('sequelize')
const Model = Sequelize.Model

class ContractBytecode extends Model {}

ContractBytecode.init({
  // 合约描述
  contract_des: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // // 属于哪个项目
  // belong: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // 合约类型
  // contract_Type: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // 字节码
  bytecode: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  // abi
  abi: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'contractBytecode',
  tableName: 'contract_bytecode',
  timestamps: false
})
module.exports = ContractBytecode