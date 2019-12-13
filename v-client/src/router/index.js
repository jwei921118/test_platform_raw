import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "home",
  component: Home,
  children: [{
      path: '/cnt',
      name: '合约',
      redirect: '/cnt/bytecode',
      component: () => import('../views/contract/index.vue'),
      children: [{
        path: '/cnt/bytecode',
        name: '合约字节码',
        component: () => import('../views/contract/ctnBytecode.vue')
      }, {
        path: '/cnt/deployCnt',
        name: '已部署合约',
        component: () => import('../views/contract/deployCnt.vue')
      }, {
        path: '/cnt/pisa',
        name: 'pisa合约项目',
        component: () => import('../views/contract/pisa.vue')
      }, {
        path: '/cnt/parking',
        name: '停车场项目',
        component: () => import('../views/contract/parking.vue')
      }, {
        path: '/cnt/user',
        name: '用户管理',
        component: () => import('../views/contract/userList.vue')
      }]
    }, {
      path: '/clearance',
      name: '清分服务',
      component: () => import('../views/clearance/index.vue')
    },
    {
      path: '/config',
      name: '配置',
      component: () => import('../views/config/index.vue')
    }, {
      path: '/',
      redirect: '/cnt'
    }
  ]
}];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;