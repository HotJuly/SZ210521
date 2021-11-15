<template>
  <div class="home">
    <input v-if="isEdit" ref="input123" type="text">
    <button v-else @click="showInput">添加</button>
  </div>
</template>

<script>
import {onMounted, ref ,nextTick} from 'vue';
export default {
  name: 'Home',
  setup(){
    let isEdit = ref(false);
    let input123 = ref(null);


    let showInput = ()=>{
      isEdit.value=true;

      nextTick(()=>{
        input123.value.focus();
      })
    }

    // onMounted(()=>{
    //   console.log(input123.value)
    // })

    return {
      isEdit,
      input123,
      showInput
    }
  },
  // mounted(){
  //   console.log(this.$refs.input123)
  // }
}
</script>
