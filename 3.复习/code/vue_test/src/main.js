import Vue from 'vue'
import App from './App.vue'

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

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log('errorHandler',err, vm, info)
}

new Vue({
  render: h => h(App),
}).$mount('#app')
