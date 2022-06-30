import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

// Element Plus引入
import 'element-plus/dist/index.css'  // 引入 ElementPlus 组件样式
// 图标和组件引入
import ElementPlus from 'element-plus';   // 引入 ElementPlus 组件
import { Edit } from '@element-plus/icons-vue'  // 按需引入 Icon 图标

const app = createApp(App)

// 全局注册 Icon 图标
app.component('element-icon', Edit)
app.use(ElementPlus)

// 路由
app.use(router)

axios.defaults.baseURL = "https://0xffff.xn--6qq986b3xl"

// 每次请求都带上token
axios.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
});

// 拦截未登录的请求
axios.interceptors.request.use(config => {
        if (localStorage.getItem("token")) {
            config.headers.Authorization = localStorage.getItem("token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    });

app.config.globalProperties.$http = axios

app.mount('#app')

