// 清分规则表

const sequelize = require('../config')

const Sequelize = require('sequelize')
const Model = Sequelize.Model

class ClearRules extends Model {}

ClearRules.init({
    contract_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    // 合约名称
    rule_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    detail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    belong: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'clear_rule',
    tableName: 'clear_rule',
    timestamps: false
});

module.exports = ClearRules;