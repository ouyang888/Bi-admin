<template>
  <div class="card-box">
    <div class="select-box">
      <el-select
        :popper-append-to-body="false"
        v-model="currentTime"
        placeholder="选择时间段查看数据"
        @change="changeDate"
      >
        <el-option
          v-for="(item, index) in timeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <component :is="component" />
  </div>
</template>
<script>
import EchartCard from "@/views/componets/EchartCard.vue";
import EchartCardInfo from "@/views/componets/EchartCardInfo.vue";
import {
  reactive,
  toRefs,
  onMounted,
  defineComponent,
  computed,
  watch,
  ref,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    EchartCard,
    EchartCardInfo,
  },
  emits: {
    updateCharts: null,
  },
  setup(props, { emit }) {
    const data = reactive({
      component: "EchartCard",
      currentTime: "",
      timeOptions: [
        { value: "15", label: "近15天" },
        { value: "30", label: "近30天" },
      ],
    });

    const methods = {
      changeDate(val) {
        console.log(val);
        emit("updateCharts", val);
      },
    };

    onMounted(() => {});
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
        if (
          newValue == "productCoAll" ||
          newValue == "productCo" ||
          newValue == "exprot" ||
          newValue == "domesticOnLine" ||
          newValue == "domesticOffLine" ||
          newValue == "domesticProductCoOnline" ||
          newValue == "domesticProductCoOffline" ||
          newValue == "exprotAreaAll" ||
          newValue == "exprotProductCo" ||
          newValue == "domesticOnLinePlatform" ||
          newValue == "domesticOffLinePlace" ||
          newValue == "domesticOnLinePlatformCo" ||
          newValue == "domesticOffLinePlaceCo" ||
          newValue == "exprotAreaProductCo" ||
          newValue == "domesticOnLineShop" ||
          newValue == "domesticOffLineChannel" ||
          newValue == "domesticOnLineSales" ||
          newValue == "domesticOffLineSales" ||
          newValue == "exprotArea"
        ) {
          data.component = "EchartCard";
        } else {
          data.component = "EchartCardInfo";
        }
      },
      { immediate: true }
    );

    return {
      ...toRefs(data),
      ...methods,
    };
  },
});
</script>
<style scoped>
.card-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
}

.select-box {
  position: absolute;
  right: 50px;
  top: 30px;
  z-index: 11;
  width: 186px;
}
</style>