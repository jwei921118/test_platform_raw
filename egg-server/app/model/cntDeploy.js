// 用户模块

module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;

    const cntDeploy = app.model.define('cntDeploy', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // 合约名称
        contractName: {
            type: STRING,
            allowNull: false
        },
        // 合约类型
        contractType: {
            type: STRING,
            allowNull: false
        },
        // 合约地址
        identity: {
            type: STRING,
            allowNull: false
        },
        // 交易哈希
        txhash: {
            type: STRING,
            allowNull: false
        },
        createdAt: DATE,
        updatedAt: DATE
    }, {
        freezeTableName: true,
        tableName: 'deploy_contract',
        timestamps: false
    });

    return cntDeploy;
}