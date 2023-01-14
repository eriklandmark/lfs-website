import Vue, {markRaw} from 'vue'
import App from '@/App.vue'
import '@/plugins/service_worker'
import "@/plugins/firebase";
import pinia, {afterInstall} from '@/plugins/pinia'
import router from '@/plugins/router'
import '@/plugins/gtag'
import i18n from '@/plugins/i18n'
import vuetify from "@/plugins/vuetify";
import "@/plugins/apex_charts";

afterInstall()

new Vue({
    router,
    i18n,
    vuetify,
    pinia,
    render: h => h(App)
}).$mount('#app')
