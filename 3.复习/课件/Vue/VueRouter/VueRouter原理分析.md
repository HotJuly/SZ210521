# VueRouter原理分析

1. VueRouter的了解
   1. 他是一个Vue的插件库(Vue.use)
   2. 它可以实现SPA(单页面应用)
      1. 单页面应用:整个项目最终只有一个html文件,页面产生的变化都是通过原生DOM的增删改查实现的
   3. 用处:当浏览器地址栏中的路由地址与VueRouter中的path相匹配,会显示出对应的路由组件
2. VueRouter提供给我们的内容
   1. 构造函数
      1. VueRouter可以创建路由器对象
   2. 组件
      1. router-view组件
         1. 该组件用于显示当前所需要展示的路由组件(它相当于是一个占位符号)
      2. router-link组件
         1. 该组件用于生成标签显示在页面上,如果用户点击该标签,会跳转到to所写的路径
         2. **默认生成a标签,VueRouter禁用了a标签的默认行为,其实他的路由跳转是通过编程式导航实现的**
   3. 核心对象
      1. $router
         1. 该对象主要用于提供操作路由地址的方法
            1. push	->跳转到某个指定路由,该方法会保留之前的历史记录
            2. replace    ->跳转到某个指定路由,该方法不会保留上一个历史记录
            3. go
            4. back
      2. $route
         1. 该对象主要用于提供与当前路由相关的信息
            1. path->当前路由路径
            2. query->用于接收通过路由地址传递的query参数(/home?key=value&key1=value1)
            3. params->用于接收通过路由地址传递的params参数(/home/数据)
               1. 注意:需要在配置路由的时候,提前声明占位符
            4. meta->用于接收通过路由配置传递的meta参数
3. 我们需要提供给VueRouter的内容
   1. 配置对象:
      1. mode属性
         1. 用于控制VueRouter模式的切换
         2. hash模式
            1. 优点:
               1. 兼容性较好,兼容IE6
            2. 缺点:
               1. 会导致锚点功能无法使用
               2. 路由太丑了
            3. 原理:
               1. 通过window.location.hash="路由地址"可以控制浏览器的历史记录栈变化,同时**不会导致页面重新请求**
               2. 可以通过给window绑定事件,事件名hashchange,可以监视浏览器hash值的变化
         3. history模式
            1. 优点:
               1. 路径好看,颜值就是正义
            2. 缺点:
               1. 兼容性较差,兼容IE10(因为history模式需要用到H5新特性history对象)
               2. **面试题:请问history模式是否需要做特殊配置?**
                  1. 问题:
                     1. 如果后端只配置了当用户请求/路径时候,自动返回index.html文件,那么用户如果请求/home等前端路由,会被自动视为后端路由,请求服务器,后端没有该接口,就会返回404
                  2. 解决流程:
                     1. 用户浏览器刷新"http://localhost:8080/home"地址,浏览器会直接将改地址发送给服务器,进行请求
                     2. 服务器接收到的地址是"/home"
                     3. **此时服务器需要对此做特殊配置**
                        1. **将后端自身没有声明的接口,默认统一返回index.html文件即可**
                     4. 此时用户请求/home路径,获得了index.html文件
                     5. 前端接收到网页,开始解析,此时VueRouter发挥作用
                     6. VueRouter会将当前浏览器地址栏中的路径,当前前端路由进行解析
                     7. 最终根据解析结果跳转显示对应路由组件
            3. 原理:
               1. 通过window.history.pushState({},"",路由路径)可以控制浏览器的历史记录栈变化,同时**不会导致页面重新请求**
               2. 可以通过给window绑定事件,事件名popstate,可以监视浏览器history值的变化(注意:他只能监视前进后退按钮)
      2. routes属性
         1. 用于存放当前项目所有的路由对象
         2. 数据类型:routeObj[]
         3. routeObj对象重要属性:
            1. path属性
               1. 当前路由的路由地址
            2. component属性
               1. 路由路径匹配情况下,需要显示的组件信息

