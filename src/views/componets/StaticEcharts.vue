<template>
  <div id="main">
    <div id="legend">
      <template v-if="title">
        <div class="item" v-for="(item, index) in labelData" :key="index">
          <div class="lump" :class="item.class"></div>
          <div class="text">{{ item.text }}</div>
        </div>
      </template>
    </div>
    <div :id="id" class="echartsBox"></div>
  </div>
</template>
  <script>
import {
  watch,
  onMounted,
  reactive,
  ref,
  toRefs,
  computed,
  onUpdated,
  onBeforeUpdate,
  onActivated,
} from "vue";
import * as echarts from "echarts";
import axios from "@/utils/axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "publicEcharts",
  props: {
    option: Object,
    id: String,
    title: String,
    isConcise: Boolean /*是否隐藏坐标轴label*/,
  },
  setup(props, context) {
    const Store = useStore();
    const Route = useRouter();
    let division = JSON.parse(localStorage.getItem("getDirectTotalInnerChart"));
    let directOnline = JSON.parse(localStorage.getItem("innerDirect"));
    let directOut = JSON.parse(localStorage.getItem("outerDirect"));

    let getGeneral = JSON.parse(localStorage.getItem("getGeneral"));
    let getInnerDirectOnline = JSON.parse(
      localStorage.getItem("getInnerDirectOnline")
    );
    let getInnerDirectLineDown = JSON.parse(
      localStorage.getItem("getInnerDirectLineDown")
    );

    //销向汇总趋势图
    let dataList = reactive({
      divisionListArr: "",
      divisionDateArr: "",
      getGeneralDateArr: "",
      getGeneralListArr: "",
      directOutDateArr: "",
      directOuListArr: "",
      divisionLine: "",
      getGeneraLine: "",
      directOuListLine: "",
    });
    //内销汇总趋势图
    let panelList = reactive({
      panelListArr: "",
      panelDateArr: "",
      getPanelDateArr: "",
      getPanelListArr: "",
      panelOutDateArr: "",
      panelOuListArr: "",
      panelonLine: "",
      getPanelLine: "",
      panelOuListLine: "",
    });

    let path = ref("");
    path = computed(() => {
      return Store.state.currentPath;
    });

    let name = path.value;

    watch(
      path,
      (newVal, old) => {
        switch (newVal) {
          case "s":
            dataList.divisionListArr = division.divisionCnyAmt;
            dataList.divisionDateArr = division.divisionDate;
            dataList.getGeneralDateArr = directOnline.innerDirectDate;
            dataList.getGeneralListArr = directOnline.innerDirectCnyAmt;
            dataList.directOutDateArr = directOut.outerDirectDate;
            dataList.directOuListArr = directOut.outerDirectCnyAmt;
            dataList.divisionLine = division.divisionLine;
            dataList.getGeneraLine = directOnline.getGeneraLine;
            dataList.directOuListLine = directOut.directOuListLine;
            break;
          case "domestic":
            panelList.panelListArr = getGeneral.general;
            panelList.panelDateArr = getGeneral.generalDate;

            panelList.getPanelDateArr = getInnerDirectOnline.onLineDate;
            panelList.getPanelListArr = getInnerDirectOnline.lineTotalCnyAmt;

            panelList.panelOutDateArr = getInnerDirectLineDown.lineDownDate;
            panelList.panelOuListArr = getInnerDirectLineDown.lineDownTotalCnyAmt;

            panelList.panelonLine = division.allLine;
            panelList.getPanelLine = directOnline.lineX;
            panelList.panelOuListLine = directOut.lineDownLine;
            break;
        }
      },
      { immediate: true }
    );
console.log("11111++++",name)
console.log("22222++++",props.title)
    const data = reactive({
      
      msg: 123,
      xAxis: {
        axisLabel: {
          formatter: function (val) {
            return "";
          },
        },
      },
      labelData: [
        { class: "plan", text: "实际达成" },
        // { class: 'actual', text: '规划达成' },
        { class: "average", text: "日均线" },
      ],
      echartsData: {
        textStyle: {
          color: "#3FB0FF",
        },
        color: ["#66FFFF", "#6C02CF", "#FF8B2F"],
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "5%",
          left: "5%",
          right: "3%",
          bottom: "3%",
          containLabel: true, 
        },
        xAxis: {
          type: "category", 
          boundaryGap: false,  
          data:
            name === "s" && props.title === "事业部"
              ? dataList.divisionDateArr
              : name === "s" && props.title === "外销"
              ? dataList.directOutDateArr
              : name === "s" && props.title === "内销"
              ? dataList.getGeneralDateArr
              : name === "domestic" && props.title === "内销"
              ? panelList.getPanelDateArr
              : name === "domestic" && props.title === "线上" 
              ? panelList.getPanelDateArr
              : name === "domestic" && props.title === "线下"
              ? panelList.panelOutDateArr
              : "",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          name: "单位：万",
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(45,153,255,.3)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: "实际达成",
            type: "line",
            stack: "Total",
            // smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.9,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "hsla(197, 100%, 50%, .3)",
                },
                {
                  offset: 1,
                  color: "hsla(215, 95%, 39%, .3)",
                },
              ]),
            },
            data:
              name === "s" && props.title === "事业部"
                ? dataList.divisionListArr
                : name === "s" && props.title === "外销"
                ? dataList.directOuListArr
                : name === "s" && props.title === "内销"
                ? dataList.getGeneralListArr
                : name === "domestic" && props.title === "内销"
                ? panelList.panelListArr
                : name === "domestic" && props.title === "线上"
                ? panelList.getPanelListArr
                : name === "domestic" && props.title === "线下" 
                ? panelList.panelOuListArr
                : "",
            markLine: {
              data: [
                {
                  yAxis:
                    props.title == "事业部"
                      ? dataList.divisionLine
                      : props.title == "外销"
                      ? dataList.directOuListLine
                      : dataList.getGeneraLine,
                  silent: false, //鼠标悬停事件 true没有，false有
                  lineStyle: {
                    //警戒线的样式 ，虚实 颜色
                    type: "dashed", //样式  ‘solid’和'dotted'
                    color: "#FF8B2F",
                    width: 2, //宽度
                  },
                  label: {
                    formatter: "",
                    color: "#FF8B2F",
                    position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end" 开始 中点 结束
                  },
                },
              ],

              symbol: ["none", "none"],
            },
          },
          // {
          //   name: '规划达成',
          //   type: 'line',
          //   stack: 'Total',
          //   smooth: true,
          //   lineStyle: {
          //     width: 2
          //   },
          //   showSymbol: false,
          //   areaStyle: {
          //     opacity: 0.8,
          //     color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          //       {
          //         offset: 0,
          //         color: 'hsla(270, 100%, 44%, 1)'
          //       },
          //       {
          //         offset: 1,
          //         color: 'hsla(232, 76%, 21%, 1)'
          //       }
          //     ])
          //   },
          //   data: [120, 282, 111, 234, 220, 340, 310]
          // },
        ],
      },
    });

    onMounted(() => {
      // console.log("钩子函数12", props, props.id);
      // console.log("sssoopp0000", Store.state.getDirectTotalInnerChart);
      // if(props.title == "线下"){
      //   listData.onlineDateArr = Store.state.getInnerDirectLineDown.lineDownDate
      //   listData.listDateArr = Store.state.getInnerDirectLineDown.lineDownTotalCnyAmt
      // }
      // console.log('0987654567890-iuhnjkoijnm',listData.onlineDateArr)

      // if (props.isConcise) {
      //   Object.assign(data.echartsData.xAxis, data.xAxis);
      //   Object.assign(data.echartsData.yAxis, data.xAxis);
      // }

      if (props.isConcise) {
        Object.assign(data.echartsData.xAxis, data.xAxis);
        Object.assign(data.echartsData.yAxis, data.xAxis);
      }

      const charts = echarts.init(document.getElementById(props.id), "default");
      // charts.setOption(data.echartsData);
      charts.setOption(data.echartsData);
    });

    // watch(data.echartsData, (newVal, oldVal) => {
    //   console.log("变化", newVal, oldVal.series);
    //   if (props.option) {
    //     const charts = echarts.init(document.getElementById(props.id));
    //     charts.setOption(oldVal, true);
    //   }
    // });
    watch(data.echartsData, (newVal, oldVal) => {
      // console.log("变化", newVal, oldVal.series);
      if (props.option) {
        const charts = echarts.init(document.getElementById(props.id));
        charts.setOption(oldVal, true);
      }
    });
    return {
      ...toRefs(data, dataList, panelList),
    };
  },
};
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
  border-bottom: 2px solid #66ffff;
}

/* 实际 */
.actual {
  border-bottom: 2px solid #6c02cf;
}

/* 日均线 */
.average {
  border-bottom: 2px dashed #ff8b2f;
}

.text {
  color: #fff;
  font-size: 12px;
}
</style>