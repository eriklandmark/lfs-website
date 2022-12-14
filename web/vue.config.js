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
        manifestOptions: {
            icons: [
                {
                    src: "./images/icons/android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "./images/icons/android-chrome-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
                {
                    src: "./images/icons/android-chrome-maskable-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "maskable",
                },
                {
                    src: "./images/icons/android-chrome-maskable-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                },
                {
                    src: "./images/icons/apple-touch-icon-60x60.png",
                    sizes: "60x60",
                    type: "image/png",
                },
                {
                    src: "./images/icons/apple-touch-icon-76x76.png",
                    sizes: "76x76",
                    type: "image/png",
                },
                {
                    src: "./images/icons/apple-touch-icon-120x120.png",
                    sizes: "120x120",
                    type: "image/png",
                },
                {
                    src: "./images/icons/apple-touch-icon-152x152.png",
                    sizes: "152x152",
                    type: "image/png",
                },
                {
                    src: "./images/icons/apple-touch-icon-180x180.png",
                    sizes: "180x180",
                    type: "image/png",
                },
                {
                    src: "./images/icons/apple-touch-icon.png",
                    sizes: "180x180",
                    type: "image/png",
                },
                {
                    src: "./images/icons/favicon-16x16.png",
                    sizes: "16x16",
                    type: "image/png",
                },
                {
                    src: "./images/icons/favicon-32x32.png",
                    sizes: "32x32",
                    type: "image/png",
                },
                {
                    src: "./images/icons/msapplication-icon-144x144.png",
                    sizes: "144x144",
                    type: "image/png",
                },
                {
                    src: "./images/icons/mstile-150x150.png",
                    sizes: "150x150",
                    type: "image/png",
                },
            ],
        }
    }
})
