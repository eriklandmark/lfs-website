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

@Component({
    components: {},
})
export default class GdprCookieBanner extends Vue {
    show = false;

    mounted() {
        const is_bot = /bot|google|baidu|bing|msn|teoma|slurp|yandex/i.test(navigator.userAgent)
        if (this.getCookie('analytics-tracking') == null && process.env.NODE_ENV === 'production' && !is_bot) {
            this.show = true;
        }
    }

    accept() {
        this.show = false
        this.$gtag.optIn()
        this.setCookie('analytics-tracking','true',30)
    }

    deny() {
        this.show = false
        this.$gtag.optOut()
        this.setCookie('analytics-tracking', 'false', 30)
    }

    setCookie(cname: string, cvalue: string, exdays: number) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname: string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
</script>

<style lang="scss">

</style>
