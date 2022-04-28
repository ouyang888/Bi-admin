<template>
    <div class="backgroundPic">
      <div class="title" @click="toggleView(info.path)">{{info.businessEntityName || info.title || 标题}}</div>
      <div class="content">
        <div class="goal">
          <div class="title2">实时达成</div>
          <span class="goal-num" :class="Math.round(Math.random()) ? 'red' : 'blue'">{{info.cnyAmt || 0}}亿</span>
        </div>
        <div class="rate">
          <div class="rate-left">
            <span>责任制</span>
            <span>完成率</span>
            <span>进度</span>
          </div>
          <div class="rate-right">
            <span :class="Math.round(Math.random()) ? 'red' : 'blue'">{{info.saleTaskAmt || 0}}亿</span>
            <span :class="Math.round(Math.random()) ? 'red' : 'blue'">{{info.cnyAmtRadio || 0}}%</span>
            <div class="rate-right-progress">
              <Progress style="margin-bottom:3px" :rate="info.dateRadio" :color="'#FF8B2F'" />
              <Progress :rate="info.cnyAmtRadio || 0" :color="'#66FFFF'" />
            </div>
          </div>
        </div>
        <div class="percent">
          <div>
            <span class="percent-title">毛利</span>
            <span class="percent-text">{{info.grossProfitRadio || 0}}%</span>
          </div>
          <div>
            <span class="percent-title">自营</span>
            <span class="percent-text">{{info.businessModelCompleteRadio || 0}}%</span>
          </div>
          <div>
            <span class="percent-title">代运营</span>
            <span class="percent-text">30%</span>
          </div>
        </div>
        <div class="sab">
          <div class="">
            <div class="sab-title">自营SAB</div>
            
              <span class="sab-title2">S</span>
              <span class="sab-text">50%</span>
              <span class="sab-title2">A</span>
              <span class="sab-text">50%</span>
              <span class="sab-title2">B</span>
              <span class="sab-text">50%</span>
        
          </div>
          <div class="">
            <div class="sab-title">代营SAB</div>
            <span class="sab-title2">S</span>
            <span class="sab-text">50%</span>
            <span class="sab-title2">A</span>
            <span class="sab-text">50%</span>
            <span class="sab-title2">B</span>
            <span class="sab-text">50%</span>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
    import { reactive, ref, defineComponent, toRefs, computed, watch } from 'vue'
    import { useStore } from 'vuex'
    import Progress from '@/views/componets/Progress.vue'
    export default defineComponent({
      name: 'DataCard',
      components: {
        Progress
      },
      props: {
        info: {
        type: Object,
        default: {}
      },
      },
      emits: { 'onData': null },
      setup(props, { emit }) {
        const Store = useStore()
        let data = reactive({
  
        })
        let cardData = reactive([])
        let proSAB = reactive([])
  
        cardData = computed(() => {
          return Store.state.cardList
        })
  
        watch(cardData, (newValue, oldValue) => {
          console.log("监听数据", newValue)
          cardData = newValue
        })
  
        proSAB = computed(() => {
          return Store.state.proSAB
        })
  
        watch(proSAB, (newValue, oldValue) => {
          proSAB = newValue
        })
  
        const toggleView = () => {
          emit('onData', { EchartCard: 'EchartCardInfo', DataCard: 'DataBigCard' })
        }
  
        return { //必须返回 模板中才能使用
          toggleView,
          ...toRefs(data), cardData, proSAB
        }
      }
    })
  </script>
  
  <style scoped>
    .backgroundPic {
      height: 121px;
      width: 345px;
      background-image: url('@/assets/smallCardBackground.svg');
      background-repeat: no-repeat;
      background-position: 58% 33%;
      display: flex;
      justify-content: center;
      position: relative;
      background-size: cover;
    }
  
    .title {
      height: 16px;
      margin-top: 5px;
      font-size: 14px;
      color: #19ECFF;
      letter-spacing: 0;
      text-align: center;
      font-weight: 600;
      cursor: pointer;
  
    }
  
    .content {
      width: 100%;
      height: 80px;
      left: 9px;
      bottom: 9px;
      position: absolute;
      display: flex;
      padding-top: 10px;
    }
  
    .content-item {
      width: 50%;
      display: flex;
      padding: 10px 10px;
  
    }
  
  
    .goal {
      width: 50px;
      height: 100%;
      margin-left: 5px;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      /* justify-content: center; */
      /* align-items: center; */
    }
  
    .goal-num {
      font-size: 18px;
      text-align: center;
      line-height: 34px;
      font-weight: 600;
    }
  
    .rate {
      width: 80px;
      margin-top: 10px;
      margin-left: 3px;
      display: flex;
      justify-content: space-between;
    }
  
    .rate-left {
      width: 52%;
      height: 100%;
      /* display: flex;
      flex-wrap: wrap; */
    }
  
    .rate-right {
      width: 48%;
      height: 100%;
      /* margin-top:6px; */
    }
  
    .rate-right-progress {
      margin-top: 12px;
    }
  
    .rate-right span {
      display: block;
      font-size: 11px;
      text-align: center;
      font-weight: 400;
      line-height: 1.5;
    }
  
    .rate-left span {
      opacity: 0.6;
      font-size: 11px;
      color: #FFFFFF;
      font-weight: 400;
      line-height: 1;
    }
  
    .percent {
      height: 100%;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .percent-title {
      opacity: 0.5;
      font-size: 12px;
      color: #FFFFFF;
      text-align: right;
      font-weight: 400;
      display: inline-block;
      width:36px;
  
    }
  
    .percent-text {
      font-size: 12px;
      color: #66FFFF;
      text-align: center;
      font-weight: 400;
      display: inline-block;
      width:30px;
    }
  
    .sab {
      height: 100%;
      /* margin-left: 5px; */
      margin-top:5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width:120px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  
    .sab-title {
      font-size: 12px;
      color: #FFFFFF;
      font-weight: 400;
      font-weight: 400;
      line-height: 17px;
      margin-left:2px !important;
      width: 60px;
      margin: 0;
    }
  
    .sab-title2 {
      margin-left: 1px;
      opacity: 0.5;
      font-size: 11px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 400;
    }
  
    .sab-text {
      margin-left: 2px;
      font-size: 10px;
      color: #66FFFF;
      text-align: center;
      font-weight: 400;
    }
  
    .title2 {
      font-size: 12px;
      color: #FFFFFF;
      font-weight: 400;
      font-weight: 400;
      line-height: 17px;
    }
  
    .red {
      color: #FF2F5D;
    }
  
    .blue {
      color: #66FFFF;
    }
  
    .backgroundPic::after {
      /* content: '';
      position: absolute;
      left: 44%;
      top: 43px;
      height: calc(100% - 65px);
      width: 1px;
      background: rgba(255, 255, 255, 0.24); */
    }
  </style>