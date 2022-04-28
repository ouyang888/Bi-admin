<template>
  <template v-if="component == 'DataBigCard'">
    <DataBigCard :inner="inner" @updateData='updateData' />
    <DataBigCard :inner="outer" @updateData='updateData' />
  </template>

  <template v-else-if="component == 'DataBigCardInfo'">
    <DataBigCardInfo :inner="inner" @updateData='updateData' title="线上" />
    <DataBigCardInfo :inner="outer" @updateData='updateData' title="线下" />
  </template>

  <template v-else-if="component == 'DataProCard'">
    <DataProCard v-for="(v,k) in cardData" :key="k" :info="v" @updateData='updateData' />
  </template>
  <template v-else>
    <DataCard v-for="(v,k) in cardData" :key="k" :info="v" @updateData='updateData' />
  </template>

</template>

<script>
  import { reactive, ref, defineComponent, computed, toRefs, watch } from 'vue'
  import { useStore } from 'vuex'
  import DataCard from './DataCard.vue'
  import DataBigCard from './DataBigCard.vue'
  import { createInnerDirect, createOuterDirect } from '@/assets/utils/common.js'
  import { cardData } from '@/assets/js/static.js'
  import DataBigCardInfo from './DataBigCardInfo.vue'
  import DataProCard from './DataProCard.vue'
  import { useRouter } from "vue-router";

  export default defineComponent({
    name: 'cardCompose',
    props: {
      cardArr: {
        type: Array
      }
    },
    components: {
      DataCard,
      DataBigCard,
      DataBigCardInfo,
      DataProCard
    },
    setup(props, { emit }) {
      const Route = useRouter();
      const data = reactive({
        name: 'CardCompose',
        cardData: [{}],
        inner: {}, //内销
        outer: {}, // 外销
      })
      const Store = useStore()
      // data.currentPath.sessionStorage.getItem('toPath')
      let path = ref('')
      let component = ref('')
      component = 'DataBigCard'
      let shop = ref('')
      let currentTitle = ref('')
      shop = ['环境', '烹饪', '电磁', '调理', '电动', '饮品']
      // let cardList = ref('')

      path = computed(() => {
        return Store.state.currentPath;
      })
      data.inner = computed(() => {
        return Store.state.innerDirect;
      })

      data.outer = computed(() => {
        return Store.state.outerDirect;
      })

      data.cardData = computed(() => {
        return Store.state.cardList
      })

      let bigPath = 's,saleDir' // 大卡片
      let towPath = 'domestic,exprot' // 二级卡片

      const methods = {

        updateData(val) {
          Route.push(val)
        }

      }

      currentTitle = computed(() => {
        return Store.state.currentTitle
      })

      watch(currentTitle, (newValue, oldValue) => {
        console.log('更新title')
        if (newValue.length > 0) {
          currentTitle = ',' + newValue
        } else {
          currentTitle = ''
        }
        //  currentTitle = newValue
      })
      let productPath = ['domesticOnLineSales', 'domesticOffLineSales', 'exprotAreaProductCo', 'exprotProductCo', 'productCo', 'domesticProductCoOffline', 'exprotAreaProductCo', 'domesticOnLineShopCo']
      watch(path, (newValue, oldValue) => {

        console.log('更新路由123', newValue)
        if (newValue == 's' || newValue == 'saleDir') {
          component = 'DataBigCard'
        } else if (newValue == 'domestic' || newValue == 'exprot') {
          component = 'DataBigCardInfo'
        } else {
          component = 'DataCard'
        }


        productPath.forEach(v => {
          if (v == newValue) {
            component = 'DataProCard'
          }
        })



        // data.inner.forEach(v => {   // 销向汇总
        //   v.info.directName = '内销'
        //   v.info.path = 'domestic'
        // });

        // data.outer.forEach(v => {
        //   v.info.directName = '外销'
        //   v.info.path = 'exprot'
        // });

        // Store.commit('setInnerDirect', data.inner)
        // Store.commit('setOuterDirect', data.outer)




        // if (newValue == 'domestic') {
        //   let innerDirect = JSON.parse(JSON.stringify(cardData.innerDirect));
        //   innerDirect.forEach(v => {   // 内销汇总
        //     v.info.directName = '线上'
        //     v.info.path = 'domesticOnLine'
        //   });

        //   let outerDirect = JSON.parse(JSON.stringify(cardData.outerDirect));
        //   outerDirect.forEach(v => {
        //     v.info.directName = '线下'
        //     v.info.path = 'domesticOffLine'
        //   });
        //   Store.commit('setInnerDirect', innerDirect)
        //   Store.commit('setOuterDirect', outerDirect)
        // }

        // if (newValue == 'domesticOnLine') {  //线上汇总



        //   // component = 'DataCard'
        //   let cardData = [
        //     { title: '京东', path: 'domesticOnLinePlatform' },
        //     { title: '淘系', path: 'domesticOnLinePlatform' },
        //     { title: '拼多多', path: 'domesticOnLinePlatform' },
        //     { title: '美的平台', path: 'domesticOnLinePlatform' },
        //     { title: '兴趣电商', path: 'domesticOnLinePlatform' },
        //     { title: '天猫运营', path: 'domesticOnLinePlatform' }
        //   ]
        //   Store.commit("setCardList", cardData)
        // }
        //  线上模块

        if (newValue == 'domesticOnLinePlatform') { //合作模式三汇总 内销-线上-平台汇总页（按平台类型）

          if (!!typeof (currentTitle)) {
            currentTitle = ''
          }

          Store.dispatch("getCard", { code: 'offlinePlatformLe3', date: '2022-02' + currentTitle })

        }

        if (newValue == 'domesticOnLineShop') {  // 合作模式三负责人

          if (!!typeof (currentTitle)) {
            currentTitle = ''
          }

          Store.dispatch("getCard", { code: 'cooperModel3TopStoreTotal', date: '2022-02' + currentTitle })
        }
        if (newValue == 'domesticOnLineShopCo') {  // 合作模式四负责人
          if (!!typeof (currentTitle)) {
            currentTitle = ''
          }

          Store.dispatch("queryrightShopData", { code: 'cooperModel4CategoryTopTotal', code2: 'cooperModel4TopSAB', date: '2022-02' + currentTitle })

        }

        /*线上模块 end*/

        // 线下模块

        if (newValue == 'domesticOffLineChannel') {  //内销-线下   三级	合作模式二负责人	顶部：合作模式三汇总

          if (!!typeof (currentTitle)) {
            currentTitle = ''
          }

          Store.dispatch("getCard", { code: 'level3OfflineTopTotal', date: '2022-02' + currentTitle })

        }
        if (newValue == 'domesticOffLineSales') {  //内销-线下 四级	平台店铺	顶部：店铺汇总

          if (!!typeof (currentTitle)) {
            currentTitle = ''
          }

          Store.dispatch("queryrightShopData", { code: 'cooperModel3TopbusinessEntityName', date: '2022-02' + currentTitle })
        }



        // 线下模块end


        if (newValue == 'domesticOffLineChannel') {  //内销-线上-单平台店铺负责人页 三级

          let onPath = 'domesticOffLineSales'
          data.cardData.forEach((v, i) => {
            let cardData = ['佛山-苏宁', '广州-苏宁', '阳江-苏宁', '待定', '待定', '待定']
            // let cardData =  ['苏宁', '国美', '特渠', '待定', '待定', '待定']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'domesticOffLineSales') {  //内销-业务员页

          let onPath = 'domesticOnLineSales'
          data.cardData.forEach((v, i) => {
            let cardData = ['破壁机', '豆浆机', '绞肉机', '电磁炉', '果汁杯', '厨师机']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }




        // 线下业务员

        // if (newValue == 'domesticOnLineSales') {

        //   if (!!typeof (currentTitle)) {
        //     currentTitle = ''
        //   }

        //   Store.dispatch("queryrightShopData", { code: 'level5alesManDirectTotal', date: '2022-02' + currentTitle })
        // }



        if (newValue == 'domesticProductCoOffline') {  //内销-线下总产司页

          let onPath = 'domesticProductCoOffline'
          data.cardData.forEach((v, i) => {
            let cardData = ['环境', '烹饪', '电磁', '调理', '电动', '饮品']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)


        }

        // if (newValue == 'domesticProductCoOnline') { //内销-线上总产司页

        //   let onPath = 'domesticOnLinePlatform'
        //   data.cardData.forEach((v, i) => {
        //     let cardData = ['京东自营', '京东企业', '京东POP', '京东新通路', '京东代理', '其他']
        //     v.title = cardData[i]
        //     v.path = onPath
        //   })
        //   Store.commit("setCardList", data.cardData)
        // }

        // if (newValue == 'domesticOnLinePlatform') { // 内销-线上-平台汇总页（按平台类型）
        //   let onPath = 'domesticOnLineShop'
        //   data.cardData.forEach((v, i) => {
        //     let cardData = ['京东自营', '京东企业', '京东POP', '京东新通路', '京东代理', '其他']
        //     // let cardData = ['京东旗舰店', '拍拍优品', '环境旗舰店', '生活专卖店', '拼购旗舰店', '其他']
        //     v.title = cardData[i]
        //     v.path = onPath
        //   })
        //   Store.commit("setCardList", data.cardData)
        // }

        // if (newValue == 'domesticOnLinePlatformCo') {
        //   let onPath = 'domesticOnLinePlatformCo'
        //   data.cardData.forEach((v, i) => {
        //     let cardData = ['京东旗舰店', '拍拍优品', '环境旗舰店', '生活专卖店', '拼购旗舰店', '其他']
        //     v.title = cardData[i]
        //     v.path = onPath
        //   })
        //   Store.commit("setCardList", data.cardData)
        // }



        if (newValue == 'productCo') {//品类汇总页面

          let onPath = 'domesticOnLinePlatformCo'
          data.cardData.forEach((v, i) => {
            let cardData = ['台扇', '循环扇', '无叶风扇', '空净化类', '挂烫类', '塔扇']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'productCoAll') { //产司汇总页面

          let onPath = 'productCo'
          data.cardData.forEach((v, i) => {
            let cardData = ['环境', '烹饪', '电磁', '调理', '电动', '饮品']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'domesticOffLine') {   //线下汇总

          // let onPath = 'domesticOffLineChannel'  //三级

          let onPath = 'domesticOffLinePlace'
          data.cardData.forEach((v, i) => {
            let cardData = ['特渠', '下沉', '分中心', '新渠道', '待定', '待定'];
            v.title = cardData[i]
            v.path = onPath
          })

          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'domesticOffLinePlace') { //内销-线下-渠道汇总页 二级

          // let onPath = 'domesticOffLineChannel'
          let onPath = 'domesticOffLineSales'
          data.cardData.forEach((v, i) => {
            let cardData = ['苏宁', '国美', '特渠', '待定', '待定', '待定']
            // let cardData = ['KA', 'TOP', 'V200', '待定', '待定', '待定']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }
        if (newValue == 'domesticOffLinePlaceCo') { //内销-线下-渠道汇总页

          let onPath = 'domesticOffLinePlaceCo'
          data.cardData.forEach((v, i) => {
            let cardData = ['环境', '烹饪', '电磁', '调理', '电动', '饮品']
            v.cooprLevel3 = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }


        if (newValue == 'domesticOnLineShop') {  //内销-线上-单平台店铺负责人页

          let onPath = 'domesticOnLineShopCo'
          data.cardData.forEach((v, i) => {
            let cardData = ['京东旗舰店', '拍拍优品', '环境旗舰店', '生活专卖店', '拼购旗舰店', '其他']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }
        if (newValue == 'domesticOnLineShopCo') {  //内销-线上-单平台店铺负责人页

          let onPath = 'domesticOnLineShopCo'
          data.cardData.forEach((v, i) => {
            let cardData = shop
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'domesticOffLineChannel') {  //内销-线上-单平台店铺负责人页 三级

          let onPath = 'domesticOffLineSales'
          data.cardData.forEach((v, i) => {
            let cardData = ['佛山-苏宁', '广州-苏宁', '阳江-苏宁', '待定', '待定', '待定']
            // let cardData =  ['苏宁', '国美', '特渠', '待定', '待定', '待定']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }
        if (newValue == 'domesticOnLineSales' || newValue == 'domesticOffLineSales') {  //内销-业务员页

          let onPath = 'domesticOnLineSales'
          data.cardData.forEach((v, i) => {
            let cardData = ['破壁机', '豆浆机', '绞肉机', '电磁炉', '果汁杯', '厨师机']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        // if (newValue == 'domesticOffLineSales') {   //内销-线下-业务员页

        //   let onPath = 'domesticOffLineSales'
        //   data.cardData.forEach((v, i) => {
        //     let cardData = ['KA', 'TOP', 'V200', '待定', '待定', '待定']
        //     v.title = cardData[i]
        //     v.path = onPath
        //   })
        //   Store.commit("setCardList", data.cardData)
        // }

        if (newValue == 'exprot') {   //外销

          data.inner.forEach(v => {   // 
            v.info.directName = '南美区-张莱欧'
            v.info.path = 'exprotAreaAll'
          });

          data.outer.forEach(v => {
            v.info.directName = '北美区-李林'
            v.info.path = 'exprotAreaAll'
          });

          Store.commit('setInnerDirect', data.inner)
          Store.commit('setOuterDirect', data.outer)
        }

        if (newValue == 'exprotAreaAll') { //外销- 区域

          let onPath = 'exprotProductCo' // 外销产司
          data.cardData.forEach((v, i) => {
            let cardData = ['巴西', '阿根廷', '哥伦比亚', '智利', '美国', '墨西哥']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'exprotSalesProductCo') { //外销- 产司

          let onPath = 'exprotSalesProductCo'
          data.cardData.forEach((v, i) => {
            let cardData = shop
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'exprotArea') { //外销-区域页

          let onPath = 'exprotArea'
          data.cardData.forEach((v, i) => {
            let cardData = ['区域客户', '区域客户', '区域客户', '待定', '待定', '待定']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'exprotSales') {  //外销-业务员页

          let onPath = 'exprotSales'
          data.cardData.forEach((v, i) => {
            let cardData = ['韩国', '美国', '日本', '新加坡', '越南', '马来西亚']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'exprotAreaProductCo') { //外销-区域-产司页

          let onPath = 'exprotAreaProductCo'
          data.cardData.forEach((v, i) => {
            let cardData = ['环境', '烹饪', '电磁', '调理', '电动', '饮品']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }

        if (newValue == 'exprotProductCo') { //外销-产司页

          let onPath = 'exprotProductCo'
          data.cardData.forEach((v, i) => {
            let cardData = ['环境', '烹饪', '电磁', '调理', '电动', '饮品']
            v.title = cardData[i]
            v.path = onPath
          })
          Store.commit("setCardList", data.cardData)
        }




      }, { immediate: true })

      return {
        ...toRefs(data), ...methods, component
      }
    }
  })
</script>

<style scoped>

</style>