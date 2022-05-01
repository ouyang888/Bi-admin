<template>
  <div class="content">
    <template v-if="viewData && viewData.length > 0">
      <div class="item" v-for="(item, index) in viewData" :key="index">
        <div class="title">{{ item.title }}日达成趋势图</div>
        <div class="body">
          <!-- <PublicEcharts :id="index+11" :title="maxTitle" :option="item.echartsData" :echartsLabel='echartsLabel'/> -->
          <staticEcharts
            :id="index + 11"
            :title="item.title"
            :echartsLabel="echartsLabel"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="noData">暂无数据</div>
    </template>
    <MaxCardBg />
  </div>
</template>
<script>
import PublicEcharts from "@/views/componets/PublicEcharts.vue";
import MinCardBg from "@/views/componets/MinCardBg.vue";
import MaxCardBg from "@/views/componets/MaxCardBg.vue";
import * as echarts from "echarts";
import { reactive, defineComponent, toRefs, watch, computed, ref } from "vue";
import { useStore } from "vuex";
import { createEcharts } from "@/assets/utils/common.js";
import StaticEcharts from "@/views/componets/StaticEcharts.vue";
import { useRouter } from "vue-router";
export default {
  name: "EchartCard",
  components: {
    PublicEcharts,
    MinCardBg,
    MaxCardBg,
    StaticEcharts
  },
  setup(props) {
    const store = useStore();
    const data = reactive({
      maxTitle: true,
      viewData: [{ title: "事业部" }, { title: "内销" }, { title: "外销" }],
      echartsLabel: [
        { class: "plan", text: "实际达成" },
        { class: "average", text: "日均线" },
      ],
      echartsData: {},
    });
    let chartData = computed(() => {
      return store.state.chart;
    });
    let path = ref("");
    path = computed(() => {
      return store.state.currentPath;
    });

    
    // let getInnerDirectOnline = JSON.parse(localStorage.getItem("getInnerDirectOnline"));
    // console.log("gdhbfdsfj",getInnerDirectOnline)
 
    watch(
      path,
      (newValue, oldValue) => {
        if (newValue == "domestic") {
          data.viewData = [
            { title: "内销" },
            { title: "线上" },
            { title: "线下" },
          ];
        }
      },
      { immediate: true }
    );

    return {
      ...toRefs(data),
    };
  },
};
</script>
<style scoped>
.content {
  margin: 15px auto;
  color: #fff;
  font-size: 15px;
  line-height: 1.5;
  display: flex;
  border: 1px solid hsla(210, 86%, 39%, 0.66);
  padding: 15px 0 20px;
  width: calc(100% - 40px);
  position: relative;
  box-sizing: border-box;
  height: 320px;
  justify-content: space-around;
}
.noData {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  width: 100%;
  height: 100%;
}

.title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
  letter-spacing:2px;
}

.item {
  /* width: 100%; */
  box-sizing: border-box;
  width: 33%;
  margin-top: 10px;
}

.body {
  height: 240px;
}
</style>