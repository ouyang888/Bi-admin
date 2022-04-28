<template>
  <div class="wrapper">
    <!-- <SadmeterPanel class="panel" />
    <DataCard /> -->
      <div class="content">
        S
      </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
// import DataCard from './componets/DataCard.vue'
import SadmeterPanel from './componets/panel/SadmeterPanel.vue'
export default {
  name: 'Index',
  components: {
    SadmeterPanel,
    // DataCard
  },
  setup() {
    onMounted(() => {
     
    })
    onUnmounted(() => {
    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 100%;
    width: 1920px;
    background-color: #02004D;
  }
.shape-left {
    float: left;
    width: 32px; 
    height: 250px;
    shape-outside: polygon(0 0, 100% 0, 0% 100%);
}
.shape-right {
    float: right;
    width: 100px; height: 250px;
    shape-outside: polygon(100% 0, 100% 100%, 0 100%);
}
.content {
    width: 80px;
    height: 38px;
    display: inline-block;
    position: relative;
    z-index: 0;
    font-size: 20px;
    font-weight: 500;
    color: #19ECFF;
    line-height: 38px;
    text-align: center;
}
.content::before {
    content: '';
    position: absolute;
    transform: skewX(20deg);
    left: 5px; 
    right: 5px;
    top: 0; 
    bottom: 0;
    z-index: -1;
    border: 2px solid #00F9FF;
    background-image: linear-gradient(180deg, #0E5FFF 0%, rgba(28,0,255,0.00) 100%);
    /* transform:skewX(30deg); */
}
</style>