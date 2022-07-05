// eslint-disable-next-line no-unused-vars
import {createRouter, createWebHashHistory} from 'vue-router';
import Authenticator from "@/components/Authenticator";
import Main from "@/components/Main.vue";
import Order from "@/components/waiter/Order.vue";
import Me from "@/components/waiter/Me.vue";
import waiterDashBoard from "@/components/waiter/WaiterDashBoard";
import Front from "@/components/Front.vue"
import Front_ViewOrder from "@/components/front/ViewOrder.vue"
import Front_ViewUser from "@/components/front/ViewUser.vue"
import Front_ViewNotice from "@/components/front/ViewNotice"
import WaiterStatistics from "@/components/waiter/WaiterStatistics";
import WaiterCart from "@/components/waiter/WaiterCart";

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
                    path: '/me',
                    name: 'me',
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                    components: {
                        default: Me,
                        'content-right': WaiterStatistics,
                    },
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
                }
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

