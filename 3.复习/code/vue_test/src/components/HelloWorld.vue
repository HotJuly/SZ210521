<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot name="footer" :msg="msg"></slot>
    <!-- <input type="text" :value="phone" @input="handleChange"> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props:["msg","value","phone"],
  // model: {
  //   prop: 'phone',
  //   event: 'inputahsdghjasd'
  // },
  data(){
    return{
      msg1:123
    }
  },
  methods:{
    handleChange(event){
      // console.log(event.target.value)
      // this.value=event.target.value;
      // this.$emit('inputahsdghjasd',event.target.value)

      // console.log(this.$parent)
      // this.$parent.phone = event.target.value

      this.$emit('update:phone',event.target.value)
    }
  },
  
  // 生命周期钩子函数
  beforeCreate(){
    console.log('---------beforeCreate---------',this,this.msg1,this.$data,this.$el,this.$options)
  },
  created(){
    console.log('---------created---------',this,this.msg1,this.$data.msg1,this.$el)
  },
  
  beforeMount(){
    console.log('---------beforeMount---------',this,this.msg1,this.$data.msg1,this.$el)
  },
  mounted(){
    console.log('---------mounted---------',this,this.msg1,this.$data.msg1,this.$el)
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
