<template>
  <div class="home">
    <!-- <h1>{{user2.name}}</h1>
    <h1>{{user2.age}}</h1> -->
    <h1>{{name}}</h1>
    <h1>{{age}}</h1>
    <button @click="handleClick">过了一年,大了一岁</button>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue';
export default {
  name: 'Home',
  setup(){
    let user = {
      name:"xiaoming",
      age:18
    }

    /*
      toRefs
      将当前的代理对象中,所有的属性值都用ref包裹起来,变成ref对象,所以才能解构展示
    
    
    */
    let user2 = reactive(user)

    // console.log('toRefs',toRefs(user2))

    let handleClick = ()=>{
      user2.age +=1;
    }

    return {
      // name:"xiaoming",
      // age:18,
      ...toRefs(user2),
      handleClick,
    }
  },
}
</script>
