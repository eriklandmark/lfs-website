import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import VueGtag from "vue-gtag";
import i18n from './i18n'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);


const vuetify = new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: "#1E90FF",
                secondary: "#C8C8C8",
                accent: "#032040",
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
    lang: {
        // @ts-ignore
        t: (key, ...params) => i18n.t(key, params),
    }
});


Vue.use(VueGtag, {
    config: {
        id: process.env.VUE_APP_GA_ID,
    },
    enabled: false,
}, router);

new Vue({
    router,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')
