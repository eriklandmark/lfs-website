<template lang="pug">
    .search-view
        v-container
            v-row.my-8(align="center" justify="center" )
                v-col(cols="12" md="12")
                    h1 {{$t('search.title')}}
                    .mb-5
                        span(v-if="search_store.search_info.hasOwnProperty('searchTime')")
                            | {{$t('search.description', {query: search_store.search_query, count: search_store.search_info.totalResults, time: search_store.search_info.formattedSearchTime})}}
                    template(v-if="search_store.search_info.totalResults && search_store.search_info.totalResults == 0")
                        h2.mt-4(style="text-align:center") {{$t('search.no_results')}}
                    template(v-else)
                        template(v-for="result in search_store.search_results")
                            v-divider
                            v-card.mb-5(flat)
                                v-card-title
                                    a(:href="result.link" v-html="result.htmlTitle" )
                                v-card-subtitle(v-html="result.htmlFormattedUrl")
                                v-card-text.black--text(v-html="result.htmlSnippet")
                        v-divider

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {search_store} from "@/stores/search_store";

@Component({
    components: {},
})
export default class SearchView extends Vue {
    search_store = search_store()

    beforeMount() {
        if (this.$route.query.q) {
            this.search_store.search_query = this.$route.query.q as string
        }

        if (this.search_store.search_query) {
            this.search_store.search()
        }
    }
}
</script>

<style lang="scss">

</style>
