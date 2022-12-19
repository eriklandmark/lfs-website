<template lang="pug">
    .ig_feed
        v-dialog(v-model="dialog" max-width="65vw" max-height="400px")
            v-row.ma-0(style="background-color: #fff")
                v-col.pa-0(sm="6")
                    v-img(:src="selected_post.media_url" height="100%")
                v-col.pa-0(sm="6")
                    v-card(style="overflow: auto;" height="100%" )
                        v-card-title.black--text.font-weight-bold
                            v-icon(left color="red") mdi-heart
                            span {{selected_post.like_count}}
                            v-spacer
                            v-btn(icon :href="selected_post.permalink" target="_blank" x-large)
                                v-icon(large) mdi-instagram
                        v-card-text().black--text
                            p(v-for="text in get_paragraphs(selected_post)") {{text}}
                        v-card-actions(v-if="$vuetify.breakpoint.xs")
                            v-spacer
                            v-btn(color="primary" @click="dialog = false" text) {{$t('button.close')}}
                            
        v-row.pa-3(justify="center")
            v-col.pa-0.click-cursor(v-for="post in feed" :key="post.id" cols="6" sm="3" md="3" lg="3" xl="3" @click="openDialog(post)")
                v-img(:src="post.media_url" :alt="post.caption" height="100%" )

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class InstagramFeed extends Vue {
    feed = []
    selected_post = {}
    dialog = false

    openDialog(person: any) {
        this.selected_post = person
        this.dialog = true
    }

    get_paragraphs(selected_post: any) {
        if (selected_post.caption) {
            return selected_post.caption.split("\n").map((text: string) => text.trim()).filter((text: string) => text.length > 0)
        } else {
            return ""
        }
    }

    async mounted() {
        const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : "/api/v1/instagram_feed"
        this.feed = (await fetch(url).then(res => res.json())).business_discovery.media.data.slice(0, 8)
    }
}
</script>

<style lang="scss">

</style>
