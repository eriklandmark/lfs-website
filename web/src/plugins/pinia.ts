import Vue, {markRaw} from "vue";
import {createPinia, PiniaVuePlugin} from "pinia";

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

export function afterInstall() {
    pinia.use(({store}) => {
        store.router = markRaw(import("@/plugins/router"))
    })
}
export default pinia