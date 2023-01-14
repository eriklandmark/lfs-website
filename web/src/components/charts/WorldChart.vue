<template lang="pug">
    v-row
        //v-col(cols="8")
            .world_chart(ref="world_chart" )
        v-col(cols="12")
            bar-chart(:data="bar_data", type="horizontal")

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import BarChart from "@/components/charts/BarChart.vue";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

@Component({
    components: {BarChart},
})
export default class WorldChart extends Vue {
    @Prop({required: true}) data!: any
    get bar_data() {
        return Object.entries(this.data).map(([country, value]: any) => ({x: country, y: value}))
    }

    async mounted() {
        /*
        const am5 = await import("@amcharts/amcharts5");
        const am5map = await import("@amcharts/amcharts5/map");

        let root = am5.Root.new(<HTMLElement> this.$refs["world_chart"]);
        let colors = am5.ColorSet.new(root, {});
        let chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "translateX",
            panY: "translateY",
            projection: am5map.geoMercator()
        }));

        let worldSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            exclude: ["AQ"],
        }));

        worldSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            toggleKey: "active",
            interactive: true,
            fill: am5.color(0xaaaaaa),
        });

        worldSeries.data.setAll(this.bar_data.map((data: any) => ({
            id: data.x,
            name: data.x,
            value: data.y,
            fill: am5.color(0x000000),
        })));

        worldSeries.mapPolygons.template.states.create("hover", {
            fill: colors.getIndex(9),
            tooltipText: "{name}: {value}"
        });*/
    }
}
</script>

<style lang="scss">
.world_chart {
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;

    canvas:nth-of-type(2) {
        display: none;
    }
}
</style>
