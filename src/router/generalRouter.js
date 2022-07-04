import {createRouter, createWebHashHistory} from 'vue-router';
import Authenticator from "@/components/Authenticator";
import Main from "@/components/Main.vue";
import Order from "@/components/waiter/Order.vue";
import Me from "@/components/waiter/Me.vue";
import waiterDashBoard from "@/components/waiter/WaiterDashBoard";
import kitchen from "@/components/kitchen/Kitchen";
import user from "@/components/kitchen/User";
import notice from "@/components/kitchen/Notice";

import Front from "@/components/Front.vue"
import Front_ViewOrder from "@/components/front/ViewOrder.vue"
import Front_ViewUser from "@/components/front/ViewUser.vue"
import Front_ViewNotice from "@/components/front/ViewNotice"
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
                {
                    path: '/me',
                    name: 'me',
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                    component: Me
                },
                {
                    path: '/front',
                    name: 'front',
                    component: Front,
                    children:[
                        {
                            path: '/front/viewOrder',
                            name: 'front-viewOrder',
                            component: Front_ViewOrder,
                        },
                        {
                            path: '/front/viewUser',
                            name: 'front-viewUser',
                            component: Front_ViewUser,
                        },
                        {
                            path: '/front/viewNotice',
                            name: 'front-viewNotice',
                            component: Front_ViewNotice,
                        }
                    ]
                },
                {
                    path: '/kitchen',
                    name: 'kitchen',
                    component: kitchen
                },
                {
                    path: '/user',
                    name: 'user',
                    component: user
                },
                {
                    path: '/notice',
                    name: 'notice',
                    component: notice
                },
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            meta: {authRequired: false},
            component: Authenticator
        },
    ]
});

export default router;

