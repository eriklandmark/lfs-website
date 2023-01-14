<template lang="pug">
    v-dialog(v-model="dialog" :max-width="getBioParagraphs.length? '800px':'400px'" )
        template(v-if="!getBioParagraphs.length")
            v-card
                v-img(v-if="selectedPerson['avatar'] !== 'none'" :src="selectedPerson.avatar" height="100%")
                    v-card-title.black--text.font-weight-bold
                        span {{selectedPerson.name}}
                        v-spacer
                        v-btn(v-if="selectedPerson['linked_in_link']" :href="selectedPerson.linked_in_link" target="_blank"
                            icon x-large)
                            v-icon(large color="accent" ) mdi-linkedin
                .no-selected-avatar(v-else)
                    v-card-title.black--text.font-weight-bold
                        span {{selectedPerson.name}}
                        v-spacer
                        v-btn(v-if="selectedPerson['linked_in_link']" :href="selectedPerson.linked_in_link" target="_blank"
                            icon x-large)
                            v-icon(large color="accent" ) mdi-linkedin
                    v-icon.icon(size="200") mdi-account
                v-card-subtitle.pa-4.card-subtitle
                    span(v-if="selectedPerson.title") {{$tc('about.team.titles.' + selectedPerson.title, 0)}}
                    span(style="float:right")
                        a(:href="'mailto:' + selectedPerson.email") {{selectedPerson.email}}
                        v-icon(right) mdi-email
        v-row.ma-0(v-else)
            v-col.pa-0(sm="6")
                v-img(v-if="selectedPerson['avatar'] !== 'none'" :src="selectedPerson.avatar" height="100%")
                .no-selected-avatar(v-else)
            v-col.pa-0(sm="6")
                v-card(style="overflow: auto;" height="100%" tile max-height="500px" )
                    v-card-title.black--text.font-weight-bold
                        span {{selectedPerson.name}}
                        v-spacer
                        v-btn(v-if="selectedPerson['linked_in_link']" :href="selectedPerson.linked_in_link" target="_blank"
                            icon x-large)
                            v-icon(large color="accent" ) mdi-linkedin
                    v-card-subtitle(style="line-height:2em") {{$tc('about.team.titles.' + selectedPerson.title, 0)}}
                        br
                        v-icon(left) mdi-email
                        a(:href="'mailto:' + selectedPerson.email") {{selectedPerson.email}}
                    v-card-text(v-if="getBioParagraphs.length").black--text
                        p(v-for="text in getBioParagraphs") {{text}}
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
    @Prop() selectedPerson!: {
        name: string,
        title: string,
        avatar: string,
        linked_in_link: string,
        email: string,
        bio: {
            sv: string,
            en: string,
        }
    }

    get language() {
        return this.$i18n.locale || 'sv'
    }

    get getBioParagraphs() {
        if (this.selectedPerson.hasOwnProperty('bio') && this.selectedPerson.bio.hasOwnProperty(this.language)) {
            return (<any> this.selectedPerson.bio)[this.language]
                .split(/\r\n|\n|\r/)
                .filter((text: string) => text.length > 0)
        } else {
            return []
        }
    }
}
</script>

<style lang="scss" scoped>
.card-subtitle::after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
}

.no-selected-avatar {
    height: 500px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-content: center;

    .icon {
        align-self: center;
        margin: auto 0;
    }

}
</style>
