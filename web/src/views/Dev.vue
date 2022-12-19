<template lang="pug">
    .dev.pa-2
        .grid-container
            .pa-4
                .top_panel.py-2
                    v-btn-toggle(v-model='selected_device' @change='device_changed')
                        v-btn(small v-for="device in devices" :value="device.id", :key="device.id")
                            v-icon(small) {{ device.icon }}
                v-card(height="100%" raised)
                    #gjs
            v-card(width="100%" flat)
                v-card-title
                    h2 Dev
                v-card-actions
                    v-tabs(v-model='tab')
                        v-tabs-slider()
                        v-tab() Blocks
                        v-tab() Layers

                v-card-text.dev-tabs
                    v-tabs-items(v-model="tab")
                        v-tab-item(eager)
                            #blocks
                        v-tab-item(eager)
                            .layers



</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

@Component({
    components: {},
})
export default class DevView extends Vue {
    editor: any
    selected_device = 'desktop'
    tab = 0

    devices = [
        {
            id: 'desktop',
            name: 'Desktop',
            width: '',
            icon: 'mdi-monitor',
        },
        {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
            icon: 'mdi-tablet',
        },
        {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '360px',
            widthMedia: '575px',
            icon: 'mdi-cellphone',
        },
    ]

    mounted() {
        this.editor = grapesjs.init({
            container: '#gjs',
            plugins: [],
            width: '100%',
            height: '100%',
            storageManager: false,
            panels: {defaults: []},
            fromElement: true,
            deviceManager: {
                devices: this.devices
            },
            blockManager: {
                appendTo: '#blocks',
                blocks: [
                    {
                        id: 'section', // id is mandatory
                        label: '<b>Section</b>', // You can use HTML/SVG inside labels
                        attributes: {class: 'gjs-block'},
                        content: `<section> </section>`,
                    },
                    {
                        id: 'title', // id is mandatory
                        label: '<b>Title</b>', // You can use HTML/SVG inside labels
                        attributes: {class: 'gjs-block'},
                        content: `<section>
                          <h1>This is a simple title</h1>
                        </section>`,
                    },
                ],
            },
            layerManager: {
                appendTo: '.layers'
            },
        });
    }

    device_changed() {
        this.editor.setDevice(this.selected_device)
    }
}
</script>

<style lang="scss">

.dev {
    height: 100%;
}

.gjs-block-title {
    font-family: Roboto, sans-serif !important;
}
/* Reset some default styling */
.gjs-cv-canvas {
    top: 0;
    width: 100%;
    height: 100%;
}

#gjs {
    width: 100%;
    height: 100%;
}
/* Theming */

/* Primary color for the background */
.gjs-one-bg {
    background-color: white;
}

/* Secondary color for the text color */
.gjs-two-color {
    color: black;
}

/* Tertiary color for the background */
.gjs-three-bg {
    background-color: #1E90FF;
    color: white;
}

/* Quaternary color for the text color */
.gjs-four-color, .gjs-four-color-h:hover {
    color: #1E90FF;
}

.grid-container {
    display: grid;
    grid-template-columns: 4fr 250px;
    grid-template-rows: 1fr;
    gap: 8px;
    height: 100%;
    width: 100%;
}
</style>
