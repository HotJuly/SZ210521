<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/home">toHome</router-link>
    <router-link to="/about">toAbout</router-link>
    <button @click="toHome">编程式跳转Home</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    toHome() {
      console.log('toHome')
      // this.$router
      console.log(this.$router,this.$route)
    },
  },
};
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
