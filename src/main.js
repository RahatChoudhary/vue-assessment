import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routers';
import vuetify from './plugins/vuetify';
import InfiniteScroll from './plugins/InfiniteScroll';
import App from './App.vue';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
Vue.use(VueRouter);
export const bus = new Vue();

export default new Vue({
	router,
	vuetify,
	InfiniteScroll,
	store,
	render: h => h(App)
}).$mount('#app');