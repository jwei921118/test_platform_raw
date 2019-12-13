// 添加配置
// const path = require('path');
// const target = 'http://parking.innochain.tech';
const target = 'http://127.0.0.1:7001';

const port = '8080'

module.exports = {
  assetsDir: 'assets',
  productionSourceMap: false,
  filenameHashing: false,
  devServer: {
    open: true,
    port,
    proxy: {
      '/contract': {
        target: target,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/styles/variables.scss";`
      }
    }
  }
}