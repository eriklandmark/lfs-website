<template lang="pug">
    .search-view
        div(v-html="'<script async src=\"https://cse.google.com/cse.js?cx=46becd12c43144007\"></script>'")
        v-container
            v-row.my-8(align="center" justify="center" )
                v-col(cols="12" md="12")
                    h1 {{$t('search.title')}}
                    span(v-if="search_store.search_info.hasOwnProperty('searchTime')")
                        | {{$t('search.description', {query: search_store.search_query, count: search_store.search_info.totalResults, time: search_store.search_info.formattedSearchTime})}}

                    template(v-if="search_store.search_results.length === 0")
                        h2.mt-4(style="text-align:center") {{$t('search.no_results')}}
                    template(v-else)
                        | {{search_store.search_results}}
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
