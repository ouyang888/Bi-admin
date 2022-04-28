<template>
  <div class="header">
    <div class="nav">
      <div class="left">
        <span class="back" @click="()=>router.go(-1)"><i class="el-icon-arrow-left"></i>后退</span>
        <span>当前页面:{{currentPath}}</span>
        <!-- <span>上午好：{{'徐旻锋!'}}</span> -->
      </div>
      <div class="right">
        <span>打印
          <img src="@/assets/print.png" alt="">
        </span>
        <span>导出数据
          <img src="@/assets/upload.png" alt="">
        </span>
      </div>
      <!-- <div class="right">
        <el-popover
          placement="bottom"
          :width="320"
          trigger="click"
          popper-class="popper-user-box"
        >
          <template #reference>
            <div class="author">
              <i class="icon el-icon-s-custom" />
              {{ userInfo && userInfo.nickName || '' }}
              <i class="el-icon-caret-bottom" />
            </div>
          </template>
          <div class="nickname">
            <p>登录名：{{ userInfo && userInfo.loginUserName || '' }}</p>
            <p>昵称：{{ userInfo && userInfo.nickName || '' }}</p>
            <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
          </div>
        </el-popover>
      </div> -->
    </div>
    <span class="title">生活电器数智产销中台</span>

    <div class="bottom">

    </div>
    <div class="left-bottom">
      <LeftMenu @menuEmitClick="menuEmitClick"  />
    </div>
    <div class="right-bottom">
      <RightMenu @menuEmitClick="menuEmitClick" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, defineComponent, watch, computed,ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/utils/axios'
import {useStore} from 'vuex'
import { localRemove } from '@/utils'
import LeftMenu from '@/components/LeftMenu.vue'
import RightMenu from '@/components/RightMenu.vue'
import MenuButton from './MenuButton.vue'
export default defineComponent ({
  name: 'Header',
  components: {
    LeftMenu,
    RightMenu
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      name: 'dashboard',
      userInfo: null,
      hasBack: false
    })
    const menuEmitClick = (params)=> {
      // console.log(params,'颠倒拉');
      // if (!params.item) {
        switch(params.name) {
          case 's':
            pageActive(params.name)
            btnActive('direction')
            router.push('s')
          break;
          case 'psi':
            pageActive(params.name)
            btnActive('direction')
            router.push('psi')
          break;
          
          // default:
          //   router.push('s')
        } 
      // } else {

        switch(params.name) {
          case 'co':
            btnActive(params.name)
            if (route.value === 's') {
              router.push('productCoAll')
            } else if(route.value === 'exprot'){
               router.push('exprotAreaProductCo')
            }
          break;
          case 'direction':
            btnActive(params.name)
             if (route.value === 'productCoAll') {
              router.push('s')
            } else if(route.value === 'exprotAreaProductCo'){
              pageActive('s')
              router.push('exprot')
            }
          break;
          case 'money':
            pageItemActive(params.name)
          break;
          case 'number':
            pageItemActive(params.name)
          break;
          default:
            // router.push('s')
        } 
      // }  

    }
    let pageActive = (name)=>{
      let btns = document.querySelectorAll('.page')
        btns.forEach(btn => {
        if(String(btn.id) ===name){ 
          btn.className = 'button active page'
        }else{
          btn.className = ['button page']
        }
      });
    }
    let btnActive = (name)=>{
      let btns = document.querySelectorAll('.menuItem')
      console.log(btns,'menuItemmenuItemmenuItemmenuItem');
      btns.forEach(btn => {
        if(String(btn.id) === name){ 
          btn.className = 'button active menuItem'
        }else{
          btn.className = ['button menuItem']
        }
      });
    }
    let pageItemActive = (name)=>{
      let btns = document.querySelectorAll('.pageItem')
      btns.forEach(btn => {
        if(String(btn.id) === name){ 
          btn.className = 'button active pageItem'
        }else{
          btn.className = ['button pageItem']
        }
      });
    }
    const Store = useStore()
    let route = computed(()=>Store.state.currentPath)
    watch(route,(newVal)=>{
      getPageName(newVal)

      if (newVal==='s') {
        pageActive('s')
        btnActive('direction')
        pageItemActive('money')
      }
    })
    onMounted(() => {
      const pathname = window.location.hash.split('/')[1] || ''
      if (!['login'].includes(pathname)) {
        getUserInfo()
      }
    })
    const getUserInfo = async () => {
      const userInfo = await axios.get('/adminUser/profile')
      state.userInfo = userInfo
    }
    const logout = () => {
      axios.delete('/logout').then(() => {
        localRemove('token')
        window.location.reload()
      })
    }
    let currentPath = ref('')
    let getPageName = (path)=> {
      switch (path) {
        case 'psi':
          currentPath.value = '总裁PSI页'
          break;
        case 's':
          currentPath.value = '销向汇总页'

          break;
        case 'productCoAll':
          currentPath.value = '产司汇总页'

          break;
        case 'saleDir':
          currentPath.value = '销向汇总页'
          break;
        case 'productCo':
          currentPath.value = '品类汇总'

          break;
        case 'domestic':
        currentPath.value = '内销汇总'

          break;
        case 'exprot':
          currentPath.value = '外销汇总'
          break;
        case 'domesticOnLine':
          currentPath.value = '内销线上汇总页'
          break;
        case 'domesticOffLine':
          currentPath.value = '内销线下汇总页'

          break;
        case 'domesticProductCoOnline':
          currentPath.value = '内销线下汇总页'

          break;
        case 'domesticProductCoOffline':
                    currentPath.value = '内销线下产司汇总页'

          break;
        case 'exprotAreaAll':
                            currentPath.value = '外销大区汇总页'

          break;
        case 'exprotProductCo':
                            currentPath.value = '外销大区产司汇总页'

          break;
        case 'domesticOnLinePlatform':
        
          break;
        case 'domesticOffLinePlace':
          break;
        case 'domesticOnLinePlatformCo':
          break;
        case 'domesticOffLinePlaceCo':
      
          break;
        case 'domesticProductCoOnline':
          break;
        case 'domesticProductCoOffline':
          break;
        case 'exprotArea':
           currentPath.value = '外销区域汇总页'
          break;
        case 'exprotAreaProductCo':
                                      currentPath.value = '外销区域产司汇总页'

          break;
        case 'domesticOnLineShop':
      
          break;
        case 'domesticOffLineChannel':
        
          break;
        case 'domesticOnLineSales':
        
          break;
        case 'domesticOffLineSales':
          break;
        case 'exprotSales':
          currentPath = '外销业务员页'

          break;
        default:
          currentPath = 'S销向页'
      }
    }
    const back = () => {
      router.back()
    }

    return {
      ...toRefs(state),
      logout,
      menuEmitClick,
      router,
      back,
      btnActive,
      pageActive,
      currentPath,
      getPageName
    }
  }
})
</script>

<style scoped>
  .header {
    /* padding-left: 10px; */
    height: 81px;
    width: 100%;
    position: relative;
    background: linear-gradient(180deg, #162770 0%, #1C2B72 41%, #0D182E 100%);
    /* clip-path: polygon(0 0, 100% 0, 100% 44%, 76% 44%, 74.3% 100%, 34.3% 100%, 32.4% 44%, 0 44%); */

  }
  .nav {
    height: 33px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .title{
    font-size: 36px;
    font-weight: 600;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .left {
    font-weight: 400;
    color: #FFFFFF;
    /* line-height: 28px; */
    letter-spacing: 3px;
    display: flex;
    font-size: 18px;
    align-items: center;
  }
  .left .back{
    margin-left: 15px;
    font-size: 18px;
    color: #19ECFF;
    cursor: pointer;
    margin-right: 16px;
  }
  .left-button {
    width: 80px;
    height: 38px;
    text-align: center;
    font-size: 20px;
    transform: skewX(-30deg);
    background: linear-gradient(180deg, #0E5FFF 0%, rgba(28, 0, 255, 0) 100%);
    border: 2px solid;
    border-color: #0E5FFF;
    color: #FFF;
  }
  .right {
    margin-top: 8px;
    margin-right: 1.4%;
    font-size: 14px;
    color: #19ECFF;
    letter-spacing: 0;
    text-align: center;
    font-weight: 500;
  }
  .right span {
    cursor: pointer;
  }
  .right :first-child {
    margin-right: 8px;
  }
  .middle{
    display: flex;
    justify-content: center;
  }
  .bottom {
    height: 52px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-image: url('@/assets/navIcon.svg');
    background-repeat:no-repeat;
    background-position: 52% 92%;
    
  }
  .left-bottom{
    width: 50%;
    height: 50px;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items:flex-end
  }
  .right-bottom{
    /* width: 50%; */
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 72%;
    display: flex;
    align-items:flex-end
  }
 
</style>
<style>
  .popper-user-box {
    background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat!important;
    background-size: cover!important;
    border-radius: 0!important;
  }
  .popper-user-box .nickname {
    position: relative;
    color: #ffffff;
  }
  .popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>