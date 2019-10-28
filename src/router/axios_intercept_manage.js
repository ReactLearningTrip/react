// axiosSetting.js
import axios from 'axios'
import { message } from 'antd';
import history from 'router/history'

axios.defaults.baseURL = HOST;
// axios.defaults.baseURL = HOST1;
// axios.defaults.baseURL = HOST2;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

// axiosSetting.js
// request拦截器
axios.interceptors.request.use(
    config => {
        
        config={
            ...config,
            // url:'/api'+config.url,
            headers:{
                ...config.headers,
                // 'Content-Type': 'application/json; charset=utf-8',
            }
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// respone拦截器
axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        let response=error.response || {};
        let {status,data:{message:message_data}}=response
        message.error(message_data,5)
        return Promise.reject(error)
      }
    )