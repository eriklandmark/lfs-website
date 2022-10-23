<template lang="pug">
    v-app
        v-app-bar(app
            color="white"
            :height="$vuetify.breakpoint.mdAndUp? 100:56"
            :extension-height="search_store.show_search ? 100 : 0"
            extension-transition="fade-transition"
            :extended="search_store.show_search")
            v-app-bar-nav-icon(@click="drawer = !drawer" v-if="$vuetify.breakpoint.smAndDown")
                v-icon mdi-menu
            v-img(src="/images/logos/logo-light.png"
                contain
                width="150px"
                alt="LFS Logo"
                max-height="60%"
                eager
                style="margin-left: 5vw"
                @click="$router.push('/')")
            template(v-if="$vuetify.breakpoint.mdAndUp")
                v-tabs(right color="accent" style="margin-right: 2vw")
                    v-tabs-slider
                    v-tab(to="/") {{ $t("main_title_tabs.home_tab") }}
                    v-tab(to="/about") {{ $t("main_title_tabs.about_tab") }}
                    v-tab(to="/recruitment") {{ $t("main_title_tabs.recruitment_tab") }}
                    v-tab(to="/contact") {{ $t("main_title_tabs.contact_tab") }}

                v-btn.mr-8(icon @click="search_store.show_search = !search_store.show_search")
                    v-icon mdi-magnify

            v-btn(v-if="$vuetify.breakpoint.smAndDown" icon @click="search_store.show_search = !search_store.show_search")
                v-icon mdi-magnify

            v-btn-toggle(
                v-if="$vuetify.breakpoint.mdAndUp"
                mandatory
                v-model="language"
                style="margin-right: 5vw"
                rounded)
                v-btn(value="en")
                    v-img(src="/images/flags/en_flag.png" width="24" contain alt="English")
                v-btn(value="sv")
                    v-img(src="/images/flags/sv_flag.png" width="24" contain alt="Svenska")

            template(v-if="search_store.show_search" v-slot:extension)
                v-row(align="center" justify="center")
                    v-col(:cols="$vuetify.breakpoint.mdAndUp? 6:12")
                        v-text-field(v-model="search"
                            tile
                            color="accent"
                            :placeholder="$t('search.placeholder')"
                            single-line
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            append-outer-icon="mdi-arrow-right"
                            clearable
                            autofocus
                            @click:append-outer="do_search()"
                            @keyup.enter="do_search()")
        gdpr-cookie-banner
        v-navigation-drawer(v-if="$vuetify.breakpoint.smAndDown" v-model="drawer" app clipped fixed temporary)
            v-list
                v-list-item(to="/")
                    v-list-item-icon
                        v-icon mdi-home
                    v-list-item-content
                        v-list-item-title {{ $t("main_title_tabs.home_tab") }}
                v-list-item(to="/about")
                    v-list-item-icon
                        v-icon mdi-account
                    v-list-item-content
                        v-list-item-title {{ $t("main_title_tabs.about_tab") }}
                v-list-item(to="/contact")
                    v-list-item-icon
                        v-icon mdi-email
                    v-list-item-content
                        v-list-item-title {{ $t("main_title_tabs.contact_tab") }}

            v-row.mt-4(justify="center" )
                v-btn-toggle(
                    mandatory
                    v-model="language"
                    style="margin-right: 5vw"
                    rounded)
                    v-btn(value="en")
                        v-img(src="/images/flags/en_flag.png" width="24" contain alt="English")
                    v-btn(value="sv")
                        v-img(src="/images/flags/sv_flag.png" width="24" contain alt="Svenska")
        v-main(app min-height="calc(100vh - 100px)")
            router-view
        v-footer(app dark color="primary" min-height="250" absolute)
            v-container.mt-8
                v-row
                    v-col(cols="12" md="3")
                        v-img(src="/images/logos/logo-dark.png" max-height="70%" contain alt="LFS Logo")
                    v-col(cols="12" md="3")
                        h3 {{ $t("footer.contact_title") }}
                        span Mail:
                            a.ml-1(href="mailto:info@luleafs.se" style="color: white") info@luleafs.se
                        br
                        //span Mobil:
                            a.ml-1(href="tel:+46700000000" style="color: white") 0700-000 000
                        //br

                    v-col(cols="12" md="3")
                        h3 {{ $t("footer.resources_title") }}
                        router-link(to="/privacy-policy" style="color: white") Privacy Policy

                    v-col(cols="12" md="3")
                        h3 {{ $t("footer.credits_title") }}
                        a(href="https://www.vecteezy.com/free-vector/icons" style="color: white") Icons Vectors by Vecteezy

                v-row.mt-4(align="center" justify="center")
                    span(style="text-align: center") © 2022 Luleå Formula Student (LFS)
                        wbr
                        |  | Version {{ version }}

</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import GdprCookieBanner from "@/components/GdprCookieBanner.vue";
import {search_store} from "@/stores/search_store";

@Component({
    components: {GdprCookieBanner},
})
export default class App extends Vue {
    search_store = search_store()
    drawer = false;
    search = '';
    language = 'sv';

    get version() {
        return process.env.VUE_APP_VERSION
    }

    beforeMount() {
        if (this.$route.path === '/search') {
            this.search_store.show_search = true
        }
    }

    @Watch('language')
    onLanguageChanged() {
        this.$i18n.locale = this.language;
    }

    do_search() {
        if (this.$route.path !== '/search') {
            this.$router.push({path: '/search', query: {q: this.search}});
        } else {
            this.search_store.search_query = this.search;
            this.search_store.search()
        }
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

.center-img {
    display: grid;
    place-items: center;
}
</style>
