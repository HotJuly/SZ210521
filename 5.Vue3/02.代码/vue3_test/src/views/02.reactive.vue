<template>
  <div class="home">
    <h1>{{user2.name}}</h1>
    <h1>{{user2.age}}</h1>
    <ul>
      <li v-for="car in user2.cars" :key="car">{{car}}</li>
    </ul>
    <button @click="addCar">有钱了,买辆车</button>
    <button @click="handleClick">过了一年,大了一岁</button>
  </div>
</template>

<script>
import {reactive} from 'vue';
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
    /*
      在reactive过程中,存在两个角色
        第一个是被代理对象(元数据对象,操作他,但是没有响应式效果)
        第二个是代理对象(操作他,才能有响应式效果)
    
    */
    let user = {
      name:"xiaoming",
      age:18,
      cars:[
        "玛莎拉蒂",
        "五菱宏光"
      ]
    }

    let user2 = reactive(user)
    // console.log(user,user2)

    let handleClick = ()=>{
      user2.age +=1;
      // console.log('age',user2.age)
    }

    let addCar =()=>{
      // user2.cars.push("宝马")
      user2.cars[1]="劳斯莱斯";
    }

    return {
      user,
      user2,
      handleClick,
      addCar
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
