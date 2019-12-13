const sequelize = require('../config');

const Sequelize = require('sequelize');

const Model = Sequelize.Model

const {
    STRING,
    DATE
} = Sequelize;

class confirmContract extends Model {}

confirmContract.init({
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
    // 合约abi
    abi: {
        type: STRING,
        allowNull: false
    },
    // 部署人
    deployer: {
        type: STRING,
        allowNull: false
    },
    created_at: DATE,
    updated_at: DATE,
}, {
    sequelize,
    modelName: 'confirmContract',
    tableName: 'confirm_contract',
    timestamps: false
});
module.exports = confirmContract;