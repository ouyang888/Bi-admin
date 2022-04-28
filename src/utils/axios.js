import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { localGet } from './index'
import config from '~/config'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
// axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 携带 cookie，
axios.defaults.withCredentials = true
// 请求头，headers 信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['Accept'] = '*/*'
// axios.defaults.headers['Accept-Encoding'] = 'gzip, deflate'
// axios.defaults.headers['Connection'] = 'keep-alive'

// 默认 post 请求，使用 application/json 形式
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//设置cookies
axios.defaults.timeout = 10000
// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
  if (!res) {
    ElMessage.error('服务端异常！')
    return Promise.reject(res)
  }
  if (res.status!= 200) {
    if (res.data.msg) ElMessage.error(res.data.msg)
    if (res.data.code == 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  } else {
    return Promise.resolve(res.data)
  }
})

export default axios