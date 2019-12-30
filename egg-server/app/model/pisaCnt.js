// pisa 合约
module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE,
        TEXT
    } = app.Sequelize;

    const PisaCnt = app.model.define('pisaCnt', {
        contractName: {
            type: STRING,
            allowNull: false
        },
        belong: {
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
        // 合约abi
        abi: {
            type: TEXT,
            allowNull: false
        },
        // 部署人
        deployer: {
            type: STRING,
            allowNull: false
        },
        // 合约发行总额
        totalSupply: {
            type: INTEGER
        },
        costRatio: {
            type: INTEGER
        },
        createdAt: DATE,
        updatedAt: DATE
    }, {
        freezeTableName: true,
        tableName: 'pisa_contract',
        timestamps: false,
    });

    PisaCnt.associate = function () {
        app.model.PisaCnt.hasMany(app.model.MerchantPartner, {
            foreignKey: 'merchantId',
            targetKey: 'id'
        })
        app.model.PisaCnt.belongsTo(app.model.SdrCnt, {
            foreignKey: 'pisaId',
            targetKey: 'id'
        })
    }

    return PisaCnt;
}