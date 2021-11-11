<template>
  <div id="app">
    <A></A>
    <HelloWorld ref="Hello123" class="A" v-model="phone" msg="Welcome to Your Vue.js App"/>
    <!-- <HelloWorld :value="phone" @input="(data)=>phone=data" msg="Welcome to Your Vue.js App"/> -->
    <!-- <input type="text" v-model="phone"> -->
    <!-- <input type="text" :value="phone" @input="event=>phone=event.target.value"> -->
    <h1 ref="phone123">
      {{phone}}
    </h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'

export default {
  name: 'App',
  data(){
    return{
      phone:"177777777"
    }
  },
  components: {
    HelloWorld,
    A
  },
  mounted(){
    // console.log(this.$data.phone)
    // this.phone=123

    // console.log(this.$children)
    // this.$children[0].phone =123;
    console.log(this.$refs.Hello123)
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
