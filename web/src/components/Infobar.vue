<template lang="pug">
    v-snackbar(v-model='infobar_store.show_bar' :color="infobar_store.type" timeout="3000" top
        :style="'margin-top: ' + ($vuetify.breakpoint.mdAndUp? '104px':'60px')")
        span {{infobar_store.text}}
        template(v-slot:action='{ attrs }')
            v-btn(text='' v-bind='attrs' @click="infobar_store.show_bar = false") {{ $t('button.close') }}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {infobar_store} from "@/stores/infobar_store";

@Component({
    components: {},
})
export default class Infobar extends Vue {
    infobar_store = infobar_store()
}
</script>

<style lang="scss">

</style>
