import {createApp} from 'vue'
import App from './App.vue'
import generalRouter from './router/generalRouter.js'

import axios from "axios";

// Element Plus引入
import 'element-plus/dist/index.css' // 引入 ElementPlus 组件样式
// 图标和组件引入
import ElementPlus from 'element-plus'; // 引入 ElementPlus 组件
import {Edit} from '@element-plus/icons-vue' // 按需引入 Icon 图标

const app = createApp(App)

// 全局注册 Icon 图标
app.component('element-icon', Edit)
app.use(ElementPlus)

//TODO:模拟清空
// sessionStorage.clear();
//TODO:模拟存一个token
// sessionStorage.setItem('token', '123456');
//TODO:模拟存一个用户角色为waiter
// sessionStorage.setItem('role', 'waiter');
//TODO:模拟存一个桌号
// sessionStorage.setItem('tableID', '4');

// 路由守卫
// 移动到generalRouter.js了

// 注册路由
app.use(generalRouter)

//TODO:baseurl暂时不用
axios.defaults.baseURL = "/api";

// 每次请求都带上token
axios.interceptors.request.use(config => {
        if (sessionStorage.getItem("token")) {
            config.headers.token = sessionStorage.getItem("token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

//如果http响应码为500，则跳转到登录页面
axios.interceptors.response.use(response => {
        if (response.status === 500) {
            window.location.href = "/login.html";
        }
        return response;
    }
    , error => {
        return Promise.reject(error);

    }
);


// 全局axios实例
app.config.globalProperties.$http = axios

app.mount('#app')

