function Compile(el, vm) {
    // "#app", vm对象
    // this->compile对象
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);

        //beforeMount的执行时机
        
        // 这一步在初始化页面,将模版中所有的插值语法都替换为data数据
        this.init();

        //将解析完的结果挂载到页面上去
        // Vue1中,会将编译完的结果插入到app元素内部
        // Vue2中,会将编译完的结果替换掉app元素
        this.$el.appendChild(this.$fragment);

        // mounted的执行时机

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素
        var fragment = document.createDocumentFragment(),
            child;

        // 将app元素中所有的子节点都移动到文档碎片中,如果修改这几个子节点,不会影响到页面渲染
        // 抄家
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el->fragment
        // el->p标签
        // childNodes是一个伪数组,[text节点,p标签,text节点]
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
                // me.compileText(text节点, "msg");
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // [text节点,p标签,text节点].forEach(function(node) {
        //     var text = node.textContent;
        // text=>"{{msg}}"
        //     var reg = /\{\{(.*)\}\}/;

        //     if (me.isElementNode(node)) {
        //         me.compile(node);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(node, RegExp.$1);
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(node);
        //     }
        // });

    },

    compile: function(node) {
        // node->p标签
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        // text节点, "msg"
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, this.$vm, "msg");
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // text节点, this.$vm, "msg"
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, this.$vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // text节点, this.$vm, "msg", 'text'

        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        //每执行一次bind函数,就会创建一个watcher对象
        // 模版中的每一个插值语法都会导致最终创建一个wacther对象

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        // new Watcher(vm, "msg", function(value, oldValue) {
        //     textUpdater && textUpdater(text节点, value, oldValue);
        // });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // vm, "msg"
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // text节点, "hello mvvm"
        node.textContent = typeof value == 'undefined' ? '' : value;
        // text节点.textContent = typeof "hello mvvm" == 'undefined' ? '' : "hello mvvm";
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};