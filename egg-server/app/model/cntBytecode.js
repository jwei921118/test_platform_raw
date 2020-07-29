// 用户模块

module.exports = app => {
    const {
        INTEGER,
        STRING,
        TEXT
    } = app.Sequelize;

    const cntBytecode = app.model.define('cntBytecode', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // 合约描述
        contractDes: {
            type: STRING,
            allowNull: false
        },
        contractType: {
            type: STRING,
            allowNull: false
        },
        // 字节码
        bytecode: {
            type: TEXT,
            allowNull: false
        },
        // abi
        abi: {
            type: TEXT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'contract_bytecode',
        timestamps: false
    });

    return cntBytecode;
}