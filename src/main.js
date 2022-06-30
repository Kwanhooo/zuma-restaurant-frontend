import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

const app = createApp(App)

app.use(router)

axios.defaults.baseURL = "https://0xffff.xn--6qq986b3xl"

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
