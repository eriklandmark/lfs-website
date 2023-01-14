<template lang="pug">
    v-snackbar(multi-line v-model='show' color="white" light bottom timeout="-1")
        v-card(flat)
            v-card-title {{ $t("cookie_banner.title") }}
            v-card-text.text--black {{ $t("cookie_banner.description") }}
                router-link(to="/privacy-policy") {{ $t("cookie_banner.learn_more") }}.
            v-card-actions(v-if="!$vuetify.breakpoint.mdAndUp")
                v-spacer
                v-btn(text @click="deny") {{ $t("cookie_banner.deny") }}
                v-btn.ml-6(color='accent' dark @click="accept") {{ $t("cookie_banner.accept") }}
        template(v-if="$vuetify.breakpoint.mdAndUp" v-slot:action='{ attrs }')
            v-btn(text='' v-bind='attrs' @click="deny") {{ $t("cookie_banner.deny") }}
            v-btn.mx-6(color='accent' dark v-bind='attrs' @click="accept") {{ $t("cookie_banner.accept") }}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CookiesHandler from "@/lib/CookiesHandler";

@Component({})
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