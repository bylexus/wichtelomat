import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Activate from '@/views/Activate.vue';

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
    ],
});

export default router;
