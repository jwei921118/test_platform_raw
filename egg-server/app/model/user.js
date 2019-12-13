// 用户模块

module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;

    const User = app.model.define('user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // 账户名称
        accountName: {
            type: STRING,
        },
        // 账户地址
        identity: {
            type: STRING
        },
        // 私钥
        privateKey: {
            type: STRING
        },
        // 公钥
        publicKey: {
            type: STRING
        },
        createdAt: DATE,
        updatedAt: DATE
    }, {
        freezeTableName: true,
        tableName: 'user_lists',
        timestamps: false,
    });

    return User;
}