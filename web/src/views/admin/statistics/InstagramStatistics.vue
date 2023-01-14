<template lang="pug">
    v-container
        v-row(justify="center")
            v-col(cols="12" sm="6" md="5" lg="3")
                stat-single-value(:data="follower_count_tot" :change-data="new_followers_last_week"
                    :desc-short="$t('admin.statistics.new_followers_last_week')"
                    :title="$t('admin.statistics.followers')")
            v-col(cols="12" sm="6" md="5" lg="3")
                v-card(:loading="loading").fill-height
                    v-card-title {{ $t("admin.statistics.follower_count_last_week") }}
                    v-card-text.pa-0
                        bar-chart(:data="follower_count_last_week")
            v-col(cols="12" sm="6" md="5" lg="3")
                v-card(:loading="loading").fill-height
                    v-card-title {{ $t("admin.statistics.profile_views_last_week") }}
                    v-card-text.pa-0
                        bar-chart(:data="profile_views_last_week")
            v-col(cols="12" sm="6" md="5" lg="3")
                v-card(:loading="loading").fill-height
                    v-card-title {{ $t("admin.statistics.reach_last_week") }}
                    v-card-text.pa-0
                        bar-chart(:data="reach_last_week")
        v-row(justify="center")
            v-col(cols="12" sm="12" md="6" lg="6")
                v-card(:loading="loading").fill-height
                    v-card-title {{ $t("admin.statistics.members_count") }}
                    v-card-text
                        world-chart(:data="audience_country")

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BarChart from "@/components/charts/BarChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import WorldChart from "@/components/charts/WorldChart.vue";
import country_iso from "iso-3166-1"
import StatSingleValue from "@/components/StatSingleValue.vue";

@Component({components: {StatSingleValue, WorldChart, PieChart, BarChart}})
export default class InstagramStatistics extends Vue {
    loading = false
    day_letters = ["Sö", "Mo", "Ti", "On", "To", "Fr", "Lö"]
    audience_country = {}
    follower_count_last_week = []
    profile_views_last_week = []
    reach_last_week = []
    follower_count_tot = 0
    media_count_tot = 0
    new_followers_last_week = 0

    beforeMount() {
        this.loading = true
        fetch(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/statistics' : "/api/v1/instagram/statistics")
            .then(res => res.json())
            .then(data => {
                this.follower_count_last_week = data.find((item: any) => item.name === "follower_count").values
                    .map((point: any) => ({x: this.day_letters[new Date(point.end_time).getDay()], y: point.value}))
                this.new_followers_last_week = this.follower_count_last_week.reduce((acc, point: any) => acc += point.y, 0)
                this.audience_country = data.find((item: any) => item.name === "audience_country").values[0].value
                this.profile_views_last_week = data.find((item: any) => item.name === "profile_views").values
                    .map((point: any) => ({x: this.day_letters[new Date(point.end_time).getDay()], y: point.value}))
                this.reach_last_week = data.find((item: any) => item.name === "reach").values
                    .map((point: any) => ({x: this.day_letters[new Date(point.end_time).getDay()], y: point.value}))
                const business_discovery = data.find((item: any) => item.hasOwnProperty("business_discovery")).business_discovery
                this.follower_count_tot = business_discovery.followers_count
                this.media_count_tot = business_discovery.media_count
            })
            .finally(() => this.loading = false)
    }
}
</script>

<style lang="scss" scoped>

</style>
