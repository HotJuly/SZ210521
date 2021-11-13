import Vue from 'vue';
// import VueRouter from 'vue-router';
import MyRouter from '../july-router';
import Home from '../components/Home';
import About from '../components/About';

Vue.use(MyRouter);

export default new MyRouter({
    // mode: "hash",
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