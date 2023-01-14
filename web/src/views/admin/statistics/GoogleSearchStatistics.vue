<template lang="pug">
    v-container
        v-row(justify="center")
            v-col(cols="12" sm="6" md="4" lg="3")
                stat-single-value(
                    :data="tot_clicks"
                    :loading="loading"
                    :desc-short="$t('admin.statistics.google_search.total_clicks_desc')"
                    :title="$t('admin.statistics.google_search.total_clicks')")
            v-col(cols="12" sm="6" md="4" lg="3")
                stat-single-value(
                    :data="tot_impressions"
                    :loading="loading"
                    :desc-short="$t('admin.statistics.google_search.total_impressions_desc')"
                    :title="$t('admin.statistics.google_search.total_impressions')")
            v-col(cols="12" sm="6" md="4" lg="3")
                stat-single-value(
                    :data="tot_ctr"
                    :loading="loading"
                    :desc-short="$t('admin.statistics.google_search.total_ctr_desc')"
                    :title="$t('admin.statistics.google_search.total_ctr')")
            v-col(cols="12" sm="6" md="4" lg="3")
                stat-single-value(
                    :data="average_position"
                    :loading="loading"
                    :desc-short="$t('admin.statistics.google_search.average_position_desc')"
                    :title="$t('admin.statistics.google_search.average_position')")
        v-row(justify="center")
            v-col(cols="12")
                v-card(:loading="loading" max-height="400px").fill-height
                    v-card-title {{ $t("admin.statistics.google_search.chart_title") }}
                    v-card-text().fill-height.pa-0.pb-2
                        line-chart(:y-data="date_data_y", :x-data="date_data_x" )
        v-row(justify="center")
            v-col(cols="12")
                v-card(:loading="loading").fill-height
                    v-card-title {{ $t("admin.statistics.google_search.chart_title") }}
                    v-card-text.pa-0
                        v-tabs(v-model="table_data_tab" :grow="false"
                            :show-arrows="$vuetify.breakpoint.smAndDown")
                            v-tab Query
                            v-tab Date
                            v-tab Page
                            v-tab Device
                            v-tab Country
                            v-tab Search Appearance
                        v-data-table(
                            :headers="table_headers"
                            :items="table_data"
                            :search="table_search"
                            :loading="table_loading"
                            :items-per-page="15"
                            :footer-props="{ itemsPerPageOptions: [5, 15, 25, { text: $t('dropdown.all'), value: -1 }] }"
                            item-key="id")

                            template(v-slot:top)
                                v-toolbar(flat color="white")
                                    v-text-field(
                                        style="min-width: 250px",
                                        v-model="table_search"
                                        append-icon="mdi-magnify"
                                        label="Search"
                                        clearable
                                        single-line
                                        hide-details)

                            template(v-slot:header.key="{ header }")
                                | {{ table_data_keys[table_data_tab].toLocaleUpperCase() }}

</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import BarChart from "@/components/charts/BarChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import WorldChart from "@/components/charts/WorldChart.vue";
import country_iso from "iso-3166-1"
import LineChart from "@/components/charts/LineChart.vue";
import StatSingleValue from "@/components/StatSingleValue.vue";

@Component({components: {StatSingleValue, LineChart, WorldChart, PieChart, BarChart}})
export default class WebsiteStatistics extends Vue {
    loading = true
    tot_clicks = 0
    tot_impressions = 0
    tot_ctr = ""
    average_position = ""
    date_data_x: any[] = []
    date_data_y: any[] = [
        {name: this.$t("admin.statistics.google_search.total_clicks"), data: []},
        {name: this.$t("admin.statistics.google_search.total_impressions"), data: []}
    ]
    table_data_tab = 0
    table_data_keys = ["query", "date,query", "page", "device", "country", "search_appearance"]
    table_data = []

    table_search = ""
    table_loading = true

    get api_url() {
        return process.env.NODE_ENV === 'development' ? 'http://localhost:3001/statistics/search' : "/api/v1/google/statistics/search"
    }

    get table_headers() {
        return [
            {text: "Key", value: "key"},
            (this.table_data_keys[this.table_data_tab] == "date,query"? {text: "Query", value: "query"}: []),
            {text: this.$t("admin.statistics.google_search.total_clicks"), value: "clicks"},
            {text: this.$t("admin.statistics.google_search.total_impressions"), value: "impressions"},
            {text: "CTR", value: "ctr"},
            {text: this.$t("admin.statistics.google_search.average_position"), value: "average_position"}
        ].flat()
    }

    beforeMount() {
        Promise.all([
            fetch(this.api_url)
                .then(res => res.json())
                .then(data => {
                    this.tot_clicks = data.clicks
                    this.tot_impressions = data.impressions
                    this.tot_ctr = (data.ctr * 100).toFixed(2)
                    this.average_position = data.position.toFixed(2)
                }),

            fetch(this.api_url + "/date")
                .then(res => res.json())
                .then(data => {
                    this.date_data_x = data.rows.map((row: any) => new Date(row.keys[0]).toLocaleDateString())
                    this.date_data_y[0].data = data.rows.map((row: any) => row.clicks)
                    this.date_data_y[1].data = data.rows.map((row: any) => row.impressions)
                }),
            this.load_table_data()
        ])
            .finally(() => this.loading = false)
    }

    @Watch('table_data_tab')
    async load_table_data() {
        this.table_loading = true
        return fetch( this.api_url + "/" + this.table_data_keys[this.table_data_tab])
            .then(res => res.json())
            .then(data => {
                if (data.rows) {
                    this.table_data = data.rows.map((row: any, index: number) => {
                        return {
                            id: index,
                            key: row.keys[0],
                            query: row.keys.length > 1? row.keys[1]: null,
                            clicks: row.clicks,
                            impressions: row.impressions,
                            ctr: (row.ctr * 100).toFixed(2),
                            average_position: row.position.toFixed(2)
                        }
                    })
                } else {
                    this.table_data = []
                }
            })
            .finally(() => this.table_loading = false)
    }
}
</script>

<style lang="scss" scoped>

</style>
