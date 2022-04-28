<template>
    <div class="backgroundPic">
      <div class="title" @click="jumpView(info)"> {{ info.store || info.cooprLevel3 || info.cooprLevel2 || info.title}}</div>
      <div class="content">
        <div class="content-item">
          <div class="goal">
            <div class="title2">实时达成</div>
            <span class="goal-num" :class="Math.round(Math.random()) ? 'red' : 'blue'">10亿</span>
          </div>
          <div class="rate">
            <div class="rate-left">
              <span>责任制</span>
              <span>完成率</span>
              <span>进度</span>
            </div>
            <div class="rate-right">
              <span :class="Math.round(Math.random()) ? 'red' : 'blue'">20亿</span>
              <span :class="Math.round(Math.random()) ? 'red' : 'blue'">20</span>
              <div class="rate-right-progress">
                <Progress style="margin-bottom:3px" :rate="10 || 0" :color="'#FF8B2F'" />
                <Progress :rate="20 || info.saleAmtRadio || 0" :color="'#66FFFF'" />
              </div>
            </div>
          </div>
  
        </div>
        <div class="content-item">
          <div class="goal">
            <div class="title2">库存达成</div>
            <span class="goal-num" :class="Math.round(Math.random()) ? 'red' : 'blue'">75亿</span>
          </div>
          <div class="rate">
            <div class="rate-left">
              <span>周转</span>
              <span>呆滞率</span>
              <span>毛利率</span>
            </div>
            <div class="rate-right">
              <span :class="Math.round(Math.random()) ? 'red' : 'blue'">100天</span>
              <span :class="Math.round(Math.random()) ? 'red' : 'blue'">75%</span>
              <span :class="Math.round(Math.random()) ? 'red' : 'blue'">75%</span>
  
            </div>
          </div>
  
        </div>
        <MinCardBg />
      </div>
  
    </div>
  </template>
  
  <script>
    import { reactive, ref, defineComponent, toRefs, computed, watch } from 'vue'
    import { useStore } from 'vuex'
    import Progress from '@/views/componets/Progress.vue'
    import MinCardBg from '@/views/componets/MinCardBg.vue'
    export default defineComponent({
      name: 'DataCard',
      components: {
        Progress,
        MinCardBg
      },
      props: {
        info: {
        type: Object,
        default: {}
      },
      },
      emits: { 'updateData': null },
      setup(props, { emit }) {
        const Store = useStore()
        let data = reactive({
  
        })
  
        let cardData = reactive([])
  
        cardData = computed(() => {
          return Store.state.cardList
        })
  
        watch(cardData, (newValue, oldValue) => {
          console.log("监听数据", newValue)
          cardData = newValue
        })
  
  
  
  
        let model = computed(() => {
          return Store.state.model;
        })
        watch(model, (newValue, oldValue) => {
          model = newValue
        })
  
        console.log('props.info', props.info)
        const methods = {
          jumpView(info) {
            Store.commit('setCurrentTitle', info.cooprLevel2 || info.cooprLevel3 || info.store || '')
            Store.commit('setPath', { path: info.path })
            emit('updateData', info.path)
          },
          setNumber(val) {
            return (val / 100000000).toFixed(2)
          }
        }
  
  
  
  
        return { //必须返回 模板中才能使用
          ...methods,
          ...toRefs(data), model,cardData
        }
      }
    })
  </script>
  
  <style scoped>
    .backgroundPic {
      height: 121px;
      width: 341px;
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
      min-width: 80px;
  
    }
  
    .content {
      width: 325px;
      height: 80px;
      left: 9px;
      bottom: 9px;
      position: absolute;
      display: flex;
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
      /* justify-content: center; */
      /* align-items: center; */
    }
  
    .goal-num {
      font-size: 20px;
      text-align: center;
      line-height: 34px;
      font-weight: 600;
    }
  
    .rate {
      width: 80px;
      /* margin-top: 10px; */
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
      /* display:flex;
      flex-wrap:wrap; */
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
      line-height: 1.5;
      display:block;
    }
  
    .percent {
      height: 100%;
      /* margin-left: 5px; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .percent-title {
      opacity: 0.5;
      font-size: 12px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 400;
    }
  
    .percent-text {
      font-size: 12px;
      color: #66FFFF;
      text-align: center;
      font-weight: 400;
    }
  
    .sab {
      height: 100%;
      /* margin-left: 5px; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .sab-title {
      font-size: 12px;
      color: #FFFFFF;
      font-weight: 400;
      font-weight: 400;
      line-height: 17px;
      margin-left: 10px !important;
      width: 60px;
      margin: 0;
    }
  
    .sab-title2 {
      margin-left: 5px;
      opacity: 0.5;
      font-size: 12px;
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
      content: '';
      position: absolute;
      left: 51%;
      top: 43px;
      height: calc(100% - 65px);
      width: 1px;
      background: rgba(255, 255, 255, 0.24);
    }
  </style>