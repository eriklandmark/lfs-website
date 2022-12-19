const {defineConfig} = require('@vue/cli-service')

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        i18n: {
            locale: 'sv',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false,
            enableBridge: false
        }
    }
})
