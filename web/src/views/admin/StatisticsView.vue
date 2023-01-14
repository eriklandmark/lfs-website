<template lang="pug">
    .statistics
        v-card(flat)
            v-card-title {{ $t("admin.statistics.title") }}
            v-card-text
                v-tabs(v-model="tab" centered :show-arrows="$vuetify.breakpoint.smAndDown")
                    v-tab Instagram
                    v-tab Website
                    v-tab Google Search

                v-tabs-items(v-model="tab")
                    v-tab-item
                        instagram-statistics
                    v-tab-item
                        website-statistics
                    v-tab-item
                        google-search-statistics

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BarChart from "@/components/charts/BarChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import WorldChart from "@/components/charts/WorldChart.vue";
import country_iso from "iso-3166-1"
import WebsiteStatistics from "@/views/admin/statistics/WebsiteStatistics.vue";
import InstagramStatistics from "@/views/admin/statistics/InstagramStatistics.vue";
import GoogleSearchStatistics from "@/views/admin/statistics/GoogleSearchStatistics.vue";

@Component({
    components: {GoogleSearchStatistics, InstagramStatistics, WebsiteStatistics, WorldChart, PieChart, BarChart},
})
export default class StatisticsView extends Vue {
    tab = 0
}
</script>

<style lang="scss" scoped>

</style>
