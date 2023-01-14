<template lang="pug">
    apexchart(:options="options" :series="yData" height="100%")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class LineChart extends Vue {
    @Prop({required: true}) yData!: any
    @Prop({required: true}) xData!: any
    get options() {
        return {
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
                width: "100%",
                offsetX: 0,
                offsetY: 0,
                parentHeightOffset: 0
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            style: {
                fontFamily: "Raleway, serif"
            },
            xaxis: {
                type: 'datetime',
                categories: this.xData,
            },
            yaxis: {
                labels: {
                    formatter: (val: number, index: number) => Math.floor(val)
                }
            }
        }
    }
}
</script>

<style lang="scss">

</style>
