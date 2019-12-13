// 用户列表

const sequelize = require('../config');

const Sequelize = require('sequelize');

const {
  INTEGER,
  STRING,
  DATE
} = Sequelize;
const Model = Sequelize.Model;

class User extends Model {};
User.init({
  // 账户名称
  account_name: {
    type: STRING,
  },
  // 账户地址
  identity: {
    type: STRING
  },
  // 私钥
  private_key: {
    type: STRING
  },
  // 公钥
  public_key: {
    type: STRING
  },
  // 金额
  balanceof: {
    type: INTEGER
  },
  created_at: DATE,
  updated_at: DATE,
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user_lists',
  timestamps: false
});

module.exports = User;