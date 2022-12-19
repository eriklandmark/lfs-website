<template lang="pug">
    .about
        selected-person-dialog(v-model="dialog" :selected-person="selected_person")
        v-card.no-rounded-corners(v-if="team.group_photo" dark flat)
            parallax(:src="team.group_photo" height="700" offset-y="" )
                v-container(fill-height)
                    v-row()
                        v-col.center-text(cols="12" md="12")
                            h1 {{team.title}}
        v-card.no-rounded-corners(v-else dark flat height="200" color="primary" )
            .items-center.fill-height
                h1 {{team.title}}

        v-container
            v-row.mb-8(justify="center")
                v-col(cols="10")
                    v-btn(text to="/about").mt-4
                        v-icon(left) mdi-arrow-left
                        | {{$t('button.back')}}
                    .my-5 {{team.about}}
            v-row.mb-8(justify="center")
                v-col(cols="10" sm="8")
                    v-row.mt-4.mb-6(justify="center")
                        h1.center-text {{$t('about.team.titles.upper_management')}}
                    v-row(justify="center")
                        v-col.avatar(cols="9" sm="5" md="4" lg="4" xl="2" v-for="member in upper_management" :key="member.name" @click="openDialog(member)")
                            v-img.img(v-if="member.avatar !== 'none'"
                                :src="member.avatar"
                                :alt="member.name + ' - ' + member.title"
                                width="100%")
                            .none-avatar.fill(v-else)
                                v-icon.icon(x-large) mdi-account
                            .ml-1.mt-2
                                span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                br
                                span(style="font-size: 0.8em;") {{ member.title }}

                    v-row.mt-10.mb-6(justify="center")
                        h1.center-text {{$tc('about.team.titles.team-leader', 2)}}
                    v-row(justify="center")
                        v-col.avatar(cols="9" sm="5" md="4" lg="4" xl="2" v-for="member in team_leaders" :key="member.name" @click="openDialog(member)")
                            v-img.img(v-if="member.avatar !== 'none'"
                                :src="member.avatar"
                                :alt="member.name + ' - ' + member.title"
                                width="100%")
                            .none-avatar.fill(v-else)
                                v-icon.icon(x-large) mdi-account
                            .ml-1.mt-2
                                span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                br
                                span(style="font-size: 0.8em;") {{ member.title }}
                    v-row.mt-10.mb-6(justify="center")
                        h1.center-text {{$t('about.team.titles.human_resources')}}
                    v-row(justify="center")
                        v-col.avatar(cols="9" sm="5" md="4" lg="4" xl="2" v-for="member in human_resources" :key="member.name" @click="openDialog(member)")
                            v-img.img(v-if="member.avatar !== 'none'"
                                :src="member.avatar"
                                :alt="member.name + ' - ' + member.title"
                                width="100%")
                            .none-avatar.fill(v-else)
                                v-icon.icon(x-large) mdi-account
                            .ml-1.mt-2
                                span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                br
                                span(style="font-size: 0.8em;") {{ member.title }}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Parallax from "@/components/Parallax.vue";
import organization_data from "@/assets/organization_data";
import SelectedPersonDialog from "@/components/SelectedPersonDialog.vue";

@Component({
    components: {SelectedPersonDialog, Parallax},
})
export default class BoardView extends Vue {
    dialog = false
    selected_person = {}

    get team() {
        return organization_data()[0];
    }

    openDialog(person: any) {
        this.selected_person = person
        this.dialog = true
    }

    get upper_management() {
        return this.team.members.slice(0, 3)
    }

    get team_leaders() {
        return this.team.members.slice(3, 9)
    }

    get human_resources() {
        return this.team.members.slice(9, 10)
    }

    get_full_team(team: any) {
        return team.members
    }
}
</script>

<style lang="scss" scoped>
.no-selected-avatar {
    height: 500px;
    background-color: lightgray;
    display: grid;
    place-items: center;
}

.avatar {
    display: flex;
    flex-direction: column;
    transition: all .2s ease-in-out;
    aspect-ratio: 2/3;
    .img {
        flex-grow: 1;
    }
    .none-avatar {
        flex-grow: 1;
        .icon {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        background-color: lightgray;
        width: 100%;
    }
}

.avatar:hover {
    cursor: pointer;
    transform: scale(1.1);
}
</style>
