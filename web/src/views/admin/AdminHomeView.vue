<template lang="pug">
    v-card(flat)
        v-card-title {{ $t("admin.home.title") }}
        v-card-text {{ $t("admin.home.description") }}
        v-card-text
            v-container
                v-row
                    v-col(cols="12" sm="6" md="6" lg="6")
                        stat-single-value(:data="members_count" :title="$t('admin.home.members_count')" :loading="loading")
                    v-col(cols="12" sm="6" md="6" lg="6")
                        stat-single-value(:data="teams_count" :title="$t('admin.home.teams_count')" :loading="loading")
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import StatSingleValue from "@/components/StatSingleValue.vue";
import {account_store} from "@/stores/account_store";

@Component({
    components: {StatSingleValue},
})
export default class AdminHomeView extends Vue {
    members_count: number = 0
    teams_count: number = 0
    loading: boolean = true

    account_store = account_store()

    beforeMount() {
        Promise.all([
            this.account_store.request("accounts").then((members: any) => {
                this.members_count = members.length
            }),
            this.account_store.request("groups").then((teams: any) => {
                this.teams_count = teams.length
            })
        ]).finally(() => this.loading = false)

    }
}
</script>

<style lang="scss" scoped>
</style>
