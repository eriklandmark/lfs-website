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
                v-col(cols="10")
                    v-row(justify="center")
                        v-col.avatar(cols="9" sm="5" md="4" lg="3" xl="2" v-for="member in get_full_team(team)" :key="member.name" @click="openDialog(member)")
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
            //v-row.pa-10(v-if="team.group_photo")
                v-img(:src="team.group_photo" :alt="team.title" width="70%" height="auto")

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Parallax from "@/components/Parallax.vue";
import organization_data from "@/assets/organization_data";
import SelectedPersonDialog from "@/components/SelectedPersonDialog.vue";

@Component({
    components: {SelectedPersonDialog, Parallax},
})
export default class TeamView extends Vue {
    dialog = false
    selected_person = {}

    get team() {
        return this.mtt_data.find((team) => team.href === this.$route.params.team);
    }

    openDialog(person: any) {
        this.selected_person = person
        this.dialog = true
    }

    get_full_team(team: any) {
        if(team.href == "board") {
            return team.members
        } else {
            const team_leader = this.mtt_data[0].members.find((member: any) => member.hasOwnProperty("team") && member.team === team.href)!
            team_leader.title = <string> this.$t('about.team.titles.team-leader')
            return [team_leader, ...team.members]
        }
    }

    get mtt_data() {
        return organization_data()
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
