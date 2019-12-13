// 用户列表

const sequelize = require('../config');

const Sequelize = require('sequelize');

const {
    INTEGER,
    STRING,
    DATE
} = Sequelize;

const Model = Sequelize.Model;


class merchantPartner extends Model {};
merchantPartner.init({
    // 账户名称
    account_name: {
        type: STRING,
    },
    // 账户地址
    identity: {
        type: STRING
    },
    // 权益数量
    balanceof: {
        type: INTEGER
    },
    // 所属商户id
    // merchant_id: {
    //     type: INTEGER,
    //     foreignKey: true,
    //     references: {
    //         model: PisaContract,
    //         key: 'id'
    //     }
    // },
    created_at: DATE,
    updated_at: DATE
}, {
    sequelize,
    modelName: 'merchantPartner',
    tableName: 'merchant_partner',
    timestamps: false
});

module.exports = merchantPartner;