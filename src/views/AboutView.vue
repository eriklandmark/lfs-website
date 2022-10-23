<template lang="pug">
    .home
        v-container
            v-row.my-8(align="center" )
                v-col(cols="12" md="12")
                    h1 {{ $t('about.title') }}
                    span {{$t('about.description')}}

            v-row.my-8.mb-4.mtt-title
                v-col
                    h1 {{$t('about.team.title')}}

                .meet-the-team
                    .mtt-tabs
                        v-tabs(v-model="tab" color="accent" :vertical="$vuetify.breakpoint.smAndUp" show-arrows)
                            v-tab(v-for="team in mtt_data" :key="team.title" :href="'#' + team.href") {{ team.title }}

                    div
                        v-tabs-items(v-model="tab")
                            v-tab-item(v-for="team in mtt_data" :key="team.title", :value="team.href" )
                                v-card(flat)
                                    v-card-title.font-weight-bold {{ team.title }}
                                    v-card-text(style="color: black !important") {{team.about}}
                                    .avatars.my-6.mx-4
                                        .avatar(v-for="member in team.members" :key="member.name")
                                            v-img(v-if="member.avatar !== 'none'"
                                                :src="member.avatar"
                                                :alt="member.name"
                                                width="180"
                                                height="200px"
                                                contain)
                                            .none-avatar(v-else)
                                                v-icon(x-large) mdi-account
                                            .ml-1.mt-2
                                                span.font-weight-bold(style="font-size: 1.2em;") {{ member.name }}
                                                br
                                                span(style="font-size: 1.1em;") {{ member.title }}

            v-row.my-8(align="center" )
                v-col(cols="12" md="12")
                    h1 {{$t('about.history.title')}}
                    span {{$t('about.history.description')}}
                    v-timeline(:dense='$vuetify.breakpoint.smAndDown')
                        v-timeline-item(color='accent' fill-dot left)
                            template(v-slot:opposite)
                                h3 {{ $t('about.history.2022_autumn.title') }}
                            v-card
                                v-card-text(style="color: black !important") {{ $t('about.history.2022_autumn.description') }}
                        v-timeline-item(color='accent' fill-dot right)
                            template(v-slot:opposite)
                                h3 {{ $t('about.history.2022_summer.title') }}
                            v-card
                                v-card-text(style="color: black !important") {{ $t('about.history.2022_summer.description') }}
                        v-timeline-item(color='accent' fill-dot left)
                            template(v-slot:opposite)
                                h3 {{ $t('about.history.before_2022.title') }}
                            v-card
                                //v-card-text
                                    v-img(src="/images/cars/car-empty.jpg" contain alt="" max-height="250px")
                                v-card-text(style="color: black !important") {{ $t('about.history.before_2022.description') }}
                                v-card-text(style="color: black !important")
                                    span.font-weight-bold {{ $t('about.history.car_specs.title') }}
                                    br
                                    span {{ $t('about.history.car_specs.weight', {weight: 195.5}) }}
                                    br
                                    span {{ $t('about.history.car_specs.engine', {engine: "Yamaha YXFR6"}) }}
                                    br
                                    span {{ $t('about.history.car_specs.hp', {hp: 98}) }}
                                    br
                                    span {{ $t('about.history.car_specs.torque', {torque: 68}) }}
                                    br
                                    span {{ $t('about.history.car_specs.zeroToHundred', {zeroToHundred: 3.6}) }}
                                    br
                                    span {{ $t('about.history.car_specs.topSpeed', {topSpeed: 135}) }}
                                    br

            v-row
                v-row.my-16(align="center" )
                    v-col(cols="8" md="8")
                        h1.mb-4 {{$t('about.links.title')}}
                        ul
                            li(v-for="link in links" :key="link.title")
                                a(:href="link.href" target="_blank") {{ link.title }}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class AboutView extends Vue {

    tab = "board";

    links = [
        {
            title: "https://www.nyteknik.se/fordon/studenter-start-your-engines-6413179",
            href: "https://www.nyteknik.se/fordon/studenter-start-your-engines-6413179"
        },
        {
            title: "https://rejsa.nu/forum/viewtopic.php?t=28732",
            href: "https://rejsa.nu/forum/viewtopic.php?t=28732"
        }
    ]

    mounted() {
        if (this.$route.query.hasOwnProperty("tab")) {
            this.tab = this.$route.query.tab.toString()
            this.$vuetify.goTo(".mtt-title")
        }
    }

    get mtt_data() {
        return [
            {
                title: this.$t("about.team.board.title").toString(),
                about: this.$t("about.team.board.description").toString(),
                href: "board",
                members: [
                    {
                        name: "Jacob Höglund",
                        title: this.$t("about.team.titles.project-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Samuel Höglund",
                        title: this.$t("about.team.titles.technical-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Erik Landmark",
                        title: this.$t("about.team.titles.technical-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Sannah Engelin",
                        title: `${this.$t("about.team.titles.hr-manager").toString()}`,
                        avatar: "none"
                    },
                    {
                        name: "Max Wiberg",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.administration.title").toString()}`,
                        avatar: "none"
                    },
                    {
                        name: "Fabian Dalenius",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.aerodynamics.title").toString()}`,
                        avatar: "none"
                    },
                    {
                        name: "Louise Lööf",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.chassis.title").toString()}`,
                        avatar: "none"
                    },
                    {
                        name: "Alec Berkien",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.vehicle-dynamics.title").toString()}`,
                        avatar: "none"
                    },
                    {
                        name: "David Englund",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.power-train.title").toString()}`,
                        avatar: "none"
                    },
                    {
                        name: "Vakant",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.low-voltage.title").toString()}`,
                        avatar: "none"
                    },
                ]
            },
            {
                title: this.$t("about.team.administration.title").toString(),
                about: this.$t("about.team.administration.description").toString(),
                href: "administration",
                members: [
                    {
                        name: "Max Wiberg",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Emilia Forsström",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Fabian Schön",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Idris Wongkum",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }
                ]
            },
            {
                title: this.$t("about.team.aerodynamics.title").toString(),
                about: this.$t("about.team.aerodynamics.description").toString(),
                href: "aerodynamics",
                members: [
                    {
                        name: "Fabian Dalenius",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Douglas Briggert",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Emma Söderberg",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Elias Saief Ennasser",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Arvid Roos",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }
                ]
            },
            {
                title: this.$t("about.team.chassis.title").toString(),
                about: this.$t("about.team.chassis.description").toString(),
                href: "chassis",
                members: [
                    {
                        name: "Louise Lööf",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Albin Lundvall",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Ahmad Mufleh",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Simon Resborn",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Joakim Johanson",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Jacob Gyllenberg",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }
                ]
            },
            {
                title: this.$t("about.team.low-voltage.title").toString(),
                about: this.$t("about.team.low-voltage.description").toString(),
                href: "low-voltage",
                members: [
                    {
                        name: "Vakant",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Fredrik Höglund",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Carl Witt",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }
                ]
            },
            {
                title: this.$t("about.team.power-train.title").toString(),
                about: this.$t("about.team.power-train.description").toString(),
                href: "power-train",
                members: [
                    {
                        name: "David Englund",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Daniel Baniadam",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Jude Marroush",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Anton Erensjö",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Anders Nilsson",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Alexander Gimbergsson ",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    /*
                    {
                        name: "Filip Rask",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }*/
                ]
            },
            {
                title: this.$t("about.team.vehicle-dynamics.title").toString(),
                about: this.$t("about.team.vehicle-dynamics.description").toString(),
                href: "vehicle-dynamics",
                members: [
                    {
                        name: "Alec Berkien",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "none"
                    }, {
                        name: "Rasmus Malmqvist",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }, {
                        name: "Arvid Lundholm",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }, {
                        name: "Hamed Noori",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }, {
                        name: "Pontus Gustafsson",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }, {
                        name: "Ludvig Hansson",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    }
                ]
            }
        ]
    }
}
</script>

<style lang="scss" scoped>
.meet-the-team {
    box-sizing: border-box;
    width: 100%;

    @media (min-width: 600px) {
        display: grid;
        grid-template-columns: 200px 1fr;
    }

    .mtt-tabs {
        @media (min-width: 600px) {
            border-right: grey solid 1px;
        }
    }

    .avatars {
        display: grid;
        grid-template-columns: repeat(auto-fit, 180px);
        grid-template-rows: repeat(auto-fit, 280px);
        grid-gap: 16px;
        justify-content: center;


        .avatar {
            margin: 0;

            .none-avatar {
                display: grid;
                place-items: center;
                background-color: lightgray;
                width: 180px;
                height: 200px
            }
        }
    }
}
</style>
