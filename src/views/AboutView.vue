<template lang="pug">
    .home
        v-container
            v-row.my-16(align="center" )
                v-col(cols="12" md="12")
                    h1 Om Oss
                    span Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.

            v-row.mt-16.mb-4
                v-col
                    h1 Meet the teem

            .meet-the-team
                .mtt-tabs
                    v-tabs(v-model="tab" color="accent" :vertical="$vuetify.breakpoint.smAndUp" show-arrows)
                        v-tab(v-for="team in mtt_data" :key="team.title") {{ team.title }}
                div
                    v-tabs-items(v-model="tab")
                        v-tab-item(v-for="team in mtt_data" :key="team.title")
                            v-card(flat)
                                v-card-title.font-weight-bold {{ team.title }}
                                v-card-text(style="color: black !important") {{team.about}}
                                v-card-text(style="color: black !important")
                                    h3.mb-4 Members
                                    .avatars
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
                                                span.font-weight-bold {{ member.name }}
                                                br
                                                span {{ member.title }}

            v-row.my-16(align="center" )
                v-col(cols="12" md="12")
                    h1 History
                    span Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.



</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class AboutView extends Vue {
    tab = 0;

    mtt_data: {
        title: string
        about: string
        members: {
            name: string
            title: string
            avatar: string
        }[]
    }[] = [
        {
            title: "Styrelsen",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.",
            members: [
                {
                    name: "John Doe",
                    title: "CEO",
                    avatar: "none"
                },
                {
                    name: "Jane Doe",
                    title: "CTO",
                    avatar: "none"
                }
            ]
        },
        {
            title: "Administration",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.",
            members: [
                {
                    name: "John Doe",
                    title: "CEO",
                    avatar: "none"
                },
                {
                    name: "Jane Doe",
                    title: "CTO",
                    avatar: "none"
                }
            ]
        },
        {
            title: "Aerodynamik",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.",
            members: [
                {
                    name: "John Doe",
                    title: "CEO",
                    avatar: "none"
                },
                {
                    name: "Jane Doe",
                    title: "CTO",
                    avatar: "none"
                }
            ]
        },
        {
            title: "Chassi",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.",
            members: [
                {
                    name: "John Doe",
                    title: "CEO",
                    avatar: "none"
                },
                {
                    name: "Jane Doe",
                    title: "CTO",
                    avatar: "none"
                }
            ]
        },
        {
            title: "Drivlina",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.",
            members: [
                {
                    name: "John Doe",
                    title: "CEO",
                    avatar: "none"
                },
                {
                    name: "Jane Doe",
                    title: "CTO",
                    avatar: "none"
                }
            ]
        },
        {
            title: "Fordonsdynamik",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.",
            members: [
                {
                    name: "John Doe",
                    title: "CEO",
                    avatar: "none"
                },
                {
                    name: "Jane Doe",
                    title: "CTO",
                    avatar: "none"
                },
                {
                    name: "Janes Doe",
                    title: "CTO",
                    avatar: "none"
                }
            ]
        },
        {
            title: "Lågspänning",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.",
            members: [
                {
                    name: "John Doe",
                    title: "CEO",
                    avatar: "none"
                },
                {
                    name: "Jane Doe",
                    title: "CTO",
                    avatar: "none"
                }
            ]
        }
    ]
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
