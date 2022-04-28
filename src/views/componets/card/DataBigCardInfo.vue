<template>
  <div class="backgroundPic" :class="background?'':'nobg'">
  
    <div class="title" @click="jumpView">{{title}}</div>
    <div class="content">
       <template v-for="(child,k) in inner" :key="k+21">
      <div class="content-item" v-if="k==0">
        <div class="goal" >
          <div class="title2">{{child.info.cooprLevel1}}达成</div>
          <span class="light-white">责任制</span>
          <span class="blue">{{child.info.saleTaskAmt}}亿</span>
          <span class="light-white">完成率</span>
          <span class="blue">{{child.info.onLineRadio*100>100?100:child.info.onLineRadio*100}}%</span>
        </div>
    

        <div class="rate">
          <span class="rate-num"
            :class="child.info.sumCnyamt<child.info.saleTaskAmt ? 'red' : 'blue'">{{child.info.sumCnyamt}}亿</span>
          <div class="rate-view">
            <div class="rate-left">
              <span>进度</span>
            </div>
            <div class="rate-right">
              <div class="rate-right-progress">
                <Progress style="margin-bottom:3px" :rate="child.info.dateRadio" :color="'#FF8B2F'" />
                <Progress :rate="child.info.onLineRadio" :color="'#66FFFF'" />
              </div>
            </div>
          </div>
        </div>

        <div class="percent">
          <div class="percent-item" v-for="(item,index) in child.list" :key="index+11">
            <div class="percent-title"> {{item.businessEntityName}}</div>
            <div class="percent-progress">
              <Progress style="margin-bottom:3px" :rate="item.dateRadio" :color="'#FF8B2F'" />
              <Progress :rate="item.cnyAmtRadio*100" :color="'#66FFFF'" />
            </div>
   
          </div>
        </div>
        <div class="remarks">
          <p> <span class="light-white">结构 <span v-for="(sab,index) in sabUp"
                :key="index+22">{{sab.position}}:{{sab.level1PositionRatio}}%</span></span></p>
          <p><span class="light-white">{{child.info.cooprLevel1 || child.info.obmOem}}毛利率</span> <span
              class="light-blue">{{child.info.onLineProfitRadio}}%</span></p>
        </div>
        <MinCardBg />
      </div>

      <div class="content-item" v-else> 
     
        <div class="goal">
          <div class="title2">线下库存</div>
          <span class="light-white">呆滞率</span>
          <span class="blue">15%</span>
          <span class="light-white">周转</span>
          <span class="blue">15天</span>
        </div>
  
        <div class="rate">
          <span class="rate-num"
            :class="'red'">15亿</span>
          <div class="rate-view">
            <div class="rate-left">
              <span>进度</span>
            </div>
            <div class="rate-right">
              <div class="rate-right-progress">
                <Progress style="margin-bottom:3px" :rate="10" :color="'#FF8B2F'" />
                <Progress :rate="20" :color="'#66FFFF'" />
              </div>
            </div>
          </div>
        </div>
  
        <div class="percent">

          <div class="percent-item" v-for="(item,index) in rightData" :key="index">
            <div class="percent-title"> {{item}} </div>
            <div class="percent-progress">
              <span class="blue">15亿</span>
            </div>
          </div>  

          </div>
  
          <div class="remarks">
            <p> <span class="light-white">库存结构 <span >S-10%;A-20%;B-70%;</span></span></p>
            <p><span class="light-white">呆滞结构 <span
                  >S-10%;A-20%;B-70%;</span></span></p>
          </div>
          <MinCardBg />
          
        </div>
   
     </template>

  


    </div>
    

     
    </div>
</template>

<script>
  import { reactive, ref, defineComponent, onMounted, toRefs, watch, computed } from 'vue'
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
      background: {
        type: Boolean,
        required: false,
        default: true
      },
      inner: {
        type: Array,
        default: [
          { list: [], info: {}, sabUp: [] }
        ]
      },
      sabUp:{
        type:Array,
        default:[]
      },
      title: {
        type: String,
        default: ''
      },
      emits: { 'updateData': null },


    },
    setup(props, { emit }) {
      const Store = useStore()
      let data = reactive({
        viewName: '内销',
        pathObj: {
          s: '/domestic',
          domestic: '/domesticOnLine'
        },
        rightData:[
                '环境',
                '烹饪',
                '电磁',
                '调理',
                '电动',
                '饮品',
            ],
      })
      console.log('propsprops',props)
      let currentPath = computed(() => {
        return Store.state.currentPath
      })
      const methods = {
        jumpView() {
          Store.commit('setCurrentTitle',props.title)
          Store.commit('setPath', { path: props.inner[0].info.path })
          emit('updateData',props.inner[0].info.path)
        }
      }

      return { //必须返回 模板中才能使用
        ...toRefs(data), ...methods
      }
    }
  })
</script>

<style scoped>
  .backgroundPic {
    height: 248px;
    width: 540px;
    background-image: url('@/assets/bigCardBackground.svg');
    background-repeat: no-repeat;
    position: relative;
    background-size: cover;
  }

  .nobg {
    background: none;
  }

  .backgroundPic::after {
    content: '';
    position: absolute;
    left: 51%;
    top: 54px;
    height: calc(100% - 82px);
    width: 1px;
    background: rgba(255, 255, 255, 0.24);
    ;
  }


  .title {
    font-size: 14px;
    line-height: 1.5;
    color: #19ECFF;
    letter-spacing: 0;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
  }

  .content {
    margin: 20px 10px 0 18px;
    display: flex;
    justify-content: space-around;
    position: relative;
    border: 1px solid rgba(13, 83, 183, .7);
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .content-item {
    width: 44%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    height: 180px;
  }

  .content-item:nth-child(1) {
    margin-left: 2%;
  }

  .content-item:nth-child(2) {
    margin-left: 8%;
  }

  .content-top {
    display: flex;
    flex-wrap: wrap;
  }

  .goal {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-bottom:10px;
  }

  .goal span {
    margin-right: 3px;
  }



  .rate {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .rate-num {
    font-size: 24px;
    text-align: center;
    line-height: 34px;
    font-weight: 600;
    width: 80px;

  }

  .rate-view {
    display: flex;
    flex: 1;
  }

  .rate-right .blue {
    font-size: 12px;
  }



  .rate-left {
    width: 40px;
    height: 100%;
    color: #fff;
    opacity: .6;
  }

  .rate-right {
    flex: 1;
    height: 100%;
  }

  .rate-right-progress {
    margin-top: 6px;
  }

  .rate-right a {
    font-size: 12px;
    text-align: center;
    font-weight: 400;
  }

  .rate-left span {
    font-size: 11px;
    text-align: center;
    font-weight: 400;
  }

  .percent {
    display: flex;
    flex-wrap: wrap;
    padding-bottom:10px;
  }

  .percent-item {
    display: flex;
    justify-content: space-between;
    width: 33.33%;
    margin-top: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }

  .percent-title {
    opacity: 0.5;
    font-size: 12px;
    color: #FFFFFF;
    font-weight: 400;
    width: 30px;
  }

  .percent-progress {
    flex: 1;
  }

  .rate,
  .percent {
    /* margin-top: 2px; */

  }

  .title2 {
    font-size: 14px;
    color: #FFFFFF;
    font-weight: 400;
    line-height: 17px;
    width:80px;
  }

  .remarks {
    margin-top: 2px;
    line-height: 1.2;
  }

  .red {
    color: #FF2F5D;
  }

  .blue {
    color: #66FFFF;
  }

  .light-blue {
    color: #66FFFF;
    font-size: 12px;
  }

  .light-white {
    color: #fff;
    opacity: .6;
    font-size: 11px;

  }
  .rate-num {
    font-size: 28px;
    line-height: 34px;
    text-align:left;
  }
  .percent-progress{
    font-size:12px;
  }
</style>