import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Activate from '@/views/Activate.vue';
import WichtelAnlass from '@/views/WichtelAnlass.vue';
import { getStore } from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/activate/:activationHash',
            component: Activate,
            meta: {
                hideSignUp: true,
            },
        },
        {
            path: '/anlass/:id',
            name: 'anlass',
            component: WichtelAnlass,
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    const store = getStore();
    const user = store.state.user;

    if (!user && to.meta.requiresAuth) {
        next('/');
    } else {
        next();
    }
});

export default router;
