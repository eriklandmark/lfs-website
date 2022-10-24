<template lang="pug">
    .contact-view
        v-container
            v-row.my-8(align="center" justify="center" )
                v-col(cols="12" md="6")
                    h2 {{$t('contact.reach_us')}}
                    v-list
                        v-list-item
                            v-list-item-icon
                                v-icon(large) mdi-map-marker
                            v-list-item-content
                                v-list-item-title Luleå Tekniska Universitet
                                v-list-item-subtitle Luleå, Sverige
                        v-list-item
                            v-list-item-icon
                                v-icon(large) mdi-phone
                            v-list-item-content
                                v-list-item-subtitle {{$t('contact.phone-number')}}
                                v-list-item-title +46 00 000 0000

                        v-list-item
                            v-list-item-icon
                                v-icon(large) mdi-email
                            v-list-item-content
                                v-list-item-subtitle {{$t('contact.email')}}
                                v-list-item-title
                                    a(href="mailto:info@luleafs.se") info@luleafs.se
                v-col(cols="12" md="6")
                    h2 {{$t('contact.social_media')}}
                    v-list
                        v-list-item
                            v-list-item-icon
                                v-icon(large) mdi-facebook
                            v-list-item-content
                                a(href="https://www.facebook.com/luleaformulastudent" target="_blank") Luleå Formula Student
                        v-list-item
                            v-list-item-icon
                                v-icon(large) mdi-instagram
                            v-list-item-content
                                a(href="https://www.instagram.com/luleaformulastudent/" target="_blank") @luleaformulastudent
                        v-list-item
                            v-list-item-icon
                                v-icon(large) mdi-linkedin
                            v-list-item-content
                                a(href="https://www.linkedin.com/company/lule%C3%A5-formula-student/about/" target="_blank") LFS Luleå Formula Student
            h2.mb-5 {{$t('contact.contact_board')}}
            v-row.mb-8
                v-col(v-for="member in board" cols="12" md="4" :key="member.name")
                    v-card
                        v-card-title {{member.title}}
                        v-card-subtitle.pb-0 {{member.name}}
                        v-card-text.pb-9()

                            template(v-if="member.email")
                                br
                                span(style="float:left") {{$t('contact.email')}}
                                a.ml-1(:href="'mailto:' + member.email" style="float: right") {{member.email}}
                            template(v-if="member.phonenumber")
                                br
                                span(style="float:left") {{$t('contact.phone-number')}}
                                a.ml-1(:href="'tel:' + member.phonenumber" style=style = "float: right") {{member.phonenumber}}
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class ContactView extends Vue {
    board = [
        {
            name: "Jacob Höglund",
            title: this.$t("about.team.titles.project-leader").toString(),
            email: "jacob.hoglund@luleafs.se",
        },
        /*{
            name: "Samuel Höglund",
            title: this.$t("about.team.titles.technical-leader").toString(),
        },*/
        {
            name: "Erik Landmark",
            title: this.$t("about.team.titles.technical-leader").toString(),
            email: "erik.landmark@luleafs.se"
        },
        {
            name: "Max Wiberg",
            title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.administration.title").toString()}`,
            email: "max.wiberg@luleafs.se",
        },
        /*{
            name: "Fabian Dalenius",
            title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.aerodynamics.title").toString()}`,
        },
        {
            name: "Louise Lööf",
            title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.chassis.title").toString()}`,
        },
        {
            name: "Alec Berkien",
            title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.vehicle-dynamics.title").toString()}`,
        },
        {
            name: "David Englund",
            title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.power-train.title").toString()}`,
        }*/]
}
</script>

<style lang="scss">
a {
    text-decoration: none !important;
}

</style>
