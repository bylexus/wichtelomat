import Vue from 'vue';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import router from '@/routes';
import App from '@/App.vue';
import { apiCall, setCsrfToken } from '@/lib';

Vue.config.productionTip = false;

// Before we start, we fetch the session info from the backend:

(async function () {
    let res = await apiCall('/sessionInfo.json');
    if (res.csrf_token) {
        setCsrfToken(res.csrf_token);
    }
    new Vue({
        router,
        vuetify,
        render: (h) => h(App),
    }).$mount('#app');
})();
