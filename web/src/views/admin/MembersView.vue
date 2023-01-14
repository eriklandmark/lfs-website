<template lang="pug">
    v-card(flat)
        v-dialog(dialog v-model="dialog" max-width="600px")
            v-card
                v-card-title {{$t("admin.members.edit_member")}}: {{ selected_member.name }}
                v-card-text
                    v-tabs(v-model="tab" centered).mb-4
                        v-tab(href="#sv") Svenska
                        v-tab(href="#en") English
                    v-textarea(v-model="selected_member_data.bio[tab]"
                        label="Bio"
                        rows="5"
                        auto-grow
                        outlined)
                    v-select(v-model="selected_member_data.title"
                        :label="$t('admin.members.select_title')"
                        :items="titles"
                        outlined)
                    v-text-field(v-model="selected_member_data.linked_in_link"
                        :label="$t('admin.members.linked_in_link')" outlined)
                    v-row
                        v-col(cols="12" sm="2").items-center
                            template(v-if="selected_member_data.image_url")
                                v-img(:src="selected_member_data.image_url" contain max-width="100px" max-height="100px" width="100%" )
                            template(v-else)
                                v-icon(size="50" ) mdi-account-circle
                        v-col(cols="12" sm="9").items-center
                            v-file-input(v-model="selected_member_data.image"
                                prepend-icon=""
                                outlined
                                accept="image/avif"
                                hide-details
                                :placeholder="$t('admin.members.upload_picture')" style="width: 100%")
                        v-col(cols="1").pa-0.items-center
                            v-btn(:disabled="!selected_member_data.image_url" icon @click="deleteImage")
                                v-icon mdi-delete
                v-card-actions
                    v-spacer
                    v-btn(text @click="dialog = false") {{$t("button.cancel")}}
                    v-btn(text @click="save" :loading="save_loading") {{$t("button.save")}}

        v-card-title {{ $t("admin.members.title") }}
        v-card-text {{ $t("admin.members.description") }}
        v-card-text
            v-data-table.elevation-2(
                :headers="headers"
                :items="members"
                :search="search"
                :loading="loading"
                :items-per-page="15"
                :footer-props="{ itemsPerPageOptions: [5, 15, 25, { text: $t('dropdown.all'), value: -1 }] }"
                item-key="id")

                template(v-slot:top)
                    v-toolbar(flat, color="white")
                        v-text-field(
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            clearable
                            single-line
                            hide-details)
                template(v-slot:item.title="{ item }")
                    span(v-if="item.title") {{titles.find(title => title.value === item.title)["text"]}}
                template(v-slot:item.actions="{ item }")
                    .actions
                        v-btn(@click="edit(item)" icon)
                            v-icon mdi-pencil
                template(v-slot:no-data)
                    v-btn(color="primary", @click="initialize") {{ $t("button.reload") }}


</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {account_store} from "@/stores/account_store";
import {collection, doc, getDoc, getDocs, getFirestore, setDoc} from "firebase/firestore";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "@/plugins/firebase";
import {useInfoBarStore} from "@/stores/infobar_store";

@Component({
    components: {},
})
export default class MembersView extends Vue {
    account_store = account_store()
    dialog = false
    tab = "sv"
    get headers () {
        return [
            {text: this.$t("admin.members.name"), value: "name"},
            {text: this.$t("admin.members.member_title"), value: "title"},
            {text: this.$t("admin.members.email"), value: "email"},
            {text: "", value: "actions", sortable: false},
        ]
    }
    members: any[] = []
    search = ""
    loading = true
    save_loading = false
    selected_member = {
        id: null,
        name: ""
    }
    selected_member_data = {
        bio: {
            sv: "",
            en: ""
        },
        title: "",
        linked_in_link: "",
        image: null as File | null,
        image_url: ""
    }

    get titles() {
        return [
            {text: this.$t("about.team.titles.project-leader"), value: "project-leader"},
            {text: this.$t("about.team.titles.technical-leader"), value: "technical-leader"},
            {text: this.$tc("about.team.titles.team-leader", 0), value: "team-leader"},
            {text: this.$t("about.team.titles.team-member"), value: "team-member"},
            {text: this.$t("about.team.titles.hr-manager"), value: "hr-manager"},
            {text: this.$t("about.team.titles.human_resources"), value: "human_resources"},
        ]
    }

    async mounted() {
        if (this.account_store.is_logged_in) {
            await this.initialize()
        } else {
            this.account_store.onAuthStateChanged(() => this.initialize())
        }
    }

    initialize() {
        Promise.all([
            this.account_store.request("accounts"),
            getDocs(this.firebase_member_collection)
        ])
            .then(([members_data, docs]) => {
                this.members = members_data
                docs.forEach(doc => {
                    const member = this.members.find(m => doc.id == m.id)
                    member.title = doc.data().title
                })
            })
            .finally(() => this.loading = false)
    }

    get firebase_member_collection() {
        return collection(getFirestore(app), "members_data")
    }

    async edit(account: any) {

        const user_data = await getDoc(doc(this.firebase_member_collection, account.id))

        this.selected_member = {
            id: account.id,
            name: account.name
        }

        if (user_data.exists()) {
            Vue.set(this.selected_member_data, "bio", user_data.data().bio)
            Vue.set(this.selected_member_data, "title", user_data.data().title)
            Vue.set(this.selected_member_data, "linked_in_link", user_data.data().linked_in_link)
            if (user_data.data().has_image) {
                Vue.set(this.selected_member_data, "image_url",
                    await getDownloadURL(ref(getStorage(app), "member_pictures/" + account.id + ".avif")))
            }
        } else {
            this.resetSelected()
        }

        this.dialog = true
    }

    save() {
        if (this.selected_member.id) {
            const info_bar_store = useInfoBarStore()
            this.save_loading = true
            setDoc(doc(this.firebase_member_collection, this.selected_member.id!), {
                bio: this.selected_member_data.bio,
                title: this.selected_member_data.title || "",
                linked_in_link: this.selected_member_data.linked_in_link ||"",
            }, {merge: true})
                .then(async () => {
                    if (this.selected_member_data.image) {
                        return uploadBytes(ref(getStorage(app), `member_pictures/${this.selected_member.id}.avif`),
                            this.selected_member_data.image)
                            .then(() => setDoc(doc(this.firebase_member_collection, this.selected_member.id!), {
                                has_image: true
                            }, {merge: true}))
                            .catch(() => setDoc(doc(this.firebase_member_collection, this.selected_member.id!), {
                                has_image: false
                            }, {merge: true}))
                    } else {
                        return Promise.resolve()
                    }
                })
                .then(() => {
                    this.members.find((m) => m.id == this.selected_member.id)["title"] = this.selected_member_data.title
                    info_bar_store.show("success", "Saved")
                })
                .catch((error) => {
                    info_bar_store.show("error", error.message)
                })
                .finally(() => {
                    this.dialog = false
                    this.save_loading = false
                    this.resetSelected()
                })
        }
    }

    deleteImage() {
        deleteObject(ref(getStorage(app), `member_pictures/${this.selected_member.id}.avif`))
            .then(() => setDoc(doc(this.firebase_member_collection, this.selected_member.id!), {
                has_image: false
            }, {merge: true}))
            .then(() => {
                this.selected_member_data.image_url = ""
            })
    }

    resetSelected() {
        this.selected_member = {
            id: null,
            name: ""
        }
        this.selected_member_data = {
            bio: {
                sv: "",
                en: ""
            },
            title: "",
            linked_in_link: "",
            image: null as File | null,
            image_url: ""
        }
    }
}
</script>

<style lang="scss" scoped>
.actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
