import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// Vue.use(VueRouter)
// Vue.use(VueX)

// new Vue({
//     router,
//     store,
//     render
// }).$mount("#app")