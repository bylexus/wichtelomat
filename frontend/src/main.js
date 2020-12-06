import Vue from 'vue';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import router from '@/routes';
import App from '@/App.vue';
import { apiCall, setCsrfToken } from '@/lib';
import { storeFactory } from '@/store';

Vue.config.productionTip = false;

// Before we start, we fetch the session info from the backend:

(async function () {
    let sessionInfo = await apiCall('/sessionInfo.json');
    if (sessionInfo.csrf_token) {
        setCsrfToken(sessionInfo.csrf_token);
    }
    new Vue({
        router,
        vuetify,
        store: storeFactory({
            user: sessionInfo.user,
        }),
        render: (h) => h(App),
    }).$mount('#app');
})();
