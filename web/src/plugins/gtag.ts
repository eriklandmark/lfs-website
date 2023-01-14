import Vue from "vue";
import VueGtag from "vue-gtag";
import router from "@/plugins/router";

Vue.use(VueGtag, {
    config: {
        id: process.env.VUE_APP_GA_ID,
    },
    enabled: false,
}, router);