<template lang="pug">
    .about
        v-card.no-rounded-corners(dark flat)
            parallax(src="/images/profile_pictures/whole_team.avif" height="300" offset-y="-7vw" )
                v-container(fill-height)
                    v-row()
                        v-col.center-text(cols="12" md="12")
                            h1 {{$t('about.title')}}
        v-container
            v-row(align="center")
                v-col(cols="12" md="12")
                    .my-5 {{$t('about.description')}}
            v-row(justify="center" ).px-10.mb-8
                v-col(cols="11" lg="8" xl="7" md="7" sm="10")
                    v-row(justify="center")
                        v-col.expand-on-hover(cols="12" sm="6" md="6" lg="4" xl="4")
                            v-card.team-card.no-rounded-corners(color="accent" dark to="/about/board")
                                v-container(fill-height)
                                    v-row
                                        v-col.center-text(cols="12" md="12")
                                            //v-icon mdi-account
                                            h2 {{board.title}}
            v-row(justify="center").px-10.mb-8
                v-col(cols="11" lg="8" xl="7" md="7" sm="10")
                    h1.center-text {{$t('about.team.title')}}
                    v-row.mt-4(justify="center")
                        v-col.expand-on-hover(v-for="team in teams" :key="team.title" cols="12" sm="6" md="6" lg="4" xl="4")
                            v-card.no-rounded-corners.team-card(color="accent" dark :to="'/about/' + team.href")
                                v-container(fill-height)
                                    v-row
                                        v-col.center-text(cols="12" md="12")
                                            //v-icon mdi-account
                                            h2 {{team.title}}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Parallax from "@/components/Parallax.vue";

@Component({
    components: {Parallax},
})
export default class AboutView extends Vue {
    get board() {
        return {
            title: this.$t("about.team.board.title").toString(),
            about: this.$t("about.team.board.description").toString(),
            href: "board",
            avatar: "/images/profile_pictures/board/board.avif",
        }
    }

    get teams() {
        return [
            {
                title: this.$t("about.team.administration.title").toString(),
                about: this.$t("about.team.administration.description").toString(),
                href: "administration",
                avatar: "",
            },
            {
                title: this.$t("about.team.aerodynamics.title").toString(),
                about: this.$t("about.team.aerodynamics.description").toString(),
                href: "aerodynamics",
                avatar: "",
            },
            {
                title: this.$t("about.team.chassis.title").toString(),
                about: this.$t("about.team.chassis.description").toString(),
                href: "chassis",
                avatar: "",
            },
            {
                title: this.$t("about.team.low-voltage.title").toString(),
                about: this.$t("about.team.low-voltage.description").toString(),
                href: "low-voltage",
                avatar: "",
            },
            {
                title: this.$t("about.team.power-train.title").toString(),
                about: this.$t("about.team.power-train.description").toString(),
                href: "power-train",
                avatar: "",
            },
            {
                title: this.$t("about.team.vehicle-dynamics.title").toString(),
                about: this.$t("about.team.vehicle-dynamics.description").toString(),
                href: "vehicle-dynamics",
                avatar: "",
            }
        ]
    }
}
</script>

<style lang="scss" scoped>
.team-card {
    aspect-ratio: 1/1;
    width: 100%;
}
</style>
