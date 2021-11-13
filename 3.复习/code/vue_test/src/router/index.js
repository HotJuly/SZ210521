import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import About from '../components/About';

Vue.use(VueRouter);

export default new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/home",
            // path: "/home/:id",
            component: Home,
            // meta:{
            //     showFooter:true
            // }
        },
        {
            path: "/about",
            component: About
        }
    ]
})