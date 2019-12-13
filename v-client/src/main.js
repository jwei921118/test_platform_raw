import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

import ElementUI from 'element-ui';

import services from '@/service/index'; // 所有请求的合集
import tools from '@/utils/tools'; // 所有工具的合集
import event from '@/service/event';
Vue.prototype._services = services;
Vue.prototype.tools = tools;
Vue.prototype._event = event;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')