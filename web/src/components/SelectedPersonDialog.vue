<template lang="pug">
    v-dialog(v-model="dialog" :max-width="selectedPerson.hasOwnProperty('texts')? '1000px':'500px'"
        max-height="400px")
        template(v-if="!selectedPerson.hasOwnProperty('texts')")
            v-img(v-if="selectedPerson['avatar'] !== 'none'" :src="selectedPerson.avatar" height="100%")
            .no-selected-avatar(v-else)
                v-icon.icon(size="200" ) mdi-account
        v-row.ma-0(v-else style="background-color: #fff")
            v-col.pa-0(sm="6")
                v-img(v-if="selectedPerson['avatar'] !== 'none'" :src="selectedPerson.avatar" height="100%")
                .no-selected-avatar(v-else)
                    v-icon.icon(size="200" ) mdi-account
                    v-card-title.black--text.font-weight-bold
                        span {{selectedPerson.name}}
                        v-spacer
                        v-btn(v-if="selectedPerson['linkedin']" :href="selectedPerson.linkedin" target="_blank"
                            icon x-large)
                            v-icon(large color="accent" ) mdi-linkedin
            v-col.pa-0(sm="6")
                v-card(style="overflow: auto;" height="100%" )
                    v-card-title.black--text.font-weight-bold
                        span {{selectedPerson.name}}
                        v-spacer
                        v-btn(v-if="selectedPerson['linkedin']" :href="selectedPerson.linkedin" target="_blank"
                            icon x-large)
                            v-icon(large color="accent" ) mdi-linkedin
                    v-card-subtitle {{selectedPerson.title}}
                    v-card-text(v-if="selectedPerson.hasOwnProperty('texts')").black--text
                        p(v-for="text in selectedPerson.texts") {{text}}
                    v-card-actions(v-if="$vuetify.breakpoint.xs")
                        v-spacer
                        v-btn(color="primary" @click="dialog = false" text) {{$t('button.close')}}

</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class SelectedPersonDialog extends Vue {
    @VModel() dialog!: boolean;
    @Prop() selectedPerson!: any
}
</script>

<style lang="scss">

</style>
