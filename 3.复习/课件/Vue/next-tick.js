const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
  nextTick源码总结
    1.多个nextTick只会开启一个.then,在该微任务中,会将callbacks数组中所有的回调函数全部执行
      多个nextTick共享一个.then

    DOM更新流程
      1.当响应式数据发生变化时,会触发update方法
      2.update方法中会触发queueWatcher方法
      3.queueWatcher方法中会调用nextTick,并将更新DOM的方法交给nextTick

      此时DOM更新是nextTick队列中的第一人,后续调用的nextTick都会晚于该函数的执行
      所以Vue可以保证nextTick可以获取到最新的DOM节点
*/