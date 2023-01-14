<template lang="pug">
    apexchart(:options="options" :series="data")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class PieChart extends Vue {
    @Prop({required: true}) data!: any
    @Prop({required: true}) labels!: any

    get options() {
        return {
            chart: {
                type: 'donut',
            },
            labels: this.labels,
            theme: {
                monochrome: {
                    enabled: true
                }
            },
        }
    }
}
</script>

<style lang="scss">

</style>
