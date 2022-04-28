<template>
  <div :style="{ transform: styles }" class="button">
    <span :style="{ transform: textStyle }" class="text">{{ name }}</span>
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
  },
  setup(props, context) {
    const Store = useStore();

    onUpdated(() => {
      console.log(Store.menuName, "StoreStoreStore");
    });
    let styles = ref(0);
    function handleType(props) {
      if (props.type === 1) {
        return "skewX(18deg)";
      } else if (props.type === 2) {
        return "skewX(-18deg)";
      }
    }

    function handleText(type) {
      if (type === 1) {
        return "skewX(-18deg)";
      } else if (type === 2) {
        return "skewX(18deg)";
      }
    }
    styles = handleType(props);
    let textStyle = handleText(props.type);

    return {
      //必须返回 模板中才能使用
      styles,
      textStyle,
    };
  },
});
</script>

<style scoped>

.button {
  width: 60px;
  height: 38px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: 2px solid #00f9ff;
  opacity: 0.5;
  background-image: linear-gradient(0deg, #0e5fff 0%, rgba(28, 0, 255, 0) 100%);
}
.button:nth-child(5) {
  width: 110px;
}
.button:nth-child(6) {
  width: 110px;
}
.text {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: #19ecff;
  line-height: 38px;
  text-align: center;
  position: absolute;
  /* transform: skewX(-18deg) !important; */
}
.select {
  opacity: 1;
}
.button:hover {
  opacity: 1;
}
.active {
  opacity: 1;
}
</style>
