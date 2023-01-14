<template lang="pug">
    #parallax-container(:style="style")
        v-sheet(:style="'background:' + overlayColor " height="100%" )
            slot
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class Parallax extends Vue {
    @Prop({default: ""}) src!: string;
    @Prop({default: ""}) alt!: string;
    @Prop({default: ""}) height!: string;
    @Prop({default: "rgba(3, 32, 64, 0.8)"}) overlayColor!: boolean;
    @Prop({default: "0px"}) offsetY!: string;

    mounted() {
        const parallax = document.getElementById("parallax-container")!;
        window.addEventListener("scroll",  () => {
            parallax.style.backgroundPositionY = `calc((${window.pageYOffset}px + ${this.offsetY}) * 0.7)`
        });
    }

    get style() {
        return `background-image: url(${this.src});
                background-position-y: ${this.offsetY};
                height: ${this.height}px;`;
    }
}
</script>

<style lang="scss">
#parallax-container {
    background-position-x: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}
</style>
