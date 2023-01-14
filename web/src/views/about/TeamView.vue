<template lang="pug">
    .team
        selected-person-dialog(v-model="dialog" :selected-person="selected_person")
        template(v-if="loading")
            v-card(dark flat height="700" color="accent" tile)
                .fill-height.items-center
                    v-progress-circular(indeterminate color="primary" size="64")
        template(v-else)
            v-card(v-if="team_data.has_image" dark flat tile)
                parallax(:src="team_data.group_photo" height="700" offset-y="" )
                    v-container(fill-height)
                        v-row
                            v-col.center-text(cols="12" md="12")
                                h1 {{team_data.name[language]}}
            v-card(v-else dark flat height="700" color="accent" tile)
                .items-center.fill-height
                    h1 {{team_data.name[language]}}

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
                        .my-5 {{team_data.description[language]}}
            v-row.mb-8(justify="center")
                v-col(cols="10")
                    v-row(justify="center")
                        template(v-if="loading")
                            v-col.avatar(cols="9" sm="5" md="4" lg="3" xl="2" v-for="i in 4" :key="i")
                                v-skeleton-loader(type="image").image-loader
                                v-skeleton-loader(type="card-heading")
                        template(v-else)
                            v-col.avatar.expand-on-hover(cols="9" sm="5" md="4" lg="3" xl="2" v-for="member in team_members" :key="member.name" @click="openDialog(member)")
                                v-img.img(v-if="member.avatar !== 'none'"
                                    :src="member.avatar"
                                    :alt="member.name + ' - ' + $tc('about.team.titles.' + member.title, 0)"
                                    width="100%")
                                .none-avatar.fill(v-else)
                                    v-icon.icon(x-large) mdi-account
                                .ml-1.mt-2
                                    span.font-weight-bold(style="font-size: 1em;") {{ member.name }}
                                    br
                                    span(v-if="member.title" style="font-size: 0.8em;") {{ $tc('about.team.titles.' + member.title, 0) }}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Parallax from "@/components/Parallax.vue";
import SelectedPersonDialog from "@/components/SelectedPersonDialog.vue";
import {account_store} from "@/stores/account_store";
import {collection, doc, getDoc, getFirestore} from "firebase/firestore";
import app from "@/plugins/firebase";
import {getDownloadURL, getStorage, ref} from "firebase/storage";

@Component({
    components: {SelectedPersonDialog, Parallax},
})
export default class TeamView extends Vue {
    dialog = false
    selected_person: {
        name: string,
        title: string,
        avatar: string,
        linked_in_link: string,
        email: string,
        bio: {
            sv: string,
            en: string,
        }
    } | any = {}
    account_store = account_store()
    team_members: any[] = []
    team_data = {
        description: {
            en: "",
            sv: ""
        },
        has_image: false,
        group_photo: "",
        name: {
            en: "",
            sv: ""
        }
    }
    loading = true

    group_id_from_href = {
        "administration": "03s49zyc3flbu9b",
        "aerodynamics": "026in1rg4hte230",
        "chassis": "02jxsxqh22ygqau",
        "low-voltage": "01hmsyys3hnp4xx",
        "power-train": "0279ka6512lqhtr",
        "vehicle-dynamics": "03ep43zb308ehwq",
    } as { [key: string]: string }

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
                getDoc(doc(this.firebase_teams_collection, this.group_id_from_href[this.$route.params.team]))
                    .then((doc) => {
                        if (doc.exists()) {
                            this.team_data =  Object.assign(this.team_data, doc.data())
                        }
                    })
                    .then(async () => {
                        if (this.team_data.has_image) {
                            this.team_data.group_photo = await getDownloadURL(ref(getStorage(app), "team_pictures/" +  this.group_id_from_href[this.$route.params.team]+ ".avif"))
                        }
                    }),

                this.account_store.request("groups/" + this.group_id_from_href[this.$route.params.team])
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
                    ).then((team) => this.team_members = [
                        team.filter(member => member.title == "team-leader").sort((leader) => leader.name),
                        team.filter(member => member.title != "team-leader").sort((member) => member.name)
                ].flat())
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


.avatar {
    display: flex;
    flex-direction: column;
    aspect-ratio: 2/3;
    height: 100%;

    .img, .image-loader {
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
</style>
