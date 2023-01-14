<template lang="pug">
    .admin-view.py-5
        .tabs.px-4
            v-list.py-0
                v-list-item(to="/admin/home")
                    v-list-item-content
                        v-list-item-title {{ $t("admin.nav.home") }}
                v-list-item(to="/admin/statistics")
                    v-list-item-content
                        v-list-item-title {{ $t("admin.nav.statistics") }}
                v-list-item(to="/admin/members")
                    v-list-item-content
                        v-list-item-title {{ $t("admin.nav.org.members_title") }}
                v-list-item(to="/admin/teams")
                    v-list-item-content
                        v-list-item-title {{ $t("admin.nav.org.teams_title") }}

        .tab-content.px-4
            template(v-if="tab === 'home'")
                admin-home-view
            template(v-if="tab === 'statistics'")
                StatisticsView
            template(v-if="tab === 'members'")
                MembersView
            template(v-if="tab === 'teams'")
                TeamsView
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import MembersView from "@/views/admin/MembersView.vue";
import TeamsView from "@/views/admin/TeamsView.vue";
import StatisticsView from "@/views/admin/StatisticsView.vue";
import AdminHomeView from "@/views/admin/AdminHomeView.vue";

@Component({
    components: {AdminHomeView, StatisticsView, TeamsView, MembersView},
})
export default class AdminView extends Vue {
    tab: string = "home"

    beforeMount() {
        this.tab = this.$route.params.page || "home"
    }

    @Watch("$route")
    onRouteChange() {
        this.tab = this.$route.params.page || "home"
    }
}
</script>

<style lang="scss">
.admin-view {
    box-sizing: border-box;
    width: 100%;

    @media (min-width: 600px) {
        display: grid;
        grid-template-columns: 256px 1fr;
    }

    .tabs {
        @media (min-width: 600px) {
            border-right: lightgray solid 2px;
        }
    }

    .tab-content {
        min-height: 100vh;
    }
}
</style>
