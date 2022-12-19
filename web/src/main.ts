import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import VueGtag from "vue-gtag";
import i18n from './i18n'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { createPinia, PiniaVuePlugin } from 'pinia'
import {search_store} from "@/stores/search_store";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
});

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

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


router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    if(from.path === "/search" && to.path !== "/search") {
        search_store().show_search = false
    }
    next()
})

new Vue({
    router,
    vuetify,
    i18n,
    pinia,
    render: h => h(App)
}).$mount('#app')
