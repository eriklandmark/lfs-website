<template lang="pug">
    .ig_feed
        v-dialog(v-model="dialog" max-width="1200px" max-height="400px")
            v-row.ma-0(style="background-color: #fff")
                v-col.pa-0(sm="12" md="8")
                    v-img(v-if="selected_post.media_type === 'IMAGE'" :src="selected_post.media_url" height="100%" contain)
                    v-carousel(v-else-if="selected_post.media_type === 'CAROUSEL_ALBUM'" hide-delimiter-background show-arrows-on-hover height="100%" )
                        v-carousel-item(v-for="media in selected_post.children.data" :key="media.id" height="100%")
                            v-img(:src="media.media_url" contain)

                v-col.pa-0(sm="12" md="4")
                    v-card(style="overflow: auto;" height="100%" flat)
                        v-card-title.black--text.font-weight-bold
                            v-icon(left color="red") mdi-heart
                            span {{selected_post.like_count}}
                            v-spacer
                            v-btn(icon :href="selected_post.permalink" target="_blank" x-large)
                                v-icon(large) mdi-instagram
                        v-card-subtitle {{formatDate(selected_post.timestamp)}}
                        v-card-text.black--text
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

    formatDate(timestamp: string) {
        const now = Date.now()
        const date = new Date(timestamp)
        const diff = now - date.getTime()
        if (diff < 1000 * 60 * 60) {
            return this.$t('datetime.minutes_ago', {count: Math.floor(diff / (1000 * 60))})
        } else if (diff < 1000 * 60 * 60 * 24) {
            return this.$t('datetime.hours_ago', {count: Math.floor(diff / (1000 * 60 * 60))})
        } else if (diff < 1000 * 60 * 60 * 24 * 7) {
            return this.$t('datetime.days_ago', {count: Math.floor(diff / (1000 * 60 * 60 * 24))})
        } else if (diff < 1000 * 60 * 60 * 24 * 30) {
            const months = this.$t('datetime.months') as unknown as string[]
            return `${months[date.getMonth()]} ${date.getDate()}`
        } else {
            const months = this.$t('datetime.months') as unknown as string[]
            return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
        }
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
