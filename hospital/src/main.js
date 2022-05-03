import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import '@/assets/css/global.css'
import axios from 'axios';


Vue.config.productionTip = false
// 设置请求拦截器 
// axios.interceptors.request.use(config =>{
//   //添加token令牌
//   config.headers.Authorization = window.sessionStorage.getItem('token');
//   return config;
// })
Vue.prototype.$http = axios;

//默认请求根路径
axios.defaults.baseURL = "http://localhost:8999";
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
