import { onMounted,ref } from "vue";
export default function(){
    let pageX = ref(0);
    let pageY = ref(0);


    onMounted(()=>{
      document.addEventListener('mousemove',(event)=>{
        // console.log(event)
        const clientX = event.clientX;
        const clientY = event.clientY;

        pageX.value=clientX;
        pageY.value=clientY;
      })
    })

    return {
        pageX,
        pageY
    }
}