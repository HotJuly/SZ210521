import Vue from 'vue'
import App from './App.vue'

import router from './router';

Vue.config.productionTip = false

/*
  需求:统一修改所有组件的配置对象的某个配置属性
*/

// Vue.config.optionMergeStrategies.a = function (parent, child) {
//   // console.log('optionMergeStrategies',parent, child, vm)
//   return child + 1
// }

// Vue.config.devtools = true;

/*  
  面试题:请问你如何捕获项目中出现的错误?
    try...catch
  面试题二:请问你如何在项目上线之后,捕获用户出现的错误?
    拆解需求:
      1.如何知道用户出现的错误?
        通过Vue.config.errorHandler可以捕获到用户项目中出现的错误
      2.如何获取到这个错误信息?
        通过ajax请求,将报错信息打包发送给公司服务器,公司人员会将报错信息交给你
    
    如果是普通项目,捕获错误的手段window.onerror

*/

// Vue.config.errorHandler = function (err, vm, info) {
//   // handle error
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
//   // 只在 2.2.0+ 可用
//   console.log('errorHandler',err, vm, info)
// }

// Vue.filter("timerFilter",function(val){
//   console.log(this)
//   return val+=this.isEdit
// })

/*
  需求:所有组件挂载结束之后,打印自己的组件名称
    全局混合的生命周期函数,会优先于组件自身的生命周期函数执行,但是两者都会执行
*/
// Vue.mixin({
//   mounted(){
//     console.log('name1',this.$options.name)
//   }
// })

/*
  可以控制页面显示内容的渠道:
    1.template配置对象
    2.在public文件夹的html文件中
    3.在render配置函数中

    面试题:如果同时具有以上三者,渲染优先级如何?
    render>template>index.html文件
*/

new Vue({
  data(){
    return{
      msg:"hello"
    }
  },
  router,
  render: h => h(App),
  template:"<div>{{msg}}</div>",
}).$mount('#app')


// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   data: {
//     msg: 'hello'
//   },
//   render: res.render,
//   staticRenderFns: res.staticRenderFns
// }).$mount('#app')