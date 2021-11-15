<template>
  <div class="home">
    <h1>name:{{user2.name}}</h1>
    <h1>age:{{user2.age}}</h1>
    <button @click="addAge">+1岁</button>
    <button @click="changeName">换老爸</button>
  </div>
</template>

<script>
import {ref,reactive} from 'vue';
export default {
  name: 'Home',
  setup(){
    let user ={
      name:"xiaoming",
      age:18
    }

/*
    如果ref的值是一个对象,那么他会自动将该对象转交给reactive函数处理

    对对象使用reactive函数,Proxy对象只能监视对该对象的属性的操作,无法监视替换对象的操作
    对对象使用ref函数,那么会先生成一个Ref对象,这个对象具有value属性(该属性是响应式的),内部的值是Proxy对象
      也就是说在监视Proxy对象内部属性的操作的同时,还能监视对当前value的地址值的修改
*/
    // let user2 = reactive(user);
    let user2 = ref(user);
    // console.log(user2)

    let addAge = ()=>{
      user2.age+=1;
    }

    

    // let addAge = ()=>{
    //   user2.value.age+=1;
    // }

    let obj = {
      name:"wangxiaoming",
      age:18
    };

    let changeName = ()=>{
      // user2 = obj
      // user2.name = "wangxiaoming"

      
      user2.value = obj
      // user2.value.name = "wangxiaoming"
    }

    return {
      user2,
      addAge,
      changeName
    }
  }
}
</script>
