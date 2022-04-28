<template>
  <div class="layout">
    <Header />
    <div class="main" v-if="isLoading">
      <router-view />
    </div>
    <!-- <el-container v-if="state.showMenu" class="container">
      <div class="main">
            <router-view></router-view>
      </div>
      <el-container class="content">
        
      </el-container>
    </el-container>
    <el-container  v-else class="content">
        <div class="main">
          <router-view />
        </div>
      </el-container> -->
  </div>
</template>

<script>
import { onUnmounted, reactive, computed, ref, watch } from 'vue'
import Header from '@/components/Header.vue'
import { useRouter , useRoute} from 'vue-router'
import { localGet } from '@/utils'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    Header
  },
  setup() {
    const noMenu = ['/login']
    const router = useRouter()
    const route = useRoute()
    // 监听浏览器原生回退事件
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', () => {
        if (!localGet('token')) {
        }
      }, false);
    }
    const Store = useStore()

    let isLoading = ref(0)
    const unwatch = router.beforeEach((to, from, next) => {
      isLoading.value = false 
      if (to.path == '/login') {
        // 如果路径是 /login 则正常执行
        next()
      } else {
        // 如果不是 /login，判断是否有 token
        // if (!localGet('token')) {
        //   // 如果没有，则跳至登录页面
        //   next({ path: '/login' })
        // } else {
          // 否则继续执行
          next()
        // }
      }
      Store.commit('setPath',{path: to.name})
      document.title = '智慧BI数据显示' 
    })
    router.afterEach(()=>{
      isLoading.value = true 

    })
    router.push('/s')
    onUnmounted(() => {
      unwatch()
    })
    return {
      route,
      isLoading
    }
  }
}
</script>

<style scoped>
  .layout {
    /* min-height: 100vh; */
    height: 1070px;
    width: 1900px;
    /* overflow: hidden; */
    background-color: #ffffff;

  }
  
  .main {
    height: 999px;
    background-color: #02004D;
    padding:10px;
  }

</style>

<style>
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    /* overflow-x: hidden; */
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
 
</style>
