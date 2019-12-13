//  项目 合伙人
module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;

    const ProPartner = app.model.define('proPartner', {
        // 账户名称
        accountName: {
            type: STRING,
        },
        // 账户地址
        identity: {
            type: STRING
        },
        // sdr 数量
        balanceof: {
            type: INTEGER
        },
        createdAt: DATE,
        updatedAt: DATE,
    }, {
        freezeTableName: true,
        tableName: 'pro_partner',
        timestamps: false,
    });
    ProPartner.associate = function () {
        app.model.ProPartner.belongsTo(app.model.SdrCnt, {
            foreignKey: 'project_id'
        })
    }
    return ProPartner;
}