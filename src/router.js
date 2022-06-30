import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: () => import('./components/Authenticator.vue')
        }
    ]
});

export default router;

