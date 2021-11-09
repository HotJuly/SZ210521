
/*
    如果执行主线程代码不超过1ms,很有可能导致setImmediate的回调函数先执行
    node事件轮询,如果6个阶段都执行了一遍,那么会从第一个阶段继续轮询
    node事件轮询的起始点:第一阶段timers
    node事件轮询停止之后,第二次起点是在第四阶段poll

    node中具有6个宏任务队列


    node中有两种微任务,一种then,一种nextTick
    then是VIP,nextTick是SVIP

    node中具有2个微任务队列

*/
// for(var i =0;i<700000;i++){

// }

const fs = require('fs');


// setTimeout(()=>{
//     console.log('setTimeout1')
// },0)

// setTimeout(()=>{
//     console.log('setTimeout1')
// },500)


// fs.readFile('./js基础/01.原型与原型链.html',function(){
//     console.log('readFile success')
//     setTimeout(()=>{
//         console.log('setTimeout1')
//     },0)

//     setImmediate(()=>{
//         console.log('setImmediate1')
//     })
// })

// setImmediate(()=>{
//     console.log('setImmediate1')
// })




// setTimeout(()=>{
//     console.log('setTimeout1')
// },0)

Promise.resolve().then(()=>{
    console.log('then1')
    
    process.nextTick(()=>{
        console.log('nextTick')
    })

    Promise.resolve().then(()=>{
        console.log('then2')
    })
})



