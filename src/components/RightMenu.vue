<template>
  <div class="menu-ui">
    <timeButton
      class="button"
      @click="menuClick('madeIn', false)"
      id="madeIn"
      :name="'产地'"
      :data="['本地', 'OEM']"
      :type="2"
    />
    <MenuButton
      class="button menuItem"
      @click="menuClick('direction', false)"
      id="direction"
      :name="'销向'"
      :type="2"
    />
    <MenuButton
      class="button menuItem"
      @click="menuClick('co', false)"
      id="co"
      :name="'产司'"
      :type="2"
    />
    <timeButton
      class="button"
      @click="menuClick('year', false)"
      id="year"
      :name="'年度'"
      :data="[2022, 2021, 2020]"
      :type="2"
    />
    <timeButton
      class="button"
      @click="menuClick('month', false)"
      id="month"
      :name="'月度'"
      :data="[4, 3, 2, 1]"
      :type="2"
    />
  </div>
</template>

<script>
import { reactive, ref, defineComponent } from "vue";
import { useStore } from "vuex";
import MenuButton from "./MenuButton.vue";
import timeButton from "./timeButton.vue";

export default defineComponent({
  name: "RightMenu",
  props: [],
  emits: ["menuEmitClick"],
  components: {
    MenuButton,
    timeButton,
  },
  setup(props, { emit }) {
    const Store = useStore();

    function menuClick(params) {
      let obj = {
        name: params,
        item: true,
      };
      emit("menuEmitClick", obj);
      Store.commit("setItemName", { name: params });
    }
    return {
      //必须返回 模板中才能使用
      menuClick,
    };
  },
});
</script>

<style scoped>
.button {
  margin-left: 11px;
}
.button:nth-child(3) {
  margin-left: 0px;
}
.button:nth-child(5) {
  margin-left: 0px;
}
.button:nth-child(1) {
  margin-left: 26px;
}
.button:nth-child(1) {
  width: 110px;
}
.button:nth-child(2) {
  width: 90px;
}
.button:nth-child(3) {
  width: 90px;
}

.button {
  transform: skewX(-18deg) !important;
}
.button span {
  transform: skewX(18deg) !important;
}
</style>
