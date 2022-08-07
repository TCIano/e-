import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "lib-flexible";
import ElementUI from "element-ui";
import { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css
//引入svgcss
import "./icons/font_3563586_fcunm76c9dl/iconfont";
import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// 引入自定义指令
import * as directives from "./directives";
//图片加载失败的自定义指令
for (const key in directives) {
  Vue.directive(key, directives[key]);
}
// set ElementUI lang to EN
Vue.prototype.$message = Message;
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
