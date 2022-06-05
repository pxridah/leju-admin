import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

import router from '@/router'
import { getToken, clearAll } from '@/utils/myAuth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = token
    }
    // 参数统一放到data中
    if (config.method.toLowerCase() === 'get') {
      config.params = config.data
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data

    if (res.code !== 20000) {
      if (res.code === 20002) {
        // 登录过期
        MessageBox.confirm('登录已失效,是否重新登录', '登录提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          clearAll()
          router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
