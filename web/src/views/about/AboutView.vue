<template lang="pug">
    .about
        v-card.no-rounded-corners(dark flat)
            parallax(src="/images/profile_pictures/whole_team.avif" height="300" offset-y="-7vw" )
                v-container(fill-height)
                    v-row()
                        v-col.center-text(cols="12" md="12")
                            h1 {{$t('about.title')}}
        v-container
            v-row(align="center")
                v-col(cols="12" md="12")
                    .my-5 {{$t('about.description')}}
            v-row(justify="center" ).px-10.mb-8
                v-col(cols="11" lg="8" xl="7" md="7" sm="10")
                    v-row(justify="center")
                        v-col.expand-on-hover(v-if="loading" cols="12" sm="6" md="6" lg="4" xl="4")
                            v-skeleton-loader(type="image" style="aspect-ratio: 1/1" height="100%" tile)
                        v-col.expand-on-hover(v-else cols="12" sm="6" md="6" lg="4" xl="4")
                            v-card.team-card.no-rounded-corners(color="accent" dark to="/about/board")
                                v-container(fill-height)
                                    v-row
                                        v-col.center-text(cols="12" md="12")
                                            //v-icon mdi-account
                                            h2 {{board.name[language]}}
            v-row(justify="center").px-10.mb-8
                v-col(cols="11" lg="8" xl="7" md="7" sm="10")
                    h1.center-text {{$t('about.team.title')}}
                    v-row.mt-4(justify="center")
                        template(v-if="loading")
                            v-col(v-for="i in 6" :key="i" cols="12" sm="6" md="6" lg="4" xl="4")
                                v-skeleton-loader(type="image" style="aspect-ratio: 1/1" height="100%" tile)
                        template(v-else)
                            v-col.expand-on-hover(v-for="team in teams" :key="team.title" cols="12" sm="6" md="6" lg="4" xl="4")
                                v-card.no-rounded-corners.team-card(color="accent" dark :to="'/about/' + teams_href[team.id].href")
                                    v-container(fill-height)
                                        v-row
                                            v-col.center-text(cols="12" md="12")
                                                //v-icon mdi-account
                                                h2 {{team.name[language]}}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Parallax from "@/components/Parallax.vue";
import {collection, doc, getDoc, getFirestore} from "firebase/firestore";
import app from "@/plugins/firebase";
import {account_store} from "@/stores/account_store";

@Component({
    components: {Parallax},
})
export default class AboutView extends Vue {
    account_store = account_store()
    teams_href = {
        "00sqyw643ttn6ts": {
            href: "board",
        },
        "03s49zyc3flbu9b": {
            href: "administration",
        },
        "026in1rg4hte230": {
            href: "aerodynamics",
        },
        "02jxsxqh22ygqau": {
            href: "chassis",
        },
        "01hmsyys3hnp4xx": {
            href: "low-voltage",
        },
        "0279ka6512lqhtr": {
            href: "power-train",
        },
        "03ep43zb308ehwq": {
            href: "vehicle-dynamics",
        }
    }

    loading = true

    groups: any[] = []

    get language() {
        return this.$i18n.locale
    }
    get board() {
        return this.groups.find(team => team.id === "00sqyw643ttn6ts")
    }
    get teams() {
        return this.groups.filter(team => team.id !== "00sqyw643ttn6ts")
    }
    get firebase_teams_collection() {
        return collection(getFirestore(app), "teams_data")
    }
    beforeMount() {
        this.account_store.request("groups")
            .then((teams: any[]) => {
                    return Promise.all(teams.map(async (team: any) => {
                        return getDoc(doc(this.firebase_teams_collection, team.id))
                            .then((doc) => doc.exists() ? {...team, ...doc.data()} : team)
                    }))
                }
            ).then((teams) => this.groups = teams)
            .finally(() => this.loading = false)
    }

}
</script>

<style lang="scss" scoped>
.team-card {
    aspect-ratio: 1/1;
    width: 100%;
}
</style>
