<template>
  <div class="warp">
    <div class="panel">
      <SadmeterPanel />
    </div>
    <div class="product">
      <CardCompose />
    </div>
    <EchartCardBox @updateCharts="updateCharts" />

    <TableCardBox />
    <div>
    </div>
  </div>

</template>

<script>
  import { onMounted, onUnmounted, reactive, toRefs,computed,toRaw } from 'vue'
  import SadmeterPanel from './componets/panel/SadmeterPanel.vue'
  import CardCompose from '@/views/componets/card/CardCompose.vue'
  import EchartCardBox from '@/views/componets/EchartCardBox.vue'
  import TableCardBox from '@/views/componets/table/TableCardBox.vue'

  import { useStore } from 'vuex'
  // import {useRouter, useRoute} from 'vue-router'
  export default {
    name: 'Index',
    components: {
      SadmeterPanel,
      CardCompose,
      EchartCardBox,
      TableCardBox,
    },

    setup() {
      let data = reactive({
        DataCard: 'DataCard',
        EchartCard: 'EchartCard'
      })

      const methods = {
        updateCharts(val) {
          Store.dispatch('getChartData', { days: val })
        }
      }
      const Store = useStore()
      Store.dispatch('getPageData',{path: Store.state.currentPath})
      // Store.dispatch('getCardData')
      // Store.dispatch('getChartData')
      // Store.dispatch('getTableList')
      // Store.dispatch('getPanel')
 
      onMounted(() => {
      })
      onUnmounted(() => {
      })
      return {
        ...toRefs(data), ...methods
      }
    }
  }
</script>

<style scoped>
  .warp {
    /* height: 949px; */
    padding-top: 30px;
    background-color: #02004D;
    box-sizing: border-box;
  }

  .panel {
    position: absolute;
    top: 8.9%;
    padding-bottom: 30px;
    /* left: 2.3%; */
  }

  .product {
    /* width: 1082px; */
    /* height: 283px; */
    margin-left: 40.5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>