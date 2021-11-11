<template>
  <div id="app">
    <!-- <HelloWorld ref="Hello123" class="A" v-model="phone" msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld :value="phone" @input="(data)=>phone=data" msg="Welcome to Your Vue.js App"/> -->
    <!-- <input type="text" v-model="phone"> -->
    <!-- <input type="text" :value="phone" @input="event=>phone=event.target.value"> -->

    <HelloWorld :phone.sync="phone" msg="Welcome to Your Vue.js App">
      <template>
        <h3>我是默认插槽</h3>
      </template>
      <template v-slot:header>
        <h3>我是header插槽</h3>
      </template>
      <template v-slot:footer="{msg}">
        <h3>我是footer插槽,{{msg}}</h3>
      </template>
    </HelloWorld>
    <!-- <HelloWorld :phone="phone" @update:phone="(data)=>phone=data" msg="Welcome to Your Vue.js App"/> -->
    <h1 ref="phone123">
      {{phone}}
    </h1>
    <!-- <h2 v-once>
      name:{{form.name}}
    </h2> -->

    <!-- <component :is="mycomponent"></component> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'

export default {
  name: 'App',
  data(){
    return{
      phone:"177777777",
      form:{
        name:"xiaoming"
      },
      mycomponent:A
    }
  },
  components: {
    HelloWorld,
    // A
  },
  mounted(){
    // console.log(this.$data.phone)
    // this.phone=123

    // console.log(this.$children)
    // this.$children[0].phone =123;
    // console.log(this.$refs.Hello123)
    // this.form = {};
    setTimeout(()=>{
      // this.form.name=777;
      // this.$forceUpdate();
      console.log(111)
      // this.$destroy();
      this.form.name=777;
      console.log(222)
    },1000)
  },
  watch:{
    phone:{
      immediate:true,
      deep:true,
      handler(){
      
      }
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
