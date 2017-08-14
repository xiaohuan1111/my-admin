// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import Mock from './mock';

Mock.bootstrap();
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
/* eslint-disable no-new */
const router = new VueRouter({
	routes
});

router.beforeEach((to, form, next) => {
	if(to.path == '/login'){
		sessionStorage.removeItem('user');
	};
	let user = JSON.parse(sessionStorage.getItem('user'));
	if(!user && to.path != '/login'){
		next({path: '/login'});
	}else{
		next()
	}
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
