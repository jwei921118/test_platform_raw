const sequelize = require('../config')

const Sequelize = require('sequelize');

const {
    STRING,
    INTEGER,
    UUID
} = Sequelize;

const Model = Sequelize.Model;

class Group extends Model {};

Group.init({
    name: {
        type: STRING
    },
    player_id: {
        type: UUID
    },
    student_id: {
        type: UUID
    },
    balanceof: {
        type: INTEGER
    }
}, {
    sequelize,
    modelName: 'group',
    tableName: 'group'
});

class Player extends Model {};

Player.init({
    name: {
        type: STRING
    },
    balanceof: {
        type: INTEGER
    },
    // group_id: {
    //     type: INTEGER
    // }
}, {
    sequelize,
    modelName: 'player',
    tableName: 'player'
});

class Student extends Model {};
Student.init({
    name: {
        type: STRING
    },
    grander: {
        type: INTEGER
    }
}, {
    sequelize,
    modelName: 'student',
    tableName: 'student'
})


// Group.sync();
// Player.sync();

Player.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.hasMany(Player, {
    foreignKey: 'group_id'
});
// Group.hasMany(Player, {
//     targetKey: 'player_id'
// })

// Student.belongsTo(Group, {
//     foreignKey: 'group_id',
//     targetKey: 'student_id'
// });

Group.sync();
Player.sync();

// Group.drop();
// Player.drop();
// Student.sync();