import {defineStore} from 'pinia'

export const search_store = defineStore('searchStore', {
    state: () => ({
        show_search: false,
        search_query: "",
        search_results: [] as any[],
        search_info: {}
    }),
    actions: {
        async search() {
            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?q=${this.search_query}&cx=${process.env.VUE_APP_GOOGLE_SEARCH_ENGINE_ID}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json()
            // console.log(result)
            if (result) {
                this.search_results = result.items || []
                this.search_info = result.searchInformation
            }
        },
    },
})
