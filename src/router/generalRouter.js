// eslint-disable-next-line no-unused-vars
import {createRouter, createWebHashHistory} from 'vue-router';
import Authenticator from "@/components/Authenticator";
import Main from "@/components/Main.vue";
import Order from "@/components/waiter/Order.vue";
import waiterDashBoard from "@/components/waiter/WaiterDashBoard";
import kitchen from "@/components/kitchen/Kitchen";
import user from "@/components/kitchen/User";
import notice from "@/components/kitchen/Notice";

import Front from "@/components/Front.vue"
import Front_ViewOrder from "@/components/front/ViewOrder.vue"
import Front_ViewUser from "@/components/front/ViewUser.vue"
import Front_ViewNotice from "@/components/front/ViewNotice"
import WaiterStatistics from "@/components/waiter/WaiterStatistics";
import WaiterCart from "@/components/waiter/WaiterCart";

import Front_CheckOut from "@/components/front/CheckOut"
import Front_ViewFood from "@/components/front/ViewFood"
import Front_ViewEvaluation from "@/components/front/ViewEvaluation"

const router = createRouter({
    history: createWebHashHistory(),
    // mode: 'history',
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
                    components: {
                        default: waiterDashBoard,
                        'content-right': WaiterStatistics,
                    },
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                },
                {
                    path: '/order',
                    name: 'order',
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                    components: {
                        default: Order,
                        'content-right': WaiterCart,
                    },
                },
                {
                    path: '/user/waiter',
                    name: 'waiter-me',
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                    components: {
                        default: user,
                        'content-right': WaiterStatistics,
                    },
                },
                {
                    path: '/front',
                    name: 'front',
                    component: Front,
                    children: [
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
                        },
                        {
                            path: '/front/checkOut',
                            name: 'front-checkOut',
                            component: Front_CheckOut,
                        },
                        {
                            path: '/front/viewFood',
                            name: 'front-viewFood',
                            component: Front_ViewFood,
                        },
                        {
                            path: '/front/viewEvaluation',
                            name: 'front-viewEvaluation',
                            component: Front_ViewEvaluation,
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

