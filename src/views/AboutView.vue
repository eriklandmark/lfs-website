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
                                                :alt="member.name + ' - ' + member.title"
                                                width="160"
                                                height="200px"
                                                )
                                            .none-avatar(v-else)
                                                v-icon(x-large) mdi-account
                                            .ml-1.mt-2
                                                span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                                br
                                                span(style="font-size: 0.8em;") {{ member.title }}
                                    template(v-if="team.group_photo")
                                        v-divider.ma-4
                                        v-card-text.center-items
                                            v-img(:src="team.group_photo" :alt="team.title" width="70%" height="auto")

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

            v-row.my-16(align="center")
                v-col
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
                group_photo: "/images/profile_pictures/board/board.png",
                members: [
                    {
                        name: "Jacob Höglund",
                        title: this.$t("about.team.titles.project-leader").toString(),
                        avatar: "images/profile_pictures/board/project_leader.png"
                    },
                    {
                        name: "Samuel Höglund",
                        title: this.$t("about.team.titles.technical-leader").toString(),
                        avatar: "images/profile_pictures/board/technical_leader_1.jpg"
                    },
                    {
                        name: "Erik Landmark",
                        title: this.$t("about.team.titles.technical-leader").toString(),
                        avatar: "images/profile_pictures/board/technical_leader_2.png"
                    },
                    {
                        name: "Sannah Engelin",
                        title: `${this.$t("about.team.titles.hr-manager").toString()}`,
                        avatar: "images/profile_pictures/board/hr_manager.png"
                    },
                    {
                        name: "Max Wiberg",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.administration.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_admin.png"
                    },
                    {
                        name: "Fabian Dalenius",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.aerodynamics.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_aerodynamics.png"
                    },
                    {
                        name: "Louise Lööf",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.chassis.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_chassis.png"
                    },
                    {
                        name: "David Englund",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.power-train.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_powertrain.png"
                    },
                    {
                        name: "Alec Berkien",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.vehicle-dynamics.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_vehicle_dynamics.png"
                    },
                    {
                        name: "Thomas Tillgren",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.low-voltage.title").toString()}`,
                        avatar: "none"
                    },
                ]
            },
            {
                title: this.$t("about.team.administration.title").toString(),
                about: this.$t("about.team.administration.description").toString(),
                href: "administration",
                group_photo: "",
                members: [
                    {
                        name: "Max Wiberg",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "images/profile_pictures/board/teamleader_admin.png"
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
                group_photo: "",
                members: [
                    {
                        name: "Fabian Dalenius",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "images/profile_pictures/board/teamleader_aerodynamics.png"
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
                group_photo: "",
                members: [
                    {
                        name: "Louise Lööf",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "images/profile_pictures/board/teamleader_chassis.png"
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
                group_photo: "",
                members: [
                    {
                        name: "Thomas Tillgren",
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
                group_photo: "",
                members: [
                    {
                        name: "David Englund",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "images/profile_pictures/board/teamleader_powertrain.png"
                    },
                    {
                        name: "Daniel Baniadam",
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
                ]
            },
            {
                title: this.$t("about.team.vehicle-dynamics.title").toString(),
                about: this.$t("about.team.vehicle-dynamics.description").toString(),
                href: "vehicle-dynamics",
                group_photo: "",
                members: [
                    {
                        name: "Alec Berkien",
                        title: this.$t("about.team.titles.team-leader").toString(),
                        avatar: "images/profile_pictures/board/teamleader_vehicle_dynamics.png"
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
        grid-template-columns: repeat(auto-fit, 160px);
        grid-template-rows: repeat(auto-fit, 280px);
        grid-gap: 16px;
        justify-content: center;


        .avatar {
            margin: 0;

            .none-avatar {
                display: grid;
                place-items: center;
                background-color: lightgray;
                width: 160px;
                height: 200px
            }
        }
    }
}

.center-items {
    display: grid;
    place-items: center;
}
</style>
