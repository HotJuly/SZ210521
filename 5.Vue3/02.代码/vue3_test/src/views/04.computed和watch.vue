<template>
  <div class="home">
    <h1>{{ count }}</h1>
    <h1>{{ doubleCount }}</h1>
    <h1>{{ threeCount }}</h1>
    <input type="text" v-model="threeCount">
    <button @click="addCount">+1</button>
  </div>
</template>

<script>
import { ref, computed ,watch,watchEffect } from "vue";
export default {
  name: "Home",
  setup() {
    let count = ref(1);

    let doubleCount = computed(() => {
      return count.value * 2;
    });

    let threeCount = computed({
      get() {
        return count.value * 3;
      },
      set(val) {
        // console.log('set')
        count.value=val;
      },
    });

    // watch([count,a,b],(val)=>{
    //   console.log(val)
    // })

    watchEffect(()=>{
      console.log(count.value)
    })

    let addCount = () => {
      count.value += 1;
    };
    return {
      count,
      addCount,
      doubleCount,
      threeCount
    };
  },
  // computed:{
  //   doubleCount(){
  //     return this.count*2
  //   }
  // }
  // watch:{
  //   a(val){
  //     console.log(val)
  //   }
  //   b(val){
  //     console.log(val)
  //   }
  //   count(val){
  //     console.log(val)
  //   }
  // }
};
</script>
