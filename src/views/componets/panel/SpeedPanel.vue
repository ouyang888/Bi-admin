<template>
  <div class="panel-content">
    <CircleProgress 
      style="position:absolute" 
      :rate="data.bar" 
      :size="255" 
      :circleSize="255"
      :color="'#FFA500'" 
      :deg="{start: 135,end:45}" />
    <CircleProgress 
      style="position:absolute" 
      :rate="data.speedBar" 
      :size="215"  
      :circleSize="215"
      :barSize="30"
      :isBackground="false"
      :color="'rgb(0,224,219,0.4)'" 
      :deg="{start: 132,end:48}" />
    <div class="backgroundPic">
        <!-- <CircleProgress style="position:absolute" :rate="40" :size="155" /> -->
          <div class="round">
            <p class="round-title">{{data?.ballTitle}}</p>
            <p class="sort">{{data?.ballNum}}亿</p> 
            <div class="round-data">
              <span class="round-content">
                <p>{{data?.ballLeftTitle}}</p>
                <p>{{data?.ballLeftNum}}亿</p>
              </span>
              <span class="round-content">
                <p>{{data?.ballRightTitle}}</p>
                <p>{{data?.ballRightNum}}亿</p>
              </span>
            </div>
          </div>
          <div class="content">责任制{{data?.bottomNum}}亿</div>
    </div>
    <div class="bottom">
      <p>
        <span>{{data?.bottomTitle1}}：</span><span>完成率:{{data?.bottomClose}}%</span>，<span>时间进度:{{data?.bottomTime}}%</span>
      </p>
      <p>
        <span>{{data?.bottomTitle2}}：</span><span>完成率:{{data?.bottomClose1}}%</span>，<span>时间进度:{{data?.bottomTime1}}%</span>
      </p>

    </div>
  </div>

</template>
<script>
import {reactive,ref, defineComponent ,onMounted} from 'vue'
import CircleProgress from '@/components/CircleProgress.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'ProgressPanel',
  props: {
    data:{
      type: Object
    }
  },
  components:{
    CircleProgress
  },
  setup(props){
    console.log(props.data, 'speed!!!!!!!!!!!!!!!!!!');
    const Store = useStore()
    let state = reactive({
    })
    onMounted(() => {

    })
 
    return { //必须返回 模板中才能使用
    }
 }
})
</script>

<style lang="stylus" scoped>
.panel-content {
  // height: 280px;
  // width: 280px;
  position relative;
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
}
.backgroundPic{
  height: 256px;
  width: 250px;
  background-image: url('@/assets/speedPanel.svg');
  background-repeat:no-repeat;
  background-position: 50% 153%;
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
}
.content {
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: -0.01px;
  text-align: center;
  font-weight: 500;
}
.bottom {
  position: absolute;
  bottom: -20px;
  color: #fff;
}
.bottom p{
  margin-bottom: 6px;
}
.bottom span {
  opacity: 0.7;
  font-size: 10px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 10px;
  font-weight: 400;
}
.round {
  width: 110px;
  height: 160px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
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
  margin-top: 5px;
  color: #FFFFFF;
  letter-spacing: -0.01px;
  text-align: center;
  font-weight: 600;
}
.round-data{
  width: 75px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.round-content {
  // height: 21px;
  opacity: 0.7;
  font-size: 10px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 10px;
  font-weight: 400;
}
.round-content p {
  margin-top: 5px;
}
</style>