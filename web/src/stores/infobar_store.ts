import {defineStore} from 'pinia'

export const infobar_store = defineStore('infobarStore', {
    state: () => ({
        show_bar: false,
        text: "",
        type: "info" as "info" | "error" | "success" | "warning"
    }),
    actions: {
        async show(type: "info" | "error" | "success" | "warning", msg: string) {
            this.show_bar = true;
            this.type = type;
            this.text = msg;
        },
    },
})
