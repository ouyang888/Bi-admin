<template>
  <div class="menu-ui">
    <div class="left">
      <MenuButton class="button page" @click="menuClick('psi')" id="psi" :name="'PSI'" />
      <MenuButton class="button page" @click="menuClick('s')" id="s" :name="'S'" />
      <MenuButton class="button page" @click="menuClick('i')" id="i" :name="'I'"/>
      <MenuButton class="button page" @click="menuClick('p')"  id="p" :name="'P'"/>
      <MenuButton class="button pageItem" @click="menuClick('money')" id="money" :name="'金额版'"/>
      <MenuButton class="button pageItem" @click="menuClick('number')"  id="number" :name="'数量版'"/>
    </div>
  </div>    
</template>

<script>
import {reactive,ref, defineComponent, onMounted} from 'vue'
import { useStore } from 'vuex'
import MenuButton from './MenuButton.vue'
export default defineComponent({
  name: 'LeftMenu',
  props: [],
  components: {
    MenuButton
  },
  emits:['menuEmitClick'],
  setup(props,{emit}){
  
    const Store = useStore()

    function menuClick(params,isPage=true){
      let obj = {
        name: params,
        item: true
      }
      emit('menuEmitClick',obj)
      if (params === 'money') {
        Store.commit('setCurrentModel','money')
      } else if (params === 'number') {
        Store.commit('setCurrentModel','number')
      }
      // if (isPage) {
      //   Store.commit('pageGo', {name: params.name})
      // } else {
      //   Store.commit('setItemName', {name: params.name})
      // }
    }
    onMounted(()=>{
    })
  return { //必须返回 模板中才能使用
   menuClick
  }
 }
})

</script>

<style scoped>
.button {
  margin-left: 11px;
}
.button:nth-child(6){
  margin-left: 0px;
}
.button{
  transform: skewX(18deg) !important;
}
.button span{
  transform: skewX(-18deg) !important;
}

</style>
