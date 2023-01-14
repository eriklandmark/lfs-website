<template lang="pug">
    v-card(flat)
        v-dialog(dialog v-model="dialog" max-width="500px")
            v-card
                v-card-title Edit Team:
                v-card-text
                    v-tabs(v-model="tab" centered).mb-4
                        v-tab(href="#sv") Swedish
                        v-tab(href="#en") English
                    v-text-field(v-model="selected_team_data.name[tab]"
                        label="Display Team Name"
                        outlined)
                    v-textarea.textarea(v-model="selected_team_data.description[tab]"
                        label="Description"
                        rows="5"
                        auto-grow
                        outlined)
                    v-row()
                        v-col(cols="12" sm="2").items-center
                            template(v-if="selected_team_data.image_url")
                                v-img(:src="selected_team_data.image_url" contain max-width="100px" max-height="100px" width="100%" )
                            template(v-else)
                                v-icon(size="50" ) mdi-account-circle
                        v-col(cols="12" sm="10")
                            v-file-input(v-model="selected_team_data.image"
                                prepend-icon=""
                                outlined
                                accept="image/avif"
                                hide-details
                                placeholder="Ladda upp profilbild här" )
                v-card-actions
                    v-spacer
                    v-btn(color="blue darken-1" text @click="dialog = false") Cancel
                    v-btn(color="blue darken-1" text @click="save" :loading="save_loading") Save

        v-card-title {{ $t("admin.teams.title") }}
        v-card-text {{ $t("admin.teams.description") }}
        v-card-text
            v-data-table.elevation-2(
                :headers="headers"
                :items="teams"
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
import {collection, doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "@/plugins/firebase";
import {useInfoBarStore} from "@/stores/infobar_store";

@Component({
    components: {},
})
export default class TeamsView extends Vue {
    account_store = account_store()
    dialog = false
    tab = "sv"
    headers = [
        {text: this.$t("admin.teams.name"), value: "name"},
        {text: this.$t("admin.teams.number_of_members"), value: "membersCount"},
        {text: "", value: "actions", sortable: false},
    ]
    teams = []
    search = ""
    loading = false
    save_loading = false
    selected_team_id = ""
    selected_team_data = {
        name: {
            sv: "",
            en: ""
        },
        description: {
            sv: "",
            en: ""
        },
        image: null as File | null,
        image_url: ""
    }

    async mounted() {
        if (this.account_store.is_logged_in) {
            await this.initialize()
        } else {
            this.account_store.onAuthStateChanged(() => this.initialize())
        }
    }

    async initialize() {
        this.loading = true
        this.teams = await this.account_store.request("groups")
        this.loading = false
    }

    get firebase_team_collection() {
        return collection(getFirestore(app), "teams_data")
    }

    async edit(account: any) {
        const user_data = await getDoc(doc(this.firebase_team_collection, account.id))

        this.selected_team_id = account.id

        if (user_data.exists()) {
            Vue.set(this.selected_team_data, "description", user_data.data().description)
            Vue.set(this.selected_team_data, "name", user_data.data().name)
            if (user_data.data().has_image) {
                Vue.set(this.selected_team_data, "image_url",
                    await getDownloadURL(ref(getStorage(app), "team_pictures/" + account.id + ".avif")))
            }
        } else {
            this.resetSelected()
        }

        this.dialog = true
    }

    save() {
        if (this.selected_team_id) {
            const info_bar_store = useInfoBarStore()
            this.save_loading = true
            setDoc(doc(this.firebase_team_collection, this.selected_team_id), {
                description: this.selected_team_data.description,
                name: this.selected_team_data.name
            }, {merge: true})
                .then(async () => {
                    if (this.selected_team_data.image) {
                        return uploadBytes(ref(getStorage(app), `team_pictures/${this.selected_team_id}.avif`),
                            this.selected_team_data.image)
                            .then(() => setDoc(doc(this.firebase_team_collection, this.selected_team_id), {
                                has_image: true
                            }, {merge: true}))
                            .catch(() => setDoc(doc(this.firebase_team_collection, this.selected_team_id), {
                                has_image: true
                            }, {merge: true}))
                    } else {
                        return Promise.resolve()
                    }
                })
                .then(() => {
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

    resetSelected() {
        this.selected_team_id = ""
        this.selected_team_data = {
            name: {
                sv: "",
                en: ""
            },
            description: {
                sv: "",
                en: ""
            }, image: null, image_url: ""
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
