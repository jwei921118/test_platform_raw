// 商户合伙人
module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;

    const clearRule = app.model.define('clearRule', {
        // 合约id
        contractId: {
            type: INTEGER,
            primaryKey: true,
        },
        ruleName: {
            type: STRING,
        },
        // 分成规则
        detail: {
            type: STRING
        },
        // 所属用户id
        belong: {
            type: INTEGER
        },
        createdAt: DATE,
        updatedAt: DATE,
    }, {
        freezeTableName: true,
        tableName: 'clear_rule',
        timestamps: false,
    });
    return clearRule;
}