<template lang="pug">
    .home
        v-carousel(
            v-model='carousel_model'
            :height="$vuetify.breakpoint.smAndDown? 'calc(100vh - 56px)': 'calc(100vh - 100px)'"
            cycle
            hide-delimiter-background
            show-arrows-on-hover
            interval="10000"
            )

            v-carousel-item
                v-card(height='100%' flat).no-rounded-corners
                    v-img(src="/images/cars/car_2007_back_zoom.jpg" height='100%')
                        v-sheet(style="background: rgba(3, 32, 64, 0.8)" height="100%" )
                            v-container.fill-height
                                v-row.my-16(align="center" justify="start" )
                                    v-col(cols="12" md="6")
                                        v-sheet(color="transparent" dark)
                                            v-card-title(style="font-size: 2em").font-weight-bold {{$t('home.history_section.title')}}
                                            v-card-text(style="font-size: 1.2em") {{$t('home.history_section.description')}}
                                            v-card-actions.align-center
                                                v-spacer
                                                v-btn.mt-5.px-6(color="primary" dark large to="/history") {{$t('home.read_more_text')}}
                                                v-spacer

            v-carousel-item
                v-card(height='100%' flat).no-rounded-corners
                    v-img(src="/images/cars/car_2007_side.jpg" height='100%')
                        v-sheet(style="background: rgba(3, 32, 64, 0.8)" height="100%" )
                            v-container.fill-height
                                v-row.my-16(align="center" justify="end" )
                                    v-col(cols="12" md="6")
                                        v-sheet(color="transparent" dark)
                                            v-card-title(style="font-size: 2em").font-weight-bold {{$t('home.recruit_section.title')}}
                                            v-card-text(style="font-size: 1.2em") {{$t('home.recruit_section.description')}}
                                            v-card-actions.align-center
                                                v-spacer
                                                v-btn.mt-5.px-6(color="primary" dark large to="/recruitment") {{$t('home.read_more_text')}}
                                                v-spacer

            v-carousel-item
                v-card(height='100%' flat).no-rounded-corners
                    v-img(src="/images/slideshow_bgs/ss_bg_1.jpg" height='100%')
                        v-sheet(style="background: rgba(3, 32, 64, 0.9)" height="100%" )
                            v-container.fill-height
                                v-row.my-16(align="center" justify="start" )
                                    v-col(cols="12" md="6")
                                        v-sheet(color="transparent" dark)
                                            v-card-title(style="font-size: 2em").font-weight-bold {{$t('home.started_section.title')}}
                                            v-card-text(style="font-size: 1.2em") {{$t('home.started_section.description')}}
                                            v-card-actions.align-center
                                                v-spacer
                                                v-btn.mt-5.px-6(color="primary" dark large to="/about") {{$t('home.read_more_text')}}
                                                v-spacer

        v-container
            v-row.my-16(align="center")
                v-col(cols="12" md="6")
                    h1 {{$t('home.about_section.title')}}
                    span {{$t('home.about_section.description')}}
                    br
                    v-btn.mt-8(color="accent" dark large to="/about") {{$t('home.read_more_text')}}
                v-col(cols="12" md="6")
                    v-img(src="/images/cars/car-side.svg" contain alt="Car from side." max-height="30vh")
            v-row.my-16(align="center")
                v-col(cols="12" md="6")
                    v-img(src="/images/cars/car-front.svg" contain alt="Car from the front." max-height="30vh" )
                v-col(cols="12" md="6")
                    h1 {{$t('home.contact_section.title')}}
                    span {{$t('home.contact_section.description')}}
                    br
                    v-btn.mt-8(color="accent" dark large to="/contact" ) {{$t('home.read_more_text')}}
            //v-row.my-16(justify="center")
                v-col(cols="12" md="12")
                    v-card(width="100%" )
                        v-card-text
                            iframe(src='https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FBerlin&showNav=1&showTitle=0&showTz=0&showCalendars=0&showTabs=0&showPrint=0&showDate=1&mode=WEEK&src=Y2MzZjJiYzRhOTY5N2M5OGQ4MzIxYjVmN2FkMDIxYTBiMThmZTNkZjkzZGIyMjhkZDQwMDc1ZmQ2ZjdlZGE3MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E'
                                style='border-width:0'
                                width='100%'
                                height='600'
                                frameborder='0'
                                scrolling='no')

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class HomeView extends Vue {
    carousel_model = 0;
}
</script>

<style lang="scss">
.carousel-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 4rem;
}

.no-rounded-corners {
    border-radius: 0 !important;
}
</style>
