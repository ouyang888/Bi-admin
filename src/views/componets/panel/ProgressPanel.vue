<template>
  <div class="main">
    <div class="backgroundPic">
      <div class="content">
        <CircleProgress style="position:absolute" :rate="data?.bar1" :size="130" :circleSize="130" :color="'#5AFFA3'" />
        <CircleProgress style="position:absolute" :rate="data?.bar2" :size="155" :circleSize="155" :color="'#7A5AFF'"/>
        <div class="big-round">
          <div class="round">
            <p class="round-title">{{data?.ballTitle}}</p>
            <p class="sort">{{(data?.ballNum)}}%</p> 
          </div>
        </div>
        <div class="title">{{data?.bigBallTitle}}</div>
      </div>
    </div>
    <div class="bottom">
      <span :style="{background:'#5AFFA4'}" class="bottom-color"></span>
      <span class="bottom-title">{{data?.textLeft}}</span>
      <span :style="{background:'#7A5AFF'}" class="bottom-color"></span>
      <span class="bottom-title">{{data?.textRight}}</span>
      <div class="bottom-text">
        <!-- <span>{{data?.titleTop}}</span> -->
        <span>{{data?.textLeft}}：</span>
        <span>毛利率{{data?.topGPM}}%</span>
      </div>
      <div class="bottom-text">
        <!-- <span>{{data?.titleBottom}}</span> -->
         <span>{{data?.textRight}}：</span>

        <span>毛利率{{data?.bottomGPM}}%</span>
      </div>

    </div>

  </div>
  
</template>
<script>
import {reactive,ref, defineComponent ,onMounted, watch , defineProps} from 'vue'
import CircleProgress from '@/components/CircleProgress.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'ProgressPanel',
  components:{
    CircleProgress
  },
  props:{
    data: {
      type: Object
    }
  },
  setup(props){
    console.log(props.data,'ss!!!!!!!!!!!!!!!!');
    const Store = useStore()
    watch(
      ()=>props.data,
      (newVal,old)=>{
    })
    onMounted(() => {
    })
 
    return { //必须返回 模板中才能使用
    }
 }
})
</script>

<style lang="stylus" scoped>
.main{
  height: 230px;
}
.backgroundPic{
  height: 200px;
  width: 192px;
  background-image: url('@/assets/backgroundPanel.svg');
  background-repeat:no-repeat;
  background-position: 50% 62%;
  display: flex;
  align-items:center;
  justify-content:center;
}
.content {
  width: 192px;
  height: 192px;
  top:7%;
  position: absolute;
  display: flex;
  align-items:center;
  justify-content:center;
}
.big-round {
  width: 105px;
  height: 105px;
  border-radius: 50%;
  box-shadow: inset 0px 0px 20px 0px rgba(102, 255, 255, 0.52);
  display: flex;
  align-items:center;
  justify-content:center;
}
.round {
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
  border-radius: 50%;
  background: #0C098B;
  box-shadow: inset 0px 0px 20px 0px rgba(102, 255, 255, 0.52);
  border: 1px solid rgba(50, 197, 255, 0.22);
}
.round-title{
  font-size: 12px;
  color: #32C5FF;
  letter-spacing: -0.01px;
  text-align: center;
  font-weight: 500;
}
.sort {
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: -0.01px;
  text-align: center;
  font-weight: 600;
}
.title {
  position: absolute;
  bottom: 20px;
  opacity: 0.8;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 17px;
  font-weight: 400;
}
.bottom{
  text-align: center;
  margin-top:18px;
}
.bottom-color {
  width: 8px;
  height: 8px;
  margin-left: 5px;
  display:inline-block;
}
.bottom-title {
  opacity: 0.8;
  padding-left: 5px;
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 17px;
  font-weight: 400;
}
.bottom-text {
  margin-top: 8px;
  opacity: 0.7;
  font-size: 10px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 10px;
  font-weight: 400;
}
.bottom-text span{
  margin-left: 5px;
}
</style>