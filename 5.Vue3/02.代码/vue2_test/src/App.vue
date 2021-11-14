<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{user.name}}</h1>
    <h1>{{user.age}}</h1>
    <h1>{{user.sex}}</h1>
    <ul>
      <li v-for="car in user.cars" :key="car">{{car}}</li>
    </ul>
    <button @click="handleClick">删除年龄</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
  data(){
    return {
      user:{
        name:"xiaoming",
        age:28,
        cars:[
          "玛莎拉蒂",
          "五菱宏光",
        ]
      }
    }
  },
  methods:{
    handleClick(){
      // delete this.user.age
      // this.$delete(this.user,"age")

      // this.user.sex="男"
      // this.$set(this.user,"sex","男")

      /*
        Vue2中不会对数组的下标和length属性进行劫持
        将数组的方法进行重写push,replace,splice,pop
        以上几个方法不是Array的原先的方法,他被经过重写了

        Vue2源码中,如果数据劫持的时候遇到数组,数组的下标不会被劫持,他会直接劫持内部的对象
      */
      // this.user.cars[1]="劳斯莱斯幻影";
      // this.user.cars.splice(1,1,"劳斯莱斯幻影")
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
