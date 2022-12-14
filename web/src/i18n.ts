import Vue from 'vue'
import VueI18n, {LocaleMessages} from 'vue-i18n'
import sv from 'vuetify/src/locale/sv'
import en from 'vuetify/src/locale/en'

Vue.use(VueI18n)

function loadLocaleMessages(): LocaleMessages {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages: LocaleMessages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
        }
    })

    messages['sv'] = {...messages['sv'], $vuetify: sv}
    messages['en'] = {...messages['en'], $vuetify: en}

    return messages
}

export default new VueI18n({
    locale: "sv",
    fallbackLocale: "sv",
    messages: loadLocaleMessages()
})
