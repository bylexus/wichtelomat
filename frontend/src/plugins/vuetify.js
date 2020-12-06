import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import de from 'vuetify/es5/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { de },
        current: 'de',
    },
    icons: {
        iconfont: 'fa',
    },
    theme: {
        themes: {
            light: {
                primary: colors.pink.accent3,
            },
        },
    },
});
