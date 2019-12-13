// sdr 合约列表
module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE,
        TEXT
    } = app.Sequelize;

    const SdrCnt = app.model.define('sdrCnt', {
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
        createdAt: DATE,
        updatedAt: DATE
    }, {
        freezeTableName: true,
        tableName: 'sdr_contract',
        timestamps: false
    });

    return SdrCnt;
}