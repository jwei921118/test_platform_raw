const sequelize = require('../config');

const Sequelize = require('sequelize');

const Model = Sequelize.Model;

const {
    INTEGER,
    STRING,
    DATE
} = Sequelize;

class pisaContract extends Model {}

pisaContract.init({
    // id: {
    //     type: INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    // 合约名称
    contract_name: {
        type: STRING,
        allowNull: false
    },
    belong: {
        type: STRING,
        allowNull: false
    },
    // 合约类型
    contract_type: {
        type: STRING,
        allowNull: false
    },
    // 合约地址
    identity: {
        type: STRING,
        allowNull: false
    },
    // 部署人
    deployer: {
        type: STRING,
        allowNull: false
    },
    // 合约abi
    abi: {
        type: STRING,
        allowNull: false
    },
    // 合约发行总额
    total_supply: {
        type: INTEGER
    },
    created_at: DATE,
    updated_at: DATE,
}, {
    sequelize,
    modelName: 'pisaContract',
    tableName: 'pisa_contract',
    timestamps: false
});
module.exports = pisaContract;