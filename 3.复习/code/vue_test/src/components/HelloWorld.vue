<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input ref="input123" v-if="isEdit" type="text">
    <button v-else @click="changeShow">添加</button>
    <h2>name:{{obj.name}}</h2>
    <h2>age:{{obj.age}}</h2>
    <h2>age1:{{doubleAge}}</h2>
    <h2>age2:{{doubleAge}}</h2>
    <h2>age3:{{doubleAge}}</h2>
    <h2>age4:{{doubleAge}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: {
  //     validator(){
  //       return true
  //     }
  //   }
  // },
  props:["msg"],
  data(){
    return{
      isEdit:false,
      obj:{
        name:"xiaoming",
        age:23
      },
      
      // _a:1
    }
  },
  methods:{
    changeShow(){
      /*
        Vue更新机制
          属性值更新是同步更新,页面更新(更新DOM)是异步更新
          nextTick使用方法,必须在对应响应式数据更新之后立马调用nextTick,才能监视到对应变化
          nextTick底层实现原理是.then
      */
      // this.isEdit = true;
      // console.log(this.isEdit);
      // // debugger
      // this.$nextTick(()=>{
      //   this.$refs.input123.focus();
      // });

      // console.log(1)

      // this.$nextTick(()=>{
      //   console.log('nextTick1')
      // });

      // this.isEdit = true;
      // // ???仿佛这里有一个看不见的nextTick

      // Promise.resolve().then(()=>{
      //   console.log('Promise1')
      // })

      // this.$nextTick(()=>{
      //   console.log('nextTick2')
      // });

      // Promise.resolve().then(()=>{
      //   console.log('Promise2')
      // })
      // this.obj.age=24;
      console.log(1)
      // delete this.obj.age;
      this.$delete(this.obj,'age')
      console.log(2,this.obj)
    }
  },
  a:3,
  filters:{
    timerFilter2(val){
      console.log(this)
      return val+=this.isEdit
    }
  },
  watch:{
    a1(){
      console.log('watch')
    }
  },
  computed:{
    a2(){
      console.log('computed',this.a1)
      return this.a1+1
    },
    doubleAge(){
      console.log('doubleAge')
      return this.obj.age*2;
    }
  },
  mounted(){
    this.a1=123
    console.log('mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
