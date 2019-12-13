'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 插件
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  // 验证
  validate: {
    enable: true,
    package: 'egg-validate'
  }
};