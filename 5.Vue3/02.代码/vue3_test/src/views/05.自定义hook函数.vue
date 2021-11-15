<template>
  <div class="home">
    <h1>pageX:{{pageX}}</h1>
    <h1>pageY:{{pageY}}</h1>
  </div>
</template>

<script>
// import { onMounted,ref } from "vue";
import useMousePosition from '@/hooks/useMousePosition';
export default {
  name: "Home",
  setup() {
    /*
      需求:当用户鼠标在页面上移动时,将鼠标的x和y轴坐标展示在页面上
      拆解:
        1.当用户鼠标在页面上移动时
          事件名:mousemove
          事件源:document
        2.将鼠标的x和y轴坐标展示在页面上
          响应式
          将x和y定义为响应式数据,并在template中使用
    */
    // onMounted(()=>{
    //   console.log(2)
    // })

    // let pageX = ref(0);
    // let pageY = ref(0);


    // onMounted(()=>{
    //   document.addEventListener('mousemove',(event)=>{
    //     // console.log(event)
    //     const clientX = event.clientX;
    //     const clientY = event.clientY;

    //     pageX.value=clientX;
    //     pageY.value=clientY;
    //   })
    // })

    let {pageX,pageY} = useMousePosition();

    return {
      pageX,
      pageY
    };
  },
  mounted(){
    console.log(1)
  }
};
</script>
