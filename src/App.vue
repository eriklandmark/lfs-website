<template lang="pug">
    v-app
        v-app-bar(app
        color="white"
            height="100"
            :extension-height="show_search ? 100 : 0"
            extension-transition="fade-transition"
            :extended="show_search")
            v-app-bar-nav-icon(@click="drawer = !drawer" v-if="$vuetify.breakpoint.xs")
                v-icon mdi-menu
            v-img(src="/images/logos/logo-light.png"
                width="150"
                contain
                alt="LFS Logo"
                max-height="60%"
                style="margin-left: 5vw")
            template(v-if="$vuetify.breakpoint.smAndUp")
                v-tabs(right color="accent" style="margin-right: 2vw")
                    v-tab(v-for="item in items" :key="item.title" :to="item.to") {{ item.title }}

                v-btn(icon style="margin-right: 5vw" @click="show_search = !show_search")
                    v-icon mdi-magnify

            v-btn(v-if="$vuetify.breakpoint.xs" icon @click="show_search = !show_search")
                v-icon mdi-magnify

            template(v-if="show_search" v-slot:extension)
                v-row(align="center" justify="center")
                    v-col(cols="6")
                        v-text-field(v-model="search"
                            tile
                            color="accent"
                            label="Search"
                            single-line
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            append-outer-icon="mdi-arrow-right"
                            clearable
                            autofocus
                            @click:append-outer="do_search()"
                            @keyup.enter="do_search()")
        gdpr-cookie-banner
        v-navigation-drawer(v-if="$vuetify.breakpoint.xs" v-model="drawer" app clipped fixed temporary)
            v-list
                v-list-item(v-for="item in items", :key="item.title", :to="item.to")
                    v-list-item-icon
                        v-icon {{ item.icon }}
                    v-list-item-content
                        v-list-item-title {{ item.title }}
        v-main(app min-height="calc(100vh - 100px)")
            router-view
        v-footer(app dark color="primary" min-height="250" absolute)
            v-container.mt-8
                v-row
                    v-col(cols="12" md="4")
                        v-img(src="/images/logos/logo-dark.png" contain alt="LFS Logo" height="100px" style="margin-left: 5vw")
                    v-col(cols="12" md="4")
                        h3 Om Oss
                        span Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.
                    v-col(cols="12" md="4")
                        h3 Kontakta oss
                        span Mail:
                            a.ml-1(href="mailto:info@luleafs.se" style="color: white") info@luleafs.se
                        br
                        span Mobil:
                            a.ml-1(href="tel:+46700000000" style="color: white") 0700-000 000
                v-row(align="center" justify="center")
                    span © 2022 Luleå Formula Student

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import GdprCookieBanner from "@/components/GdprCookieBanner.vue";

@Component({
    components: {GdprCookieBanner},
})
export default class App extends Vue {
    drawer = false;
    search = '';
    show_search = false;

    items = [
        {title: 'Hem', icon: 'mdi-home', to: '/'},
        {title: 'Om Oss', icon: 'mdi-home', to: '/about'},
        {title: 'Kontakta oss', icon: 'mdi-home', to: '/contact'},
    ];

    do_search() {
        this.search = ""
    }
}
</script>

<style lang="scss">

$body-font-family: 'Raleway', sans-serif;

html {
    min-height: 100vh;
    overflow: auto !important;
    font-family: "Raleway", sans-serif !important;
}

.v-application {
    [class*='text-'], [class*='font-'] {
        font-family: $body-font-family, sans-serif !important;
    }

    .font-weight-bold {
        font-weight: 700 !important;
    }

    .font-weight-regular {
        font-weight: 400 !important;
    }

    font-family: $body-font-family, sans-serif !important;
}

.app-bar-cont {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
