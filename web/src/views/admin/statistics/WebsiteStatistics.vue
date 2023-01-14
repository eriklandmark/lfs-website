<template lang="pug">
    v-container
        v-row(justify="center")
            v-col(cols="12")
                v-card(:loading="loading" height="300px" ).fill-height
                    v-card-text.fill-height.pa-0.pb-2
                        line-chart(:y-data="users_y", :x-data="users_x" )
            v-col(cols="12" sm="12" md="6" lg="6")
                v-card(:loading="loading")
                    v-card-title {{ $t("admin.statistics.views_by_country") }}
                    v-card-text
                        world-chart(:data="website_user_by_country")

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BarChart from "@/components/charts/BarChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import WorldChart from "@/components/charts/WorldChart.vue";
import country_iso from "iso-3166-1"
import LineChart from "@/components/charts/LineChart.vue";

@Component({components: {LineChart, WorldChart, PieChart, BarChart}})
export default class WebsiteStatistics extends Vue {
    loading = true
    website_user_by_country: any = {}
    users_x: any = []
    users_y: any = [
        {
            data: [],
            name: "Total users",
        },
        {
            data: [],
            name: "Active users",
        },
        {
            data: [],
            name: "New users",
        }
    ]

    beforeMount() {
        fetch(process.env.NODE_ENV === 'development' ? 'http://localhost:3001/statistics/analytics' : "/api/v1/google/statistics/analytics")
            .then(res => res.json())
            .then(data => {
                this.website_user_by_country = data.reports
                    .find((report: any) => report.metricHeaders[0].name === "totalUsers" && report.dimensionHeaders[0].name === "country")
                    .rows
                    .reduce((acc: any, row: any) => {
                        acc[country_iso.whereCountry(row.dimensionValues[0].value)!.alpha2] = row.metricValues[0].value
                        return acc
                    }, {})

                data.reports.find((report: any) =>
                    report.metricHeaders[0].name === "totalUsers" && report.dimensionHeaders[0].name === "date")
                    .rows
                    .map((row: any) => ({
                        x: row.dimensionValues[0].value,
                        y0: parseInt(row.metricValues[0].value),
                        y1: parseInt(row.metricValues[1].value),
                        y2: parseInt(row.metricValues[2].value)
                    }))
                    .sort((a: any, b: any) => a.x.localeCompare(b.x))
                    .forEach(({x, y0,y1,y2}: { x: string, y0: number, y1: number,y2: number }) => {
                        const date = new Date(0);
                        date.setFullYear(parseInt(x.slice(0, 4)))
                        date.setMonth(parseInt(x.slice(4, 6)) - 1)
                        date.setDate(parseInt(x.slice(6)))
                        this.users_y[0].data.push(y0)
                        this.users_y[1].data.push(y1)
                        this.users_y[2].data.push(y2)
                        this.users_x.push(date.toLocaleDateString())
                    })
            }).finally(() => this.loading = false)
    }
}
</script>

<style lang="scss" scoped>

</style>
