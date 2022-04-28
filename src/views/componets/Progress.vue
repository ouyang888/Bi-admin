<template>
  <div class="container">
    <div class="background"></div>
    <div :style="{width: `${rate>=100?100:rate}%`,backgroundColor: color}" class="bar"></div>
  </div>
</template>

<script>
import {reactive,ref, defineComponent} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Progress',
  props: {
    color: {
      type: String,
    },
    rate: {
      type: Number,
      default: 0
    },
  },
  setup(){
    const Store = useStore()
    let state = reactive({

    })
    
  return { //必须返回 模板中才能使用
  }
 }
})
</script>

<style scoped>
.container {
  height: 5px;
  width: 100%;
  position: relative;
}
.background {
  height: 5px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 100px;
  opacity: 0.16;
  background: #FFFFFF;
  border-radius: 3px;
}
.bar {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 100px;
  /* background-color: #FF8B2F; */
  z-index: 999;

}

</style>