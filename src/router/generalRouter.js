// eslint-disable-next-line no-unused-vars
import {createRouter, createWebHashHistory} from 'vue-router';
import Authenticator from "@/components/Authenticator";
import Main from "@/components/Main.vue";
import Mobile from "@/components/Mobile.vue";

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
import MobileAuth from "@/components/mobile/MobileAuth";
import MobileHome from "@/components/mobile/MobileHome";
import MobileCart from "@/components/mobile/MobileCart";
import MobileOrder from "@/components/mobile/MobileOrder";
import MobileMe from "@/components/mobile/MobileMe";

import Rider from "@/components/Rider"
import NoticeCenter from "@/components/waiter/NoticeCenter";
import CallingCenter from "@/components/waiter/CallingCenter";
import MobileAccountSettings from "@/components/mobile/MobileAccountSettings";
import AvatarSetting from "@/components/mobile/AvatarSetting";
import SecuritySetting from "@/components/mobile/SecuritySetting";
import PhoneNumberSetting from "@/components/mobile/PhoneNumberSetting";
import CancellationSetting from "@/components/mobile/CancellationSetting";
import UserNameSetting from "@/components/mobile/UserNameSetting";
// import axios from "axios";

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
                    path: '/dashboard/kitchen',
                    name: 'kitchen-dashboard',
                    components: {
                        default: kitchen,
                        'content-right': WaiterStatistics,
                    },
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                },
                {
                    path: '/dashboard/front',
                    name: 'front-dashboard',
                    components: {
                        default: waiterDashBoard,
                        'content-right': WaiterStatistics,
                    },
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: true},
                },

                {
                    path: '/dashboard/rider',
                    name: 'rider-dashboard',
                    components: {
                        default: Rider,
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
                    path: 'notice/waiter',
                    name: 'notice-waiter',
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: false},
                    components: {
                        default: NoticeCenter,
                        'content-right': WaiterStatistics,
                    },
                },
                {
                    path: 'calling/waiter',
                    name: 'calling-waiter',
                    // TODO:暂时打上false，后期改为true
                    meta: {authRequired: false},
                    components: {
                        default: CallingCenter,
                        'content-right': WaiterStatistics,
                    },
                },
                {
                    path: '/front',
                    name: 'front',
                    components: {
                        default: Front,
                        'content-right': WaiterStatistics,
                    },
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
                    components: {
                        default: kitchen,
                        'content-right': WaiterStatistics,
                    },
                },
                {
                    path: '/user',
                    name: 'user',
                    components: {
                        default: user,
                        'content-right': WaiterStatistics,
                    },
                },
                {
                    path: '/notice',
                    name: 'notice',
                    components: {
                        default: notice,
                        'content-right': WaiterStatistics,
                    },
                },
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            meta: {authRequired: false},
            component: Authenticator,
        },
        // 以下部分都位于移动端
        {
            path: '/rider',
            name: 'rider',
            component: Rider,
        },
        {
            path: '/m/auth',
            name: 'Mobile-auth',
            meta: {authRequired: false},
            component: MobileAuth
        },
        {
            path: '/m',
            name: 'Mobile',
            meta: {authRequired: true},
            component: Mobile,
            children: [
                {
                    path: '/m/home',
                    name: 'MobileHome',
                    meta: {keepAlive: true, authRequired: true},
                    component: MobileHome,
                },
                {
                    path: '/m/cart',
                    name: 'MobileCart',
                    meta: {keepAlive: true, authRequired: true},
                    component: MobileCart,
                },
                {
                    path: '/m/order',
                    name: 'MobileOrder',
                    meta: {authRequired: true},
                    component: MobileOrder,
                },
                {
                    path: '/m/me',
                    name: 'MobileMe',
                    meta: {authRequired: true},
                    component: MobileMe,
                },
                {
                    path: '/m/me/settings',
                    name: 'MobileSettings',
                    meta: {authRequired: true},
                    component: MobileAccountSettings,
                },
                {
                    path: '/m/me/settings/avatar',
                    name: 'AvatarSetting',
                    meta: {authRequired: true},
                    component: AvatarSetting,
                },
                {
                    path: '/m/me/settings/username',
                    name: 'UserNameSetting',
                    meta: {authRequired: true},
                    component: UserNameSetting,
                },
                {
                    path: '/m/me/settings/security',
                    name: 'SecuritySetting',
                    meta: {authRequired: true},
                    component: SecuritySetting
                },
                {
                    path: '/m/me/settings/phone',
                    name: 'PhoneNumberSetting',
                    meta: {authRequired: true},
                    component: PhoneNumberSetting
                },
                {
                    path: '/m/me/settings/cancellation',
                    name: 'CancellationSetting',
                    meta: {authRequired: true},
                    component: CancellationSetting
                },

            ]
        },
    ]
});

//路由守卫
router.beforeEach((to, from, next) => {
    // 由于dashboard需要判断角色，所以在这里先特殊处理
    if (to.path === '/dashboard') {
        if (sessionStorage.getItem('token') === null) {
            next({
                path: '/auth',
                query: {redirect: to.fullPath}
            });
        } else {
            let role = sessionStorage.getItem('role');
            next('/dashboard/' + role);
        }
    }
    // 判断是否需要登录权限
    if (to.meta.authRequired === true) {
        // TODO:生产环境需要添加token验证
        // next();
        // 判断是否已经登录
        const token = sessionStorage.getItem('token');
        if (token) {
            next()
        } else {
            if (to.path.split('/')[1] === 'm') {
                next({
                    path: '/m/auth',
                    query: {redirect: to.fullPath}
                });
            }
            next({
                path: '/auth',
                query: {redirect: to.fullPath}
            })
        }
    } else next();
});

export default router;

