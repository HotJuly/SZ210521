function MVVM(options) {
  /*
    options->
    {
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          },
        }
      }
      this->vm实例对象
  */

   //把配置对象保存给vm一份
    this.$options = options;
    //把配置对象的data保存到vm的_data 地址一样
    var data = this._data = this.$options.data;

    // var data = (this._data = this.$options.data);
      // 此处的this._data就是vue2版本中的this.$data


    var me = this; //保存vm给me

    /*
      第一部分:数据代理
        代理:代理商属于中间人,只负责数据的搬运,并不存有真实数据
        目的:主要用处就是为了读取data数据的时候,少写一层_data.,就是为了方便


        注意:
          1.实际上数据代理并不属于响应式原理的一部分
          2.代理次数:data对象具有多少个直系属性,就会代理多少次(数据代理的是属性名,不是属性值)
    */
    Object.keys(data).forEach(function(key) {
      // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
        me._proxy(key);
    });

    // ["msg","person"].forEach(function(key) {
    //   // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
    //     vm._proxy("msg");
    // });

    /*
      需求:当一个属性的属性值发生变化时,更新页面视图
      拆解:
        1.如何监视属性值的变化
          可以通过访问描述符实现该功能,当开发者修改属性值,会触发访问描述符的set方法
        2.如何更新页面视图
          将最新的属性值通过原生DOM操作渲染到页面上

      第二部分:数据劫持
        目的:为了监视用户对data对象中所有属性的属性值的修改动作,如果修改为新值,就会触发视图更新

        注意:
          1.如果更新的值与旧值相同,不会触发视图更新
          2.如果更新的是响应式属性,那么会对属性值进行深度数据劫持
              响应式属性就是指被数据劫持过的属性
          3.劫持次数:data对象具有多少个属性,就会劫持多少次(数据劫持的是属性名,不是属性值)
    */
    observe(data, this);
    // observe(data, vm);

    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
    //     vm._proxy("msg");
        var me = this;

        Object.defineProperty(me, key, {
            configurable: false, //不能重复定义
            enumerable: true, //可以遍历
            get: function proxyGetter() {
              //当访问vm身上的属性值的时候，会去返回data的同名属性值
                return me._data[key];
            },
            set: function proxySetter(newVal) {
              //当设置vm身上的属性值的时候，会去设置data的同名属性值
                me._data[key] = newVal;
            }
        });

        //属性描述符和访问描述符,
        // obj.name=123 ->属性描述符  也就是说该属性具有value值
        // 访问描述符不具备value值,它具有get/set方法
      //   Object.defineProperty(vm, "msg", {
      //     configurable: false, //不能重复定义
      //     enumerable: true, //可以遍历
      //     get: function proxyGetter() {
      //       //当访问vm身上的属性值的时候，会去返回data的同名属性值
      //         return vm.$data["msg"];
      //     },
      //     set: function proxySetter(newVal) {
      //       //当设置vm身上的属性值的时候，会去设置data的同名属性值
      //         vm._data["msg"] = newVal;
      //     }
      // });

    }
};