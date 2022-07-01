import {createRouter, createWebHashHistory} from 'vue-router';
import Authenticator from "@/components/Authenticator";
import Main from "@/components/Main.vue";
import Order from "@/components/waiter/Order.vue";
import waiterDashBoard from "@/components/waiter/WaiterDashBoard";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            meta: {authRequired: true},
            children: [
                {
                    path: '/dashboard/waiter',
                    name: 'waiter-dashboard',
                    component: waiterDashBoard,
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                },
                {
                    path: '/order',
                    name: 'order',
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                    component: Order
                },
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            component: Authenticator
        },
    ]
});

export default router;

