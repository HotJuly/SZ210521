import "@/index";

import jquery from 'jquery';
// import {a1,a2,a3} from './lodash';

console.log('main',jquery)

document.querySelector("#btn").onclick=function(){
    var a = import(/* webpackChunkName:"lodash" */'./lodash.js')
    a.then(({a1})=>{
        // console.log(data)
        console.log(a1(1,2))
    })

    // console.log(a)
}