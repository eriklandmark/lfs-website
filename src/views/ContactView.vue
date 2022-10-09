<template lang="pug">
    .contact-view
        v-container
            v-row.my-16(align="center" )
                v-col(cols="12" md="6")
                    h2 Du kan nå oss på
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
                                v-list-item-title +46 00 000 0000
                        v-list-item
                            v-list-item-icon
                                v-icon(large) mdi-email
                            v-list-item-content
                                v-list-item-title
                                    a(href="mailto:info@luleafs.se") info@luleafs.se
                v-col(cols="12" md="6")
                    h2 Sociala Medier
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

            v-row.my-16(align="center")
                v-col(cols="12")
                    h2.mb-4 Kontakta oss nedan
                    v-form
                        v-text-field(label="Namn" outlined color="accent" )
                        v-text-field(label="E-post" outlined color="accent")
                        v-text-field(label="Ämne" outlined color="accent")
                        v-textarea(label="Meddelande" outlined color="accent")
                        v-btn(color="accent") Skicka

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class ContactView extends Vue {

}
</script>

<style lang="scss">
a {
    text-decoration: none !important;
}

</style>
