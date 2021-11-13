<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
    <slot name="footer" :msg="msg"></slot> -->
    <!-- <input type="text" :value="phone" @input="handleChange"> -->
    <ul>
      <li v-for="(item,index) in arr" :key="item">
        <label>5</label>
        <span>5</span>
        <input type="text">
      </li>
    </ul>
    <button @click="addNum">添加</button>
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
      msg1:123,
      // mustance
      arr:[1,2,3,4,5],
      
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
    },
    addNum(){
      this.arr.splice(2,0,6);
    }
  },
  
  // 生命周期钩子函数
  // beforeCreate(){
  //   console.log('---------beforeCreate---------',this,this.msg1,this.$data,this.$el,this.$options)
  // },
  // created(){
  //   console.log('---------created---------',this,this.msg1,this.$data.msg1,this.$el)
  // },
  
  // beforeMount(){
  //   console.log('---------beforeMount---------',this,this.msg1,this.$data.msg1,this.$el)
  // },
  // mounted(){
  //   console.log('---------mounted---------',this,this.msg1,this.$data.msg1,this.$el)
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
