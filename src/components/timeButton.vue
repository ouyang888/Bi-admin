<template>
  <div :style="{ transform: styles }" class="button">
    <span :style="{ transform: textStyle }" class="text"
      >{{ itemName
      }}<text style="margin-left: 5px" v-if="itemName == '产地'"
        ><i class="el-icon-arrow-down"></i></text
    ></span>

    <div :style="{ transform: textStyle }" :class="itemName == '产地' ? 'dropdown-content dropdown-contents':'dropdown-content'">
      <a
        :style="itemName == '产地' ? 'width:110px;' : 'width:80px;'"
        @click="itemClick(v)"
        v-for="(v, i) in data"
        :key="i"
        >{{ v }}</a
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onUpdated } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "MenuButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      default: 1,
    },
    data: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    let itemName = ref("");
    itemName.value = props.name;
    const Store = useStore();
    onUpdated(() => {});
    let styles = ref(0);
    function handleType(props) {
      if (props.type === 1) {
        return "skewX(38deg)";
      } else if (props.type === 2) {
        return "skewX(-38deg)";
      }
    }
    const itemClick = (val) => {
      itemName.value = val;
    };
    function handleText(type) {
      if (type === 1) {
        return "skewX(-38deg)";
      } else if (type === 2) {
        return "skewX(38deg)";
      }
    }
    styles = handleType(props);
    let textStyle = handleText(props.type);

    return {
      //必须返回 模板中才能使用
      styles,
      textStyle,
      itemClick,
      itemName,
    };
  },
});
</script>

<style lang="stylus" scoped>
.drop {
  display: inline-block;
  position: relative;
  border: none;
}

.button {
  margin-left: 10px;
  width: 80px;
  height: 38px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: 2px solid #00F9FF;
  opacity: 0.5;
  background-image: linear-gradient(0deg, #0E5FFF 0%, rgba(28, 0, 255, 0) 100%);
  z-index: 999;
}

.text {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: #19ECFF;
  line-height: 38px;
  text-align: center;
  position: absolute;
  transform: skewX(18deg) !important;
}

.dropdown-content {
  position: absolute;
  display: none;
  top: 40px;
  left: 28%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  transform: skewX(18deg) !important;
  background-image: linear-gradient(0deg, #0E5FFF 0%, rgba(28, 0, 255, 0) 100%);
}

.dropdown-contents {
  left: 10%;
}

.dropdown-content a {
  color: #19ECFF;
  width: 80px;
  font-size: 20px;
  font-weight: 500;
  line-height: 38px;
  text-align: center;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #0E5FFF;
  color: #f1f1f1;
}

.select {
  opacity: 1;
}

.button:hover {
  opacity: 1;
}

.button:hover .dropdown-content {
  display: block;
}

.active {
  opacity: 1;
}
</style>
