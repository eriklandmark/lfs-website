<template lang="pug">
    v-snackbar(multi-line v-model='show' color="white" light bottom timeout="-1")
        v-card(flat)
            v-card-title Vi använder kakor
            v-card-text.text--black Vi använder analytiska kakor för att förstå hur besökare interagerar med webbplatsen. Dessa cookies hjälper till att ge information om mätvärden som antalet besökare, avvisningsfrekvens, trafikkälla, etc.
        template(v-slot:action='{ attrs }')
            v-btn(text='' v-bind='attrs' @click="deny") Neka
            v-btn.mx-8(color='accent' dark v-bind='attrs' @click="accept") Gå vidare

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CookiesHandler from "@/lib/CookiesHandler";

@Component({
    components: {},
})
export default class GdprCookieBanner extends Vue {
    show = false;

    beforeMount() {
        const is_bot = /bot|google|baidu|bing|msn|teoma|slurp|yandex/i.test(navigator.userAgent)

        if (CookiesHandler.getCookie('analytics-tracking') == null
            && process.env.NODE_ENV === 'production'
            && process.env.hasOwnProperty("VUE_APP_ENV")
            && process.env.VUE_APP_ENV === "release"
            && !is_bot ) {
            this.show = true;
        } else if (CookiesHandler.getCookie('analytics-tracking') == "true") {
            this.$gtag.optIn()
        }
    }

    accept() {
        this.show = false
        this.$gtag.optIn()
        this.$gtag.event('accept_gdpr')
        CookiesHandler.setCookie('analytics-tracking','true',30)
    }

    deny() {
        this.show = false
        this.$gtag.optOut()
        CookiesHandler.setCookie('analytics-tracking', 'false', 30)
    }
}
</script>

<style lang="scss">

</style>
