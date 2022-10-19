<template lang="pug">
    .home
        v-carousel(
            v-model='carousel_model'
            height="calc(100vh - 100px)"
            cycle
            hide-delimiter-background
            show-arrows-on-hover)
            v-carousel-item()
                v-sheet(color="blue" height='100%')
                    .carousel-content
                        span Slide 1
            v-carousel-item()
                v-sheet(color="green" height='100%')
                    .carousel-content
                        span Slide 2
            v-carousel-item()
                v-sheet(color="red" height='100%')
                    .carousel-content
                        span Slide 3

        v-container
            v-row.my-16(align="center" )
                v-col(cols="12" md="6")
                    h1 {{$t('home.about_section.title')}}
                    span {{$t('home.about_section.description')}}
                    br
                    v-btn.mt-8(color="accent" dark large to="/about") {{$t('home.read_more_text')}}
                v-col(cols="12" md="6")
                    v-img(src="/images/cars/car-side.svg" contain alt="LFS car from side." max-height="30vh")
            v-row.my-16(align="center" )
                v-col(cols="12" md="6")
                    v-img(src="/images/cars/car-front.svg" contain alt="LFS car from the front." max-height="30vh" )
                v-col(cols="12" md="6")
                    h1 {{$t('home.contact_section.title')}}
                    span {{$t('home.contact_section.description')}}
                    br
                    v-btn.mt-8(color="accent" dark large to="/contact" ) {{$t('home.read_more_text')}}
            v-row.my-16(align="center" )
                v-col(cols="12" md="6")
                    h1 {{$t('home.partners_section.title')}}
                    span {{$t('home.partners_section.description')}}
                    br
                    v-btn.mt-8(color="accent" dark large to="/partners" ) {{$t('home.read_more_text')}}
                v-col(cols="12" md="6")
                    v-img(src="/images/cars/car-top.svg" contain alt="LFS car from the front." max-height="30vh" )
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
</style>
