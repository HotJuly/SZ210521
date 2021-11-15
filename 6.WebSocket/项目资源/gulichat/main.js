import Vue from 'vue'
import App from './App'

import * as API from './api';
import store from './store';

Vue.prototype.$API = API;
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
