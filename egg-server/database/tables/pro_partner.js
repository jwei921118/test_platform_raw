// 项目合伙人
// 用户列表

const sequelize = require('../config');

const Sequelize = require('sequelize');

const {
    INTEGER,
    STRING,
    DATE
} = Sequelize;

const Model = Sequelize.Model;


class proPartner extends Model {};
proPartner.init({
    // 账户名称
    account_name: {
        type: STRING,
    },
    // 账户地址
    identity: {
        type: STRING
    },
    // sdr数量
    balanceof: {
        type: INTEGER
    },
    created_at: DATE,
    updated_at: DATE
}, {
    sequelize,
    modelName: 'proPartner',
    tableName: 'pro_partner',
    timestamps: false
});

module.exports = proPartner;