<template lang="pug">
    .home
        v-container
            v-row.my-8(align="center" )
                v-col(cols="12" md="12")
                    h1 {{ $t('about.title') }}
                    .my-5 {{$t('about.description')}}
                    //v-img(src="/images/profile_pictures/whole_team.jpg" contain alt="")

            v-row.my-8.mb-4.mtt-title
                v-dialog(v-model="dialog" :max-width="selected_person.hasOwnProperty('texts')? '1000px':'500px'"
                    max-height="400px")
                    template(v-if="!selected_person.hasOwnProperty('texts')")
                        v-img(v-if="selected_person['avatar'] !== 'none'" :src="selected_person.avatar" height="100%")
                        .no-selected-avatar(v-else)
                            v-icon.icon(size="200" ) mdi-account
                    v-row.ma-0(v-else style="background-color: #fff")
                        v-col.pa-0(sm="6")
                            v-img(v-if="selected_person['avatar'] !== 'none'" :src="selected_person.avatar" height="100%")
                            .no-selected-avatar(v-else)
                                v-icon.icon(size="200" ) mdi-account
                                v-card-title.black--text.font-weight-bold
                                    span {{selected_person.name}}
                                    v-spacer
                                    v-btn(v-if="selected_person['linkedin']" :href="selected_person.linkedin" target="_blank"
                                        icon x-large)
                                        v-icon(large color="accent" ) mdi-linkedin
                        v-col.pa-0(sm="6")
                            v-card(style="overflow: auto;" height="100%" )
                                v-card-title.black--text.font-weight-bold
                                    span {{selected_person.name}}
                                    v-spacer
                                    v-btn(v-if="selected_person['linkedin']" :href="selected_person.linkedin" target="_blank"
                                        icon x-large)
                                        v-icon(large color="accent" ) mdi-linkedin
                                v-card-subtitle {{selected_person.title}}
                                v-card-text(v-if="selected_person.hasOwnProperty('texts')").black--text
                                    p(v-for="text in selected_person.texts") {{text}}
                                v-card-actions(v-if="$vuetify.breakpoint.xs")
                                    v-spacer
                                    v-btn(color="primary" @click="dialog = false" text) {{$t('button.close')}}

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

                                        .avatar(v-for="member in get_full_team(team)" :key="member.name" @click="openDialog(member)")
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
    dialog = false
    selected_person = {}

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

    openDialog(person: any) {
        this.selected_person = person
        this.dialog = true
    }

    get_full_team(team: any) {
        if(team.href == "board") {
            return team.members
        } else {
            return [this.mtt_data[0].members.find((member: any) => member.hasOwnProperty("team") && member.team === team.href), ...team.members]
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
                        avatar: "images/profile_pictures/board/project_leader.png",
                        texts: [
                            "Hello, my name is Jacob Höglund. I come from Stockholm and I am studying my fifth(+/-3years) year in industrial design specialized in production design. I enjoy games in all forms, both sports and video games as well as some board games and have a huge passion for music. ",
                            "As project leader my goal is to drive the organization forward and take it to new heights. My responsibilities involve both technical and administrative work but I am leaning more into the administrative side of the project. ",
                            "I see this project as a great opportunity and challenge to restart the formula student team that once existed at LTU, and operate it with new potential.My hopes are to gain experience within working in a larger scale project as well as overall create memories and have a good time!"
                        ],
                    },
                    {
                        name: "Samuel Höglund",
                        title: this.$t("about.team.titles.technical-leader").toString(),
                        avatar: "images/profile_pictures/board/technical_leader_1.jpg",
                        texts: [
                            "Hello, my name is Samuel Höglund and I am from Borlänge. I study my fourth year as a mechanical engineering student. Through Formula Student, I want to realize my childhood dream of building a really fast racing car.",
                            "For me, Formula Student is a unique opportunity to collaborate with students from other academic fields and learn from others in order to develop. Which is why I brought Formula Student to life at LTU and hope to establish a solid foundation for future students involved in the project.",
                            "As Chief Technical Officer my responsibilities lie to extract as much potential from the car as possible making sure every component delivers as expected."
                        ]
                    },
                    {
                        name: "Erik Landmark",
                        title: this.$t("about.team.titles.technical-leader").toString(),
                        avatar: "images/profile_pictures/board/technical_leader_2.png",
                        linkedin: "https://www.linkedin.com/in/erik-landmark-193067128/",
                        texts: [
                            "Hi, my name is Erik Landmark. I come from Gothenburg and I am a fourth year student studying mechanical engineering. I find it very interesting with product development and the process of manufacturing an item from thought to design. \n",
                            "I decided to participate in the start-up of the formula student team for the reason being that there are too few student organizations dedicated to product development at LTU. I want to change that!",
                            "As leader of the mechanical systems my responsibilities lie to extract as much potential from the car as possible making sure every component delivers as expected.",
                            "I look forward to gain experience of project management and evolve my skills in working in a larger group. Other than that I look forward to construct a roadworthy formula student car and go racing!"
                        ]
                    },
                    {
                        name: "Sannah Engelin",
                        title: `${this.$t("about.team.titles.hr-manager").toString()}`,
                        avatar: "images/profile_pictures/board/hr_manager.png",
                        texts: [
                            "Hi, my name is Sannah Engelin, I come from Gothenburg and study my third year as a psychology candidate. I love skiing on my freetime and enjoy painting/sketching.",
                            "As HR my role entails to arrange the recruitment of new team members as well as to ensure that every team maintains at a motivational level to deliver a top tier performance.",
                            "I´m participating in formula student because it is a great opportunity for me to apply my theoretical knowledge in real-life situations. I hope to learn from the experience"
                        ]
                    },
                    {
                        name: "Max Wiberg",
                        team: "administration",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.administration.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_admin.png",
                        texts: [
                            "Hello, my name is Max Wiberg. I come from Stockholm and study my third year as a student of architectural engineering. I found it very tempting to join the formula student team because of my interest in F1. I see it as a great opportunity for me to get an insight of how a team works and hopefully learn something from it.",
                            "I look forward to create a team that is competent to perform against all the other competing universities around the world.",
                            "As administration leader my role entails to operate formula student behind the scenes, making sure that every team has what they need to complete their work."
                        ]
                    },
                    {
                        name: "Fabian Dalenius",
                        team: "aerodynamics",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.aerodynamics.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_aerodynamics.png",
                        texts: [
                            "Hi, my name is Fabian Dalenius and I study my first year of the master of science program in engineering physics. Let me tell you a little about my roll in this project. I, together with my team, investigate how to optimize the airflow around the vehicle. This applies both for low speeds and in high speeds.",
                            "I look forward to gain knowledge of this project and hopefully make use of it in the future. I as well see this as a great opportunity for me to connect and create contact with many companies."
                        ]
                    },
                    {
                        name: "Louise Lööf",
                        team: "chassis",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.chassis.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_chassis.png",
                        texts: [
                            "Hello everyone! My name is Louise Lööf and I come from Uppsala. I am studying my second year here at LTU as a student of automotive engineering.",
                            "With having a great interest in motorsports combined with my studies, a project like this was obvious to participate in. I have a strong feeling that this project will contribute with useful knowledge that I will benefit from in the future.",
                            "My responsibilities as leader of the chassis team is to create a sustainable chassis for the vehicle that is suitable and adapted after what the other teams have developed. I as well supervise over the drivers safety in the car."
                        ]
                    },
                    {
                        name: "David Englund",
                        team: "power-train",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.power-train.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_powertrain.png",
                        texts: [
                            "Hello, my name is David Englund. I come from Göteborg and study my third year as a mechanical engineering student. Being interested in motors I find it natural to take the position as leader of powertrain. Besides motors, on my freetime I like sailing, exercising and skiing.",
                            "I look forward to widen my knowledge of how components within the car industry work and to improve my leadership skills. I also hope to create a better understanding of the type of job I would like to have in the future.",
                            "Together with my team our responsibilities lie to provide a sustainable source of power that is reliable for the vehicle."
                        ]
                    },
                    {
                        name: "Alec Berkien",
                        team: "vehicle-dynamics",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.vehicle-dynamics.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_vehicle_dynamics.png",
                        texts: [
                            "Hi, my name is Alec Berkien, I come from Malmö and study my fourth year as a mechanical engineering student. During my freetime I engage myself in RC cars/planes and play basketball.",
                            "I find dynamics as a very interesting subject which is why I applied for the role as Vehicle dynamic leader. My responsibilities regard the dynamical components of the car including suspension, steering, brakes and pedals",
                            "With LTU previously participating in formula student I thought it was sad that they laid off, which is why I engaged in the start-up of this project. I look forward to start developing the car and hope to establish a solid foundation of formula student here at LTU. "
                        ]
                    },
                    {
                        name: "Thomas Tillgren",
                        team: "low-voltage",
                        title: `${this.$t("about.team.titles.team-leader").toString()} - ${this.$t("about.team.low-voltage.title").toString()}`,
                        avatar: "images/profile_pictures/board/teamleader_low_voltage.png",
                        texts: [
                            "Hello my name is Thomas Tillgren. This is my second year at LTU studying my engineering degree of material science. My interests lie in electronics and 3D printing which I think would help me with a strong advantage in this project.",
                            "I liked the idea of participating in a larger project and to put my knowledge to the test, which is why I joined formula student. I also look forward to establishing a new foundation for Formula Student at LTU.",
                            "As team leader of the low voltage system my task involves to develop a safety system for the vehicle. The work involves diagnosing problems and creating solutions that are safe to operate with."
                        ]
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
                        name: "Fredrik Höglund",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Carl Witt",
                        title: this.$t("about.team.titles.team-member").toString(),
                        avatar: "none"
                    },
                    {
                        name: "Wiktoria Grzelak",
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
.no-selected-avatar {
    height: 500px;
    background-color: lightgray;
    .icon {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

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

            transition: all .2s ease-in-out;
            .none-avatar {
                display: grid;
                place-items: center;
                background-color: lightgray;
                width: 160px;
                height: 200px;
            }
        }

        .avatar:hover {
            cursor: pointer;
            transform: scale(1.1);
        }
    }
}

.center-items {
    display: grid;
    place-items: center;
}
</style>
