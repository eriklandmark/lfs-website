import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import vuetify from '@/vuetify'
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
    config: {
        id: process.env.VUE_APP_GA_ID,
    },
    enabled: process.env.NODE_ENV === 'production',
}, router);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
