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
    },
    pwa: {
        name: 'LFS Website',
        themeColor: '#1E90FF',
        msTileColor: '#032040',
        appleMobileWebAppCapable: 'yes',
        iconPaths: {
            favicon32: null,//'img/icons/favicon-32x32.png',
            favicon16: null,//'img/icons/favicon-16x16.png',
            appleTouchIcon: null,//'img/icons/apple-touch-icon-152x152.png',
            maskIcon: null,//'img/icons/safari-pinned-tab.svg',
            msTileImage: null,//'img/icons/msapplication-icon-144x144.png'
        }
    }
})
