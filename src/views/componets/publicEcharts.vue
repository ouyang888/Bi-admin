<template>

  <div id="main">
    <div id="legend">
      <template v-if="echartsLabel">
        <div class="item" v-for="item in echartsLabel">
          <div class="lump" :class="item.class"></div>
          <div class="text">{{item.text}}</div>
        </div>
      </template>
    </div>
    <div :id="id" class="echartsBox"></div>
  </div>
</template>
<script>

  import { watch, onMounted, reactive, ref, toRefs } from 'vue'

  // import them from '@/assets/js/them.json'
  import * as echarts from 'echarts'
  // echarts.registerTheme('default',them);

  export default {
    name: 'publicEcharts',
    props: {
      option:{
        type:Object,
        default:{}
      } ,
      id:{
        type:String,
        default:''
      } ,
      echartsLabel:{ //
        type:Array,
        default:[]
      },
      isShowAxisValue:{  //是否显示坐标轴数据 
        type:Boolean,
        default:true,
      }
    },
    setup(props, context) {
      const data = reactive({
        xAxis: {
          axisLabel: {
            formatter: function (val) {
              return ''
            }
          }
        },
        
      })
      onMounted(() => {
        if (!props.isShowAxisValue) {
          Object.assign(props.option.xAxis, data.xAxis);
          Object.assign(props.option.yAxis, data.xAxis);

        }
        const charts = echarts.init(document.getElementById(props.id), 'default');
        charts.setOption(props.option);
      })
      watch(props.option, (newVal, oldVal) => {
        if (props.option) {
          
          const charts = echarts.init(document.getElementById(props.id),'default');
          charts.setOption(oldVal, true);
        }
      }
      )
      return {
        ...toRefs(data)
      }
    }
  }

</script>
<style scoped>
  #main {
    width: 100%;
    height: 100%;
  }

  .echartsBox {
    width: 100%;
    height: 100%;
  }

  #legend {
    display: flex;
    justify-content: flex-end;

  }

  .item {
    display: flex;
    align-items: center;
    margin-left: 15px;
    width: 95px;
  }

  .lump {
    width: 19px;
    height: 3px;
    margin-right: 10px;
  }

  /* 计划 */
  .plan {
    border-bottom: 2px solid #66FFFF;
  }

  /* 实际 */
  .actual {
    border-bottom: 2px solid #6C02CF;
  }

  /* 日均线 */
  .average {
    border-bottom: 2px dashed #FF8B2F;
  }

  .text {
    color: #fff;
    font-size: 12px;
  }
</style>