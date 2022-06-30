import {createRouter, createWebHashHistory} from 'vue-router';
import App from "@/App.vue";
import Authenticator from "@/components/Authenticator";
import Home from "@/components/Home.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'root',
            component:App
        },
        {
            path: '/auth',
            name: 'auth',
            component:Authenticator
        },
        {
            path: '/home',
            name: 'home',
            component:Home
        }
    ]
});

export default router;

