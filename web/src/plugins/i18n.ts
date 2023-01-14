import Vue from 'vue'
import VueI18n, {LocaleMessages} from 'vue-i18n'
import sv from 'vuetify/src/locale/sv'
import en from 'vuetify/src/locale/en'

Vue.use(VueI18n)

function loadLocaleMessages(): LocaleMessages {
    return {
        en: {
            $vuetify: en,
            ...require('@/locales/en.json')
        },
        sv: {
            $vuetify: sv,
            ...require('@/locales/sv.json')
        }
    }
}

export default new VueI18n({
    locale: 'sv',
    fallbackLocale: 'en',
    messages: loadLocaleMessages()
})
