<template>
  <div class="content">
    <div class="content-left">
      <div class="title">{{ viewLeftData }}</div>
      <div class="body">
        <staticEcharts :id="1" />
      </div>
    </div>
    <div class="content-right">
      <div class="title">{{ viewRightData }}</div>
      <div class="body">
        <div class="item" v-for="(item, index) in viewData" :key="index">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-body">
            <staticEcharts :id="index + 11" :isConcise="isConcise" />
          </div>
          <MinCardBg /> 
        </div>
      </div>
    </div>
    <MaxCardBg />
  </div>
</template>
<script>
import PublicEcharts from "@/views/componets/PublicEcharts.vue";
import MinCardBg from "@/views/componets/MinCardBg.vue";
import MaxCardBg from "@/views/componets/MaxCardBg.vue";
import * as echarts from "echarts";
import { createEcharts } from "@/assets/utils/common.js";
import { useStore } from "vuex";
import {
  reactive,
  defineComponent,
  onMounted,
  toRefs,
  watch,
  ref,
  computed,
} from "vue";
import StaticEcharts from "@/views/componets/StaticEcharts.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EchartCard",
  components: {
    PublicEcharts,
    MinCardBg,
    MaxCardBg,
    StaticEcharts,
  },
  setup(props) {
    const data = reactive({
      maxTitle: true,
      currentTime: "15",
      viewLeftData: "事业部日交付趋势图",
      viewRightData: "产司日交付趋势图",
      timeOptions: [
        { value: "15", label: "近15天" },
        { value: "30", label: "近30天" },
      ],
      isShowAxisValue: false,
      viewData: [
        { title: "环境" },
        { title: "烹饪" },
        { title: "电磁" },
        { title: "调理" },
        { title: "电动" },
        { title: "饮品" },
      ],
      echartsLabel: [
        { class: "plan", text: "实际达成" },
        { class: "average", text: "日均线" },
      ],
      isConcise: true,
    });
    // console.log(data.xAxisData, data.yAxisData, data.markLineValue)
    // data.echartsData = createEcharts(data.xAxisData, data.yAxisData, data.markLineValue);
    // data.echartsData1 = createEcharts(data.xAxisData, data.yAxisData, data.markLineValue);
    // const router = useRouter();
    // const path = router.currentRoute.value.fullPath;
    const Store = useStore();
    let path = ref("");
    path = computed(() => {
      return Store.state.currentPath;
    });

    watch(
      path,
      (newValue, oldValue) => {
        if (newValue == "productCo") {
          data.viewLeftData = "产司日达成趋势图";
          data.viewRightData = "品类日达成趋势图";
        } else if (newValue == "exprot") {
          data.viewLeftData = "外销日达成趋势图";
          data.viewRightData = "大区日达成趋势图";
          data.viewData = [
            { title: "北美" },
            { title: "亚太" },
            { title: "日本" },
            { title: "韩国" },
            { title: "亚太" },
            { title: "中东非" },
          ];
        } else if (newValue == "domesticOnLine") {
          data.viewLeftData = "内销线上日达成趋势图";
          data.viewRightData = "线上通路日达成趋势图";
          data.viewData = [
            { title: "陶系" },
            { title: "京东" },
            { title: "拼多多" },
            { title: "美的平台" },
            { title: "兴趣电商" },
            { title: "天猫自营店" },
          ];
        } else if (newValue == "domesticOffLine") {
          data.viewLeftData = "内销线下日达成趋势图";
          data.viewRightData = "线下通路日达成趋势图";
          data.viewData = [
            { title: "苏宁" },
            { title: "国美" },
            { title: "五星" },
            { title: "美云销" },
            { title: "待定" },
            { title: "待定" },
          ];
        } else if (
          newValue == "domesticProductCoOnline" ||
          newValue == "domesticProductCoOffline"
        ) {
          data.viewLeftData = "内销日达成趋势图";
          data.viewRightData = "内销产司日达成趋势图";
          data.viewData = [
            { title: "环境" },
            { title: "烹饪" },
            { title: "电磁" },
            { title: "调理" },
            { title: "饮品" },
            { title: "电动" },
          ];
        } else if (newValue == "exprotAreaAll") {
          data.viewLeftData = "外销中东非日达成趋势图";
          data.viewRightData = "各区域日达成趋势图";
          data.viewData = [
            { title: "中东" },
            { title: "非洲" },
            { title: "南亚" },
            { title: "美国" },
            { title: "加拿大" },
            { title: "墨西哥" },
          ];
        } else if (
          newValue == "exprotProductCo" ||
          newValue == "exprotAreaProductCo"
        ) {
          data.viewLeftData = "外销日达成趋势图";
          data.viewRightData = "外销产司日达成趋势图";
          data.viewData = [
            { title: "环境" },
            { title: "烹饪" },
            { title: "电磁" },
            { title: "调理" },
            { title: "饮品" },
            { title: "电动" },
          ];
        } else if (
          newValue == "domesticOnLinePlatform" ||
          newValue == "domesticOffLinePlace"
        ) {
          data.viewLeftData = "内销线上京东日达成趋势图";
          data.viewRightData = "京东店铺日达成趋势图";
          data.viewData = [
            { title: "京东自营" },
            { title: "京东企业购" },
            { title: "京东POP" },
            { title: "京东新通路" },
            { title: "京东代理" },
            { title: "其他" },
          ];
        } else if (
          newValue == "domesticOnLinePlatformCo" ||
          newValue == "domesticOffLinePlaceCo" ||
          newValue == "domesticOnLineShop" ||
          newValue == "domesticOffLineChannel"
        ) {
          data.viewLeftData = "内销线上京东POP日达成趋势图";
          data.viewRightData = "京东POP店铺日达成趋势图";
          data.viewData = [
            { title: "京东旗舰店" },
            { title: "拍拍优品" },
            { title: "环境旗舰店" },
            { title: "生活专卖店" },
            { title: "拼购旗舰店" },
            { title: "其他" },
          ];
        } else if (
          newValue == "domesticOnLineSales" ||
          newValue == "domesticOffLineSales"
        ) {
          data.viewLeftData = "内销线上电动日达成趋势图";
          data.viewRightData = "内销线上电动日达成趋势图";
          data.viewData = [
            { title: "破壁机" },
            { title: "豆浆机" },
            { title: "绞肉机" },
            { title: "电磁炉" },
            { title: "果汁杯" },
            { title: "厨师机" },
          ];
        } else if (newValue == "exprotArea") {
          data.viewLeftData = "客户总体汇总趋势图";
          data.viewRightData = "单个大客户趋势";
          data.viewData = [
            { title: "区域客户" },
            { title: "区域客户" },
            { title: "区域客户" },
            { title: "区域客户" },
            { title: "区域客户" },
            { title: "区域客户" },
          ];
        }
      },
      { immediate: true }
    );

    let changeTime = (val) => {
      console.log(val, "123");
    };

    return {
      ...toRefs(data),
      changeTime,
    };
  },
});
</script>
<style scoped>
.select-box {
  position: absolute;
  right: 15px;
  top: 15px;
}

.content {
  margin: 15px auto;
  color: #fff;
  line-height: 1.5;
  display: flex;
  border: 1px solid hsla(210, 86%, 39%, 0.66);
  padding: 15px 30px;
  width: calc(100% - 30px);
  position: relative;
  box-sizing: border-box;
}

.title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
}

.content-left {
  width: 40%;
}

.content-left .body {
  width: 100%;
  height: 240px;
}

.content-right {
  flex: 1;
}

.content-right .body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 15px;
  border: 1px solid hsla(210, 86%, 39%, 0.66);
  width: 32%;
  margin-top: 10px;
  height: 110px;
  position: relative;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
  width: 80px;
}

.item-body {
  flex: 1;
  height: 100%;
}
</style>