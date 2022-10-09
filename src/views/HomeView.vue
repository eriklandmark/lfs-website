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
                    h1 Om Oss
                    span Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.
                    br
                    v-btn.mt-8(color="accent" dark large to="/about") Läs mer
                v-col(cols="12" md="6")
                    v-img(src="/images/cars/car-side.svg" contain alt="LFS car from side." max-height="30vh")
            v-row.my-16(align="center" )
                v-col(cols="12" md="6")
                    v-img(src="/images/cars/car-front.svg" contain alt="LFS car from the front." max-height="30vh" )
                v-col(cols="12" md="6")
                    h1 Partners
                    span Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nunc.
                    br
                    v-btn.mt-8(color="accent" dark large to="/partners" ) Läs mer
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
