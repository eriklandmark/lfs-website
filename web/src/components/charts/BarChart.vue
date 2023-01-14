<template lang="pug">
    apexchart(:options="options" :series="[{data: data, name: 'Data'}]" height="100%")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class BarChart extends Vue {
    @Prop({required: true}) data!: any
    @Prop({default: "vertical" }) type!: string

    get options() {
        return {
            chart: {
                type: "bar",
                toolbar: {
                    show: false
                },
                height: "100%",
                offsetX: 0,
                offsetY: 0,
                parentHeightOffset: 0
            },
            labels: this.data.map((d: any) => d.x),
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: this.type === "horizontal",
                }
            },
            style: {
                fontFamily: "Raleway, serif",
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: true
                },
                y: {
                    title: {
                        formatter: (seriesName: any) => ""
                    }
                },
                marker: {
                    show: false
                }
            },
            grid: {
                show: false
            },
            xaxis: {
                tickPlacement: 'on',
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                labels: {
                    formatter: (val: number, index: number) => {
                        if(this.type !== "horizontal") {
                            return Math.floor(val)
                        } else {
                            return val
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">

</style>
