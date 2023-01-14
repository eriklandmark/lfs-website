<template lang="pug">
    .board
        selected-person-dialog(v-model="dialog" :selected-person="selected_person")
        template(v-if="loading")
            v-card(dark flat height="700" color="accent" tile)
                .fill-height.items-center
                    v-progress-circular(indeterminate color="primary" size="64")
        template(v-else)
            v-card(v-if="board_data.has_image" dark flat tile)
                parallax(:src="board_data.group_photo" height="700" offset-y="" )
                    v-container(fill-height)
                        v-row
                            v-col.center-text(cols="12" md="12")
                                h1 {{board_data.name[language]}}
            v-card(v-else dark flat height="700" color="accent" tile)
                .items-center.fill-height
                    h1 {{board_data.name[language]}}

        v-container
            v-row.mb-8(justify="center")
                v-col(cols="10")
                    v-btn(text to="/about").mt-4
                        v-icon(left) mdi-arrow-left
                        | {{$t('button.back')}}
                    template(v-if="loading")
                        .my-5
                            v-skeleton-loader(type="paragraph@2")
                    template(v-else)
                        .my-5 {{board_data.description[language]}}
            v-row.mb-8(justify="center")
                v-col(cols="10" sm="8")
                    v-row.mt-4.mb-6(justify="center")
                        h1.center-text {{$t('about.team.titles.upper_management')}}
                    v-row(justify="center")
                        template(v-if="loading")
                            v-col.avatar.expand-on-hover(cols="9" sm="5" md="4" lg="4" xl="2" v-for="i in 3" :key="i")
                                v-skeleton-loader(type="image").image-loader
                                v-skeleton-loader(type="card-heading")
                        template(v-else)
                            v-col.avatar.expand-on-hover(cols="9" sm="5" md="4" lg="4" xl="2" v-for="member in upper_management" :key="member.name" @click="openDialog(member)")
                                v-img.img(v-if="member.avatar !== 'none'"
                                    :src="member.avatar"
                                    :alt="member.name + ' - ' + $tc('about.team.titles.' + member.title, 0)"
                                    width="100%")
                                .none-avatar.fill(v-else)
                                    v-icon.icon(x-large) mdi-account
                                .ml-1.mt-2
                                    span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                    br
                                    span(style="font-size: 0.8em;") {{ $tc('about.team.titles.' + member.title, 0) }}

                    v-row.mt-10.mb-6(justify="center")
                        h1.center-text {{$tc('about.team.titles.team-leader', 2)}}
                    v-row(justify="center")
                        template(v-if="loading")
                            v-col.avatar.expand-on-hover(cols="9" sm="5" md="4" lg="4" xl="2" v-for="i in 6" :key="i")
                                v-skeleton-loader(type="image").image-loader
                                v-skeleton-loader(type="card-heading")
                        template(v-else)
                            v-col.avatar.expand-on-hover(cols="9" sm="5" md="4" lg="4" xl="2" v-for="member in team_leaders" :key="member.name" @click="openDialog(member)")
                                v-img.img(v-if="member.avatar !== 'none'"
                                    :src="member.avatar"
                                    :alt="member.name + ' - ' + $tc('about.team.titles.' + member.title, 0)"
                                    width="100%")
                                .none-avatar.fill(v-else)
                                    v-icon.icon(x-large) mdi-account
                                .ml-1.mt-2
                                    span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                    br
                                    span(style="font-size: 0.8em;") {{ $tc('about.team.titles.' + member.title, 0) }}
                    v-row.mt-10.mb-6(justify="center")
                        h1.center-text {{$t('about.team.titles.human_resources')}}
                    v-row(justify="center")
                        template(v-if="loading")
                            v-col.avatar.expand-on-hover(cols="9" sm="5" md="4" lg="4" xl="2" v-for="i in 1" :key="i")
                                v-skeleton-loader(type="image").image-loader
                                v-skeleton-loader(type="card-heading")
                        template(v-else)
                            v-col.avatar.expand-on-hover(cols="9" sm="5" md="4" lg="4" xl="2" v-for="member in human_resources" :key="member.name" @click="openDialog(member)")
                                v-img.img(v-if="member.avatar !== 'none'"
                                    :src="member.avatar"
                                    :alt="member.name + ' - ' + $tc('about.team.titles.' + member.title, 0)"
                                    width="100%")
                                .none-avatar.fill(v-else)
                                    v-icon.icon(x-large) mdi-account
                                .ml-1.mt-2
                                    span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                    br
                                    span(style="font-size: 0.8em;") {{ $tc('about.team.titles.' + member.title, 0) }}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Parallax from "@/components/Parallax.vue";
import SelectedPersonDialog from "@/components/SelectedPersonDialog.vue";
import {collection, doc, getDoc, getFirestore} from "firebase/firestore";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import app from "@/plugins/firebase";
import {account_store} from "@/stores/account_store";

@Component({
    components: {SelectedPersonDialog, Parallax},
})
export default class BoardView extends Vue {
    dialog = false
    selected_person: any = {}
    board_data = {
        description: {
            en: "",
            sv: ""
        },
        group_photo: "",
        has_image: false,
        name: {
            en: "",
            sv: ""
        }
    }
    loading = true
    account_store = account_store()
    upper_management: any[] = []
    team_leaders: any[] = []
    human_resources: any[] = []


    get firebase_teams_collection() {
        return collection(getFirestore(app), "teams_data")
    }

    get firebase_member_collection() {
        return collection(getFirestore(app), "members_data")
    }

    get language() {
        return this.$i18n.locale
    }

    async beforeMount() {
        Promise.all(
            [
                getDoc(doc(this.firebase_teams_collection, "00sqyw643ttn6ts"))
                    .then((doc) => {
                        if (doc.exists()) {
                            this.board_data =  Object.assign(this.board_data, doc.data())
                        }
                    })
                    .then(async () => {
                        if (this.board_data.has_image) {
                            this.board_data.group_photo = await getDownloadURL(ref(getStorage(app), "team_pictures/00sqyw643ttn6ts.avif"))
                        }
                    }),

                this.account_store.request("groups/" + "00sqyw643ttn6ts")
                    .then((team) => {
                            return Promise.all(team.map(async (member: any) => {
                                return getDoc(doc(this.firebase_member_collection, member.id))
                                    .then((doc) => doc.exists() ? {...member, ...doc.data()} : member)
                                    .then(async (member) => {
                                        if (member.has_image) {
                                            member["avatar"] = await getDownloadURL(ref(getStorage(app), "member_pictures/" + member.id + ".avif"))
                                        } else {
                                            member["avatar"] = "none"
                                        }
                                        return member
                                    })
                            }))
                        }
                    )
                    .then((team) => {
                        this.upper_management = [
                            team.find(member => member.title == "project-leader") || [],
                            team.filter(member => member.title == "technical-leader"),
                        ].flat()
                        this.team_leaders = team.filter(member => member.title == "team-leader")
                        this.human_resources = team.filter(member => member.title.startsWith("hr"))
                    })
            ]
        ).finally(() => this.loading = false)
    }

    openDialog(person: any) {
        this.selected_person = person
        this.dialog = true
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

    .img, .image-loader {
        flex-grow: 1;
    }

    .none-avatar {
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
</style>
