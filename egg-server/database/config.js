const Sequelize = require('sequelize');

const sqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Gzcd2015',
    port: 3306,
    database: 'contract'
};

let sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 1000
    }
});

module.exports = sequelize;