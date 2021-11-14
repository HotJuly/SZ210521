<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{num}}</h1>
    <button @click="handleClick">+1</button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: 'Home',
  // data(){
  //   return{
  //     num:1
  //   }
  // },
  // methods:{
  //   handleClick(){
  //     this.num+=1;
  //   }
  // },
  setup(){
    // console.log('-------setup--------')
    // setup生命周期的调用时间比beforeCreate还早

    /*
      setup函数需要返回一个普通,该对象的所有属性可以在template中直接使用
      想要保证一个数据是响应式的,需要使用ref函数处理该数据
        注意:
          在setup中想要修改响应式数据的值,需要通过.value属性进行修改
          在template中想要展示一个响应式数据的值,直接书写属性名即可,不需要.value(Vue3会自动读取.value)
    */

    let num = ref(1);
    const handleClick = ()=>{
      num.value+=1;
      console.log('num',num.value)
    }
    return {
      num,
      handleClick
    }
  },
  // beforeCreate(){
  //   console.log('-------beforeCreate--------')
  // },
  // created(){
  //   console.log('-------created--------')
  // },
  // beforeMount(){
  //   console.log('-------beforeMount--------')
  // },
  // mounted(){
  //   console.log('-------mounted--------')
  // }
}
</script>
