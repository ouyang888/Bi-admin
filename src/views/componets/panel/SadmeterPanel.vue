<template>
  <div class="panelList">
    <ProgressPanel :data="progressData" />
    <SpeedPanel :data="speedData" />
    <SadPanel :data="sabData" />
  </div>
</template>
<script>
import {
  reactive,
  ref,
  defineComponent,
  onMounted,
  computed,
  watchEffect,
  watch,
  toRef,
} from "vue";
import { useState, useGetters } from "@/utils/index";
import CircleProgress from "@/components/CircleProgress.vue";
import ProgressPanel from "./ProgressPanel.vue";
import SadPanel from "./SadPanel.vue";
import SpeedPanel from "./SpeedPanel.vue";
import { useStore, mapState } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { handleData } from "./handleData";
export default defineComponent({
  name: "SadmeterPanel",
  props: {},
  components: {
    CircleProgress,
    ProgressPanel,
    SadPanel,
    SpeedPanel,
  },
  setup(props) {
    const Store = useStore();
    const Route = useRouter();
    let dataList = reactive({
      smallInnerDataObj: {}, //仪表盘左边内销
      smallDownDataObj: {}, //仪表盘左边外销
      divisionS: 0, //仪表盘右边事业部S
      divisionA: 0, //仪表盘右边事业部A
      divisionB: 0, //仪表盘右边事业部B
      divisionInnerS: 0, //仪表盘右边内销S
      divisionInnerA: 0, //仪表盘右边内销A
      divisionInnerB: 0, //仪表盘右边内销B
      rightInner: 0,

      panelLeftInnerObj: {},
      panelLeftOutObj: {},
      panelS: 0,
      panelA: 0,
      panelB: 0,
      panelInnerS: 0,
      panelInneA: 0,
      panelInneB: 0,
      panelOutS: 0,
      panelOutA: 0,
      panelOutB: 0,
      rightpanelInner: 0,
    });
    //销向汇总仪表盘左边&&中间
    let smallData = JSON.parse(localStorage.getItem("getDashboard"));
    for (var i = 0; i < smallData.length; i++) {
      if (smallData[i].directName == "内销") {
        dataList.smallInnerDataObj = smallData[i];
      } else {
        dataList.smallDownDataObj = smallData[i];
      }
    }

    //内销汇总仪表盘左边&&中间
    // let panelDataList = JSON.parse(localStorage.getItem("setPanel"));
    // for (var i = 0; i < panelDataList.length; i++) {
    //   if (panelDataList[i].cooprLevel1 == "线上") {
    //     dataList.panelLeftInnerObj = panelDataList[i];
    //   } else if (panelDataList[i].cooprLevel1 == "线下") {
    //     dataList.panelLeftOutObj = panelDataList[i];
    //   } else if (panelDataList[i].obmOem == "OEM") {
    //     dataList.panelLeftInnerObj = panelDataList[i];
    //   } else if (panelDataList[i].obmOem == "OBM") {
    //     dataList.panelLeftOutObj = panelDataList[i];
    //   }
    // }

    //外销汇总仪表盘左边&&中间
    // let smallData = JSON.parse(localStorage.getItem("setPanel"));
    // for (var i = 0; i < smallData.length; i++) {
    //   if (smallData[i].directName == "内销") {
    //     dataList.smallInnerDataObj = smallData[i];
    //   } else {
    //     dataList.smallDownDataObj = smallData[i];
    //   }
    // }

    //销向汇总仪表盘右边
    let boardSAB = JSON.parse(localStorage.getItem("getGirectboardSAB"));
    // for (var i = 0; i < boardSAB.length; i++) {
    //   if (boardSAB[i].directName == "内销") {
    //     dataList.rightInner = boardSAB[i].saleVolumePositionRatio;
    //   }
    //   if (boardSAB[i].directName == "事业部" && boardSAB[i].position == "S") {
    //     dataList.divisionS = (boardSAB[i].positionRatio * 100).toFixed(1);
    //   } else if (
    //     boardSAB[i].directName == "事业部" &&
    //     boardSAB[i].position == "A"
    //   ) {
    //     dataList.divisionA = (boardSAB[i].positionRatio * 100).toFixed(1);
    //   } else if (
    //     boardSAB[i].directName == "事业部" &&
    //     boardSAB[i].position == "B"
    //   ) {
    //     dataList.divisionB = (boardSAB[i].positionRatio * 100).toFixed(1);
    //   } else if (
    //     boardSAB[i].directName == "内销" &&
    //     boardSAB[i].position == "S"
    //   ) {
    //     dataList.divisionInnerS = (boardSAB[i].positionRatio * 100).toFixed(1);
    //   } else if (
    //     boardSAB[i].directName == "内销" &&
    //     boardSAB[i].position == "A"
    //   ) {
    //     dataList.divisionInnerA = (boardSAB[i].positionRatio * 100).toFixed(1);
    //   } else if (
    //     boardSAB[i].directName == "内销" &&
    //     boardSAB[i].position == "B"
    //   ) {
    //     dataList.divisionInnerB = (boardSAB[i].positionRatio * 100).toFixed(1);
    //   } 
    // }
    //内销汇总仪表盘右边
    let panelSAB = JSON.parse(localStorage.getItem("panelSab"));
    // for (var i = 0; i < panelSAB.length; i++) {
      // if (panelSAB[i].directName == "内销") {
      //   dataList.rightpanelInner = panelSAB[i].directPositionRatio;
      // }

      // if (panelSAB[i].directName == "内销") {
      //   dataList.panelS = (panelSAB[i].directPositionRatio * 100).toFixed(1);
      //   dataList.panelA = (panelSAB[i].directPositionRatio * 100).toFixed(1);
      //   dataList.panelB = (panelSAB[i].directPositionRatio * 100).toFixed(1);
      // }

      // if (panelSAB[i].directName == "内销") {
      //   dataList.panelS = (panelSAB[i].directPositionRatio * 100).toFixed(1);
      //   dataList.panelA = (panelSAB[i].directPositionRatio * 100).toFixed(1);
      //   dataList.panelB = (panelSAB[i].directPositionRatio * 100).toFixed(1);
      // }

      // if (panelSAB[i].cooprLevel1 == "线上" && panelSAB[i].position == "S") {
      //   dataList.panelInnerS = (panelSAB[i].level1PositionRatio * 100).toFixed(
      //     1
      //   );
      // } else if (
      //   panelSAB[i].cooprLevel1 == "线上" &&
      //   panelSAB[i].position == "A"
      // ) {
      //   dataList.panelInneA = (panelSAB[i].level1PositionRatio * 100).toFixed(
      //     1
      //   );
      // } else if (
      //   panelSAB[i].cooprLevel1 == "线上" &&
      //   panelSAB[i].position == "B"
      // ) {
      //   dataList.panelInneB = (panelSAB[i].level1PositionRatio * 100).toFixed(
      //     1
      //   );
      // }

      // if (panelSAB[i].cooprLevel1 == "线下" && panelSAB[i].position == "S") {
      //   dataList.panelOutS = (panelSAB[i].level1PositionRatio * 100).toFixed(1);
      // } else if (
      //   panelSAB[i].cooprLevel1 == "线下" &&
      //   panelSAB[i].position == "A"
      // ) {
      //   dataList.panelOutA = (panelSAB[i].level1PositionRatio * 100).toFixed(1);
      // } else if (
      //   panelSAB[i].cooprLevel1 == "线下" &&
      //   panelSAB[i].position == "B"
      // ) {
      //   dataList.panelOutB = (panelSAB[i].level1PositionRatio * 100).toFixed(1);
      // }




      // if (panelSAB[i].obmOem == "OBM" && panelSAB[i].position == "S") {
      //   dataList.panelOutS = (panelSAB[i].obmOemPositionRatio * 100).toFixed(1);
      // } else if (
      //   panelSAB[i].obmOem == "OBM" &&
      //   panelSAB[i].position == "A"
      // ) {
      //   dataList.panelOutA = (panelSAB[i].obmOemPositionRatio * 100).toFixed(1);
      // } else if (
      //   panelSAB[i].obmOem == "OBM" &&
      //   panelSAB[i].position == "B"
      // ) {
      //   dataList.panelOutB = (panelSAB[i].obmOemPositionRatio * 100).toFixed(1);
      // }

      // if (panelSAB[i].obmOem == "OEM" && panelSAB[i].position == "S") {
      //   dataList.panelInneS = (panelSAB[i].obmOemPositionRatio * 100).toFixed(1);
      // } else if (
      //   panelSAB[i].obmOem == "OEM" &&
      //   panelSAB[i].position == "A"
      // ) {
      //   dataList.panelInneA = (panelSAB[i].obmOemPositionRatio * 100).toFixed(1);
      // } else if (
      //   panelSAB[i].obmOem == "OEM" &&
      //   panelSAB[i].position == "B"
      // ) {
      //   dataList.panelInneB = (panelSAB[i].obmOemPositionRatio * 100).toFixed(1);
      // }

    // }
    let progressData = reactive({
      bar1: 0,
      bar2: 0,
      ballTitle: "事业部",
      bigBallTitle: "毛利率",
      textLeft: "内销",
      textRight: "外销",
      titleTop: "内销",
      titleBottom: "外销",
      topGPM: 0,
      bottomGPM: 0,
      ballNum: 0,
    });
    let speedData = reactive({
      bar: 0,
      speedBar: 0,
      ballTitle: "事业部达成",
      ballNum: 0,
      ballLeftTitle: "自营",
      ballRightTitle: "代运营",
      ballLeftNum: 0,
      ballRightNum: 0,
      bottomNum: 0,
      bottomTitle1: "内销",
      bottomClose: 0,
      bottomTime: 0,
      bottomTitle2: "外销",
      bottomClose1: 0,
      bottomTime1: 0,
    });
    let sabData = reactive({
      bar1: 0,
      bar2: 0,
      bar3: 0,
      bar4: 0,
      bar5: 0,
      ballTitle: "事业部",
      top: "内销",
      bottom: "外销",
      sabArr: { s: 0, a: 0, b: 0 },
      topArr: { s: 0, a: 0, b: 0 },
      bottomArr: { s: 0, a: 0, b: 0 },
    });
    const handleData = (val, data, type) => {
      console.log(data, "datadatadatadatadatadata");
      switch (val) {
        case "s":
          progressData.ballTitle = "事业部";
          speedData.ballTitle = "事业部达成";
          speedData.ballLeftTitle = "内销";
          speedData.ballRightTitle = "外销";
          sabData.ballTitle = "事业部";
          // speedData.bottomClose = (
          //   dataList.smallInnerDataObj.cnyAmtRadio * 100
          // ).toFixed(1);
          // speedData.bottomTime = (
          //   dataList.smallInnerDataObj.dateRadio * 100
          // ).toFixed(1);
          // speedData.bottomClose1 = (
          //   dataList.smallDownDataObj.cnyAmtRadio * 100
          // ).toFixed(1);
          // speedData.bottomTime1 = (
          //   dataList.smallDownDataObj.dateRadio * 100
          // ).toFixed(1);
          // speedData.bottomNum =
          //   dataList.smallDownDataObj.saleTaskAmt.toFixed(1);
          // speedData.ballLeftNum = dataList.smallInnerDataObj.cnyAmt.toFixed(1);
          // speedData.ballRightNum = dataList.smallDownDataObj.cnyAmt.toFixed(1);
          // speedData.ballNum = dataList.smallDownDataObj.sumCnyAmt.toFixed(1);
          // speedData.bar = (dataList.smallDownDataObj.dateRadio * 100).toFixed(
          //   1
          // );
          // speedData.speedBar = (
          //   dataList.smallInnerDataObj.directAmtRadio * 100
          // ).toFixed(1);

          // progressData.ballNum = (
          //   dataList.smallInnerDataObj.grossProfitRadio * 100
          // ).toFixed(1);
          // progressData.topGPM = (
          //   dataList.smallInnerDataObj.directNameGrossProfitRadio * 100
          // ).toFixed(1);
          // progressData.bar1 = (
          //   dataList.smallInnerDataObj.directNameGrossProfitRadio * 100
          // ).toFixed(1);
          // progressData.bar2 = (
          //   dataList.smallDownDataObj.directNameGrossProfitRadio * 100
          // ).toFixed(1);
          // progressData.bottomGPM = (
          //   dataList.smallDownDataObj.directNameGrossProfitRadio * 100
          // ).toFixed(1);
          // sabData.sabArr.s = dataList.divisionS;
          // sabData.sabArr.a = dataList.divisionA;
          // sabData.sabArr.b = dataList.divisionB;
          // sabData.topArr.s = dataList.divisionInnerS;
          // sabData.topArr.a = dataList.divisionInnerA;
          // sabData.topArr.b = dataList.divisionInnerB;
          // sabData.bar2 = dataList.rightInner;
          break;
        case "productCoAll":
          progressData.ballTitle = "产司";
          speedData.ballTitle = "产司达成";
          speedData.ballLeftTitle = "内销";
          (speedData.ballRightTitle = "外销"), (sabData.ballTitle = "产司");
          break;
        case "saleDir":
          break;
        case "productCo":
          progressData.ballTitle = "产司";
          speedData.ballTitle = "产司达成";
          sabData.ballTitle = "产司";
          break;
        case "domestic":
          // if (type === "panel") {

          //   data.forEach((v) => {
          //     if (v.cooprLevel1 === "线上") {
          //       speedData.bar = v.dateRadio * 100;
          //       speedData.ballNum = (v.directCnyAmt / 10000).toFixed(0);
          //       speedData.speedBar = ((v.directAmtRadio * 100) / 2).toFixed(0);
          //       speedData.ballLeftNum = (v.cnyAmt / 10000).toFixed(0);
          //       speedData.bottomNum = (v.saleTaskAmt / 10000).toFixed(0);
          //       speedData.bottomTime = v.dateRadio * 100;
          //       speedData.bottomClose = v.cnyAmtRadio;
          //       progressData.bar2 = Number(
          //         (v.directProfitRadio * 100).toFixed(0)
          //       );
          //       progressData.topGPM = Number(
          //         (v.directProfitRadio * 100).toFixed(0)
          //       );
          //       progressData.bottomGPM = Number(
          //         (v.directProfitRadio * 100).toFixed(0)
          //       );
          //     } else {
          //       speedData.bottomClose1 = (v.cnyAmtRadio * 100).toFixed(0);
          //       speedData.ballRightNum = (v.cnyAmt / 10000).toFixed(0);
          //       speedData.bottomTime1 = v.dateRadio * 100;
          //       // speedData.bottomTitle2 = (v.cnyAmtRadio/10000).toFixed(0)
          //       progressData.bar1 = Number(
          //         (v.directProfitRadio * 100).toFixed(0)
          //       );
          //       progressData.topGPM = Number(
          //         (v.directProfitRadio * 100).toFixed(0)
          //       );
          //       progressData.bottomGPM = Number(
          //         (v.directProfitRadio * 100).toFixed(0)
          //       );
          //     }
          //   });

          // } else {
          //   let sabObj = {};
          //   let onLine = {};
          //   let offLine = {};
          //   sabData.ballTitle = "内销";
          //   data.forEach((v) => {
          //     let key = v.position;
          //     if (!v.position) {
          //       return;
          //     }
          //     if (v.cooprLevel1 === "线上") {
          //       onLine[key] = (v.level1PositionRatio * 100).toFixed(0);
          //     } else {
          //       offLine[key] = (v.level1PositionRatio * 100).toFixed(0);
          //     }
          //     sabObj[key] = (v.directPositionRatio * 100).toFixed(0);
          //   });
          //   sabData.topArr = onLine;
          //   sabData.bottomArr = offLine;
          //   sabData.sabArr = sabObj;
          // }

          // progressData.bar1 = (
          //   dataList.panelLeftInnerObj.onLineProfitRadio * 100
          // ).toFixed(1);
          // progressData.bar2 = (
          //   dataList.panelLeftOutObj.onLineProfitRadio * 100
          // ).toFixed(1);
          // progressData.ballNum = (
          //   dataList.panelLeftInnerObj.directProfitRadio * 100
          // ).toFixed(1);
          // progressData.topGPM = (
          //   dataList.panelLeftInnerObj.onLineProfitRadio * 100
          // ).toFixed(1);
          // progressData.bottomGPM = (
          //   dataList.panelLeftOutObj.onLineProfitRadio * 100
          // ).toFixed(1);

          // speedData.ballNum = dataList.panelLeftOutObj.directCnyAmt.toFixed(1);
          // speedData.bottomClose = (
          //   dataList.panelLeftInnerObj.cnyAmtRadio * 100
          // ).toFixed(1);
          // speedData.bottomTime = (
          //   dataList.panelLeftInnerObj.dateRadio * 100
          // ).toFixed(1);
          // speedData.bottomClose1 = (
          //   dataList.panelLeftOutObj.cnyAmtRadio * 100
          // ).toFixed(1);
          // speedData.bottomTime1 = (
          //   dataList.panelLeftOutObj.dateRadio * 100
          // ).toFixed(1);
          // speedData.bottomNum = dataList.panelLeftOutObj.saleTaskAmt.toFixed(1);
          // speedData.ballLeftNum = dataList.panelLeftInnerObj.cnyAmt.toFixed(1);
          // speedData.ballRightNum = dataList.panelLeftOutObj.cnyAmt.toFixed(1);
          // speedData.bar = (dataList.panelLeftOutObj.dateRadio * 100).toFixed(1);
          // speedData.speedBar = (
          //   dataList.panelLeftInnerObj.directAmtRadio * 100
          // ).toFixed(1);

          sabData.sabArr.s = dataList.panelS;
          sabData.sabArr.a = dataList.panelA;
          sabData.sabArr.b = dataList.panelB;

          sabData.topArr.s = dataList.divisionInnerS;
          sabData.topArr.a = dataList.divisionInnerA;
          sabData.topArr.b = dataList.divisionInnerB;

          sabData.bottomArr.s = dataList.panelOutS;
          sabData.bottomArr.a = dataList.panelOutA;
          sabData.bottomArr.b = dataList.panelOutB;

          progressData.ballTitle = "内销";
          progressData.textLeft = "线上";
          progressData.textRight = "线下";
          progressData.titleTop = "线上";
          progressData.titleBottom = "线下";
          speedData.ballTitle = "内销达成";
          speedData.ballLeftTitle = "线上";
          speedData.ballRightTitle = "线下";
          sabData.ballTitle = "内销";
          speedData.bottomTitle1 = "线上";
          speedData.bottomTitle2 = "线下";
          sabData.top = "线上";
          sabData.bottom = "线下";
          break;
        case "exprot":
          // progressData.bar1 = (
          //   dataList.panelLeftInnerObj.obmOemProfitRadio * 100
          // ).toFixed(1);
          // progressData.bar2 = (
          //   dataList.panelLeftOutObj.obmOemProfitRadio * 100
          // ).toFixed(1);
          // progressData.ballNum = (
          //   dataList.panelLeftInnerObj.directProfitRadio * 100
          // ).toFixed(1);
          // progressData.topGPM = (
          //   dataList.panelLeftInnerObj.obmOemProfitRadio * 100
          // ).toFixed(1);
          // progressData.bottomGPM = (
          //   dataList.panelLeftOutObj.obmOemProfitRadio * 100
          // ).toFixed(1);


          // speedData.ballNum = dataList.panelLeftOutObj.directCnyAmt.toFixed(1);
          // speedData.bottomClose = (
          //   dataList.panelLeftInnerObj.cnyAmtRadio * 100
          // ).toFixed(1);
          // speedData.bottomTime = (
          //   dataList.panelLeftInnerObj.dateRadio * 100
          // ).toFixed(1);
          // speedData.bottomClose1 = (
          //   dataList.panelLeftOutObj.cnyAmtRadio * 100
          // ).toFixed(1);
          // speedData.bottomTime1 = (
          //   dataList.panelLeftOutObj.dateRadio * 100
          // ).toFixed(1);
          // speedData.bottomNum = dataList.panelLeftOutObj.saleTaskAmt.toFixed(1);
          // speedData.ballLeftNum = dataList.panelLeftInnerObj.cnyAmt.toFixed(1);
          // speedData.ballRightNum = dataList.panelLeftOutObj.cnyAmt.toFixed(1);
          // speedData.bar = (dataList.panelLeftOutObj.dateRadio * 100).toFixed(1);
          // speedData.speedBar = (
          //   dataList.panelLeftInnerObj.directAmtRadio * 100
          // ).toFixed(1);

          sabData.sabArr.s = dataList.panelS;
          sabData.sabArr.a = dataList.panelA;
          sabData.sabArr.b = dataList.panelB;

          sabData.topArr.s = dataList.panelOutS;
          sabData.topArr.a = dataList.panelOutA;
          sabData.topArr.b = dataList.panelOutB;

          sabData.bottomArr.s = dataList.panelInneS;
          sabData.bottomArr.a = dataList.panelInneA;
          sabData.bottomArr.b = dataList.panelInneB;


          sabData.top = "OBM";
          sabData.bottom = "OEM";
          progressData.ballTitle = "外销";
          progressData.textLeft = "OBM";
          progressData.textRight = "OEM";
          progressData;
          speedData.ballTitle = "外销达成";
          speedData.ballLeftTitle = "OBM";
          speedData.ballRightTitle = "OEM";
          sabData.ballTitle = "外销";

          break;
        case "domesticOnLine": //线上页
          data.forEach((v) => {
            if (v.cooprLevel1 === "线上") {
              speedData.bar = v.dateRadio * 100;
              speedData.ballNum = (v.directCnyAmt / 10000).toFixed(0);
              speedData.speedBar = v.saleTaskAmtRadio * 100;
              speedData.ballLeftNum = (v.cnyAmt / 10000).toFixed(0);
              speedData.bottomNum = (v.saleTaskAmt / 10000).toFixed(0);
              // speedData.bottomClose = (v.cnyAmtRadio).toFixed(0)
              speedData.bottomClose = v.cnyAmtRadio;
              progressData.bar2 = Number(
                (v.directProfitRadio * 100).toFixed(0)
              );
              progressData.topGPM = Number(
                (v.directProfitRadio * 100).toFixed(0)
              );
              progressData.bottomGPM = Number(
                (v.directProfitRadio * 100).toFixed(0)
              );
            } else {
              speedData.bottomClose1 = v.cnyAmtRadio;
              speedData.ballRightNum = (v.cnyAmt / 10000).toFixed(0);
              progressData.bar1 = Number(
                (v.directProfitRadio * 100).toFixed(0)
              );
              progressData.topGPM = Number(
                (v.directProfitRadio * 100).toFixed(0)
              );
              progressData.bottomGPM = Number(
                (v.directProfitRadio * 100).toFixed(0)
              );
            }
          });
          progressData.ballTitle = "线上";
          speedData.ballTitle = "线上达成";
          speedData.ballLeftTitle = "自营";
          speedData.ballRightTitle = "代运营";
          sabData.ballTitle = "线上";
          break;
        case "domesticOffLine":
          progressData.ballTitle = "线下";
          speedData.ballTitle = "线下达成";
          speedData.ballLeftTitle = "旗舰店";
          speedData.ballRightTitle = "其他";
          sabData.ballTitle = "线下";
          break;
        case "domesticProductCoOnline":
          progressData.ballTitle = "线上";
          speedData.ballTitle = "线上达成";
          sabData.ballTitle = "线上";
          speedData.ballLeftTitle = "线上";
          speedData.ballRightTitle = "线下";
          break;
        case "domesticProductCoOffline":
          break;
        case "exprotAreaAll":
          progressData.ballTitle = "中东非";
          speedData.ballTitle = "中东非达成";
          speedData.ballLeftTitle = "OBM";
          speedData.ballRightTitle = "OEM";
          sabData.ballTitle = "中东非";
          break;
        case "exprotProductCo":
          speedData.ballLeftTitle = "OBM";
          speedData.ballRightTitle = "OEM";
          break;
        case "domesticOnLinePlatform":
          progressData.ballTitle = "线上";
          speedData.ballTitle = "线上达成";
          sabData.ballTitle = "线上";

          break;
        case "domesticOffLinePlace":
          break;
        case "domesticOnLinePlatformCo":
          progressData.ballTitle = "产司";
          speedData.ballTitle = "产司达成";
          sabData.ballTitle = "产司";
          speedData.ballRightTitle = "自营";
          sabData.ballTitle = "代运营";
          break;
        case "domesticOffLinePlaceCo":
          progressData.ballTitle = "产司";
          speedData.ballTitle = "产司达成";
          sabData.ballTitle = "产司";
          break;
        case "domesticProductCoOnline":
          break;
        case "domesticProductCoOffline":
          break;
        case "exprotArea":
          progressData.ballTitle = "中东非";
          speedData.ballTitle = "中东非达成";
          speedData.ballLeftTitle = "OBM";
          speedData.ballRightTitle = "OEM";
          sabData.ballTitle = "中东非";
          break;
        case "exprotAreaProductCo":
          break;
        case "domesticOnLineShop":
          speedData.ballRightTitle = "自营";
          sabData.ballTitle = "代运营";
          break;
        case "domesticOffLineChannel":
          speedData.ballRightTitle = "自营";
          sabData.ballTitle = "代运营";
          break;
        case "domesticOnLineSales":
          progressData.ballTitle = "";
          speedData.ballTitle = "";
          sabData.ballTitle = "";
          speedData.ballRightTitle = "自营";
          sabData.ballTitle = "代运营";
          break;
        case "domesticOffLineSales":
          progressData.ballTitle = "";
          speedData.ballTitle = "";
          sabData.ballTitle = "";
          speedData.ballRightTitle = "自营";
          sabData.ballTitle = "代运营";
          break;
        case "exprotSales":
          progressData.ballTitle = "";
          sabData.ballTitle = "";
          speedData.ballTitle = "";
          speedData.ballRightTitle = "OBM";
          sabData.ballTitle = "OEM";
          break;
        default:
      }
    };
    // let tableList = reactive({ data: {} });
    // tableList.data = computed(() => Store.state.getDashboard);
    // watch(tableList, (newVal, oldVal) => {});

    // watch(
    //   () => Route.currentRoute.value.name,
    //   (newVal, oldVal) => {
    //     switch (newVal) {
    //       case "s":
    //         progressData.ballTitle = smallData[0].directName;
    //         break;
    //     }
    //   },
    //   { immediate: true }
    // );

    let state = reactive({});
    let path = ref("");
    path = computed(() => {
      return Store.state.currentPath;
    });
    const fiLteData = (data) => {};
    // watch(path,(newVal,old)=>{
    //   handleData(newVal)
    // },{ immediate:true })
    let panelData = reactive({
      panel: {},
    });
    let dataSab = reactive({
      sab: {},
    });
    panelData.panel = computed(() => Store.state.panel);

    let panel = computed(() => Store.state.panel);
    let sab = computed(() => Store.state.panelSab);
    let currentPath = useRoute();
    watch(
      panel,
      (newVal, old) => {
        handleData(Store.state.currentPath, newVal, "panel");
        // console.log(newVal,'panelDatapanelDatapanelDatapanelData');
        // console.log(Store.state.currentPath,'fullPathfullPathfullPath');
      },
      { immediate: true }
    );
    watch(
      sab,
      (newVal, old) => {
        console.log(newVal, "sabsabsabsasasbasasb");
        handleData(Store.state.currentPath, newVal, "sab");
      },
      { immediate: true }
    );

    onMounted(() => {});

    return {
      //必须返回 模板中才能使用
      panelData,
      progressData,
      speedData,
      sabData,
      smallData,
      Store,
      dataList,
    };
  },
});
</script>

<style lang="stylus" scoped>
.panelList {
  // height: 258px;
  width: 760px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>