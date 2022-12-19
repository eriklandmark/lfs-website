<template lang="pug">
    .history
        v-container
            v-row.my-8(align="center" )
                v-col(cols="12" md="12")
                    h1 {{$t('history.title')}}
                    span {{$t('history.description')}}

                    v-timeline(:dense='$vuetify.breakpoint.smAndDown')
                        v-timeline-item(color='accent' fill-dot left)
                            template(v-slot:opposite)
                                h3 {{ $t('history.2022_autumn.title') }}
                            v-card
                                v-card-title(v-if="$vuetify.breakpoint.smAndDown") {{ $t('history.2022_autumn.title') }}
                                v-card-text(style="color: black !important") {{ $t('history.2022_autumn.description') }}
                        v-timeline-item(color='accent' fill-dot right)
                            template(v-slot:opposite)
                                h3 {{ $t('history.2022_summer.title') }}
                            v-card
                                v-card-title(v-if="$vuetify.breakpoint.smAndDown") {{ $t('history.2022_summer.title') }}
                                v-card-text(style="color: black !important") {{ $t('history.2022_summer.description') }}

            v-row.my-8(align="center" )
                v-col(cols="12" md="12")
                    h1 {{$t('history.earlier_cars.title')}}
                    span {{$t('history.earlier_cars.description')}}

                    v-timeline.mt-9(:dense='$vuetify.breakpoint.smAndDown')
                        v-timeline-item(color='accent' fill-dot left)
                            template(v-slot:opposite)
                                h3 {{ $t('history.2007.title') }}
                            v-card
                                v-card-title(v-if="$vuetify.breakpoint.smAndDown") {{ $t('history.2007.title') }}
                                v-card-text
                                    v-img(src="/images/cars/car_2007_profile.jpg" contain alt="" max-height="250px")
                                v-card-text(style="color: black !important") {{ $t('history.2007.description') }}
                                v-card-text(style="color: black !important")
                                    span.font-weight-bold {{ $t('history.car_specs.title') }}
                                    br
                                    span {{ $t('history.car_specs.weight', {weight: 195.5}) }}
                                    br
                                    span {{ $t('history.car_specs.engine', {engine: "Yamaha YXFR6"}) }}
                                    br
                                    span {{ $t('history.car_specs.hp', {hp: 98}) }}
                                    br
                                    span {{ $t('history.car_specs.torque', {torque: 68}) }}
                                    br
                                    span {{ $t('history.car_specs.zeroToHundred', {zeroToHundred: 3.6}) }}
                                    br
                                    span {{ $t('history.car_specs.topSpeed', {topSpeed: 135}) }}
                                    br

                        v-timeline-item(color='accent' fill-dot right)
                            template(v-slot:opposite)
                                h3 {{ $t('history.2006.title') }}
                            v-card
                                v-card-title(v-if="$vuetify.breakpoint.smAndDown") {{ $t('history.2006.title') }}
                                //v-card-text
                                    v-img(src="/images/cars/car-empty.jpg" contain alt="" max-height="250px")
                                v-card-text(style="color: black !important") {{ $t('history.2006.description') }}
                                v-card-text(style="color: black !important")
                                    span.font-weight-bold {{ $t('history.car_specs.title') }}
                                    br
                                    span {{ $t('history.car_specs.weight', {weight: 180}) }}
                                    br
                                    span {{ $t('history.car_specs.engine', {engine: "Yamaha YXFR6 utan turbo"}) }}
                                    br
                                    span {{ $t('history.car_specs.hp', {hp: 90}) }}
                                    br

                        v-timeline-item(color='accent' fill-dot left)
                            template(v-slot:opposite)
                                h3 {{ $t('history.2005.title') }}
                            v-card
                                v-card-title(v-if="$vuetify.breakpoint.smAndDown") {{ $t('history.2005.title') }}
                                v-card-text
                                    v-img(src="/images/cars/car_2005_profile.jpg" contain alt="" max-height="250px")
                                v-card-text(style="color: black !important") {{ $t('history.2005.description') }}
                                v-card-text(style="color: black !important")
                                    span.font-weight-bold {{ $t('history.car_specs.title') }}
                                    br
                                    span {{ $t('history.car_specs.weight', {weight: 195}) }}
                                    br
                                    span {{ $t('history.car_specs.engine', {engine: "Yamaha YXFR6 med turbo"}) }}
                                    br
                                    span {{ $t('history.car_specs.hp', {hp: "ca 100"}) }}
                                    br
            v-row.my-8(align="center")
                v-col
                    h1.mb-4 {{$t('about.links.title')}}
                    ul
                        li(v-for="link in links" :key="link.title")
                            a(:href="link.href" target="_blank") {{ link.title }}


</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class HistoryView extends Vue {
    links = [
        {
            title: "https://www.nyteknik.se/fordon/studenter-start-your-engines-6413179",
            href: "https://www.nyteknik.se/fordon/studenter-start-your-engines-6413179"
        },
        {
            title: "https://rejsa.nu/forum/viewtopic.php?t=28732",
            href: "https://rejsa.nu/forum/viewtopic.php?t=28732"
        }
    ]
}
</script>

<style lang="scss" scoped>

</style>
