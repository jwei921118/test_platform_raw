// 商户合伙人
module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;

    const MerchantPartner = app.model.define('merchantPartner', {
        // 账户名称
        accountName: {
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
        // merchantId: {
        //     type: INTEGER
        // },
        createdAt: DATE,
        updatedAt: DATE,
    }, {
        freezeTableName: true,
        tableName: 'merchant_partner',
        timestamps: false,
    });
    MerchantPartner.associate = function () {
        app.model.MerchantPartner.belongsTo(app.model.PisaCnt, {
            foreignKey: 'merchantId'
        })
    }
    return MerchantPartner;
}