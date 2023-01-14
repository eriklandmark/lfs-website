<template lang="pug">
    v-card(:loading="loading").fill-height
        v-card-title(style="height: 40%")
            .center-text(style="width: 100%") {{ title }}
        v-card-text.black--text.center-text
            h1.pb-5.py-2(style="font-size: 3em;") {{data}}
            div(v-if="changeData" style="font-size: 1.5em")
                span {{changeData}}
                v-icon(color="success") mdi-arrow-up-thin
            .mt-4(style="font-size: 0.8em") {{ descShort }}
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {TranslateResult} from "vue-i18n";

@Component({
    components: {},
})
export default class StatSingleValue extends Vue {
    @Prop({default: false}) loading!: boolean;
    @Prop({default: ""}) data!: any;
    @Prop({default: ""}) title!: string | TranslateResult;
    @Prop({default: null}) changeData!: any;
    @Prop({default: ""}) descShort!: string | TranslateResult;
}
</script>

<style lang="scss">

</style>
