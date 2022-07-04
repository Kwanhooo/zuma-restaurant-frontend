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

//TODO:模拟存一个token
sessionStorage.setItem('token', '123456');
//TODO:模拟存一个用户角色为waiter
sessionStorage.setItem('role', 'waiter');

// 路由守卫
generalRouter.beforeEach((to, from, next) => {
    if (to.path ==='/dashboard'){
        let role = sessionStorage.getItem('role');
        next('/dashboard/'+role);
    }
    // 判断是否需要登录权限
    if (to.meta.authRequired === true) {
        // 判断是否已经登录
        const token = sessionStorage.getItem('token');
        if (token) {
            //TODO:token有效性验证，暂时不开
            // axios.get('/api/validate?token='+token).then(res => {
            //     if (res.data.code === 0) {
            //       // token有效，跳到首页
            //       this.$router.push('/');
            //     } else {
            //       // token无效，清除假token
            //       localStorage.removeItem('token');
            //       this.$router.push('/auth');
            //     }
            // });
            next()
        } else {
            next({
                path: '/auth',
                query: {redirect: to.fullPath}
            })
        }
    } else next();
});

app.use(generalRouter)


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

