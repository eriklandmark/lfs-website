import {defineStore} from 'pinia'

export const useInfoBarStore = defineStore('infobarStore', {
    state: () => ({
        show_bar: false,
        text: "",
        type: "info" as "info" | "error" | "success" | "warning"
    }),
    actions: {
        show(type: "info" | "error" | "success" | "warning", msg: string) {
            this.show_bar = true;
            this.type = type;
            this.text = msg;
        },
    },
})
