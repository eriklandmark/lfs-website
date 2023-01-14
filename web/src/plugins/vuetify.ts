import Vue from "vue";
import Vuetify from 'vuetify/lib'
import i18n from "@/plugins/i18n";
import {
    VApp,
    VAppBar, VAppBarNavIcon, VAvatar,
    VBtn,
    VCard,
    VCardActions,
    VCardSubtitle,
    VCardText,
    VCardTitle, VCarousel, VCarouselItem, VCheckbox,
    VCol,
    VContainer, VDataTable, VDialog,
    VDivider, VFileInput,
    VFooter,
    VIcon,
    VImg,
    VList, VListGroup,
    VListItem,
    VListItemAction,
    VListItemContent,
    VListItemGroup,
    VListItemIcon,
    VListItemSubtitle,
    VListItemTitle,
    VMain,
    VMenu, VNavigationDrawer, VProgressCircular, VProgressLinear,
    VRow, VSelect, VSheet, VSkeletonLoader, VSlider,
    VSnackbar,
    VSpacer, VSwitch,
    VTab, VTabItem,
    VTabs, VTabsItems,
    VTabsSlider, VTextarea, VTextField, VTimeline, VTimelineItem,
    VToolbar,
    VToolbarItems,
    VToolbarTitle
} from "vuetify/lib/components";

import {ClickOutside, Ripple} from "vuetify/es5/directives";

Vue.use(Vuetify, {
    components: {
        VApp: VApp,
        VAppBar: VAppBar,
        VImg: VImg,
        VTab: VTab,
        VTabs: VTabs,
        VTabsItems: VTabsItems,
        VTabItem: VTabItem,
        VTabsSlider: VTabsSlider,
        VMenu: VMenu,
        VList: VList,
        VListGroup: VListGroup,
        VListItem: VListItem,
        VListItemAction: VListItemAction,
        VListItemContent: VListItemContent,
        VListItemTitle: VListItemTitle,
        VListItemSubtitle: VListItemSubtitle,
        VListItemIcon: VListItemIcon,
        VListItemGroup: VListItemGroup,
        VDivider: VDivider,
        VBtn: VBtn,
        VIcon: VIcon,
        VToolbar: VToolbar,
        VToolbarTitle: VToolbarTitle,
        VToolbarItems: VToolbarItems,
        VSpacer: VSpacer,
        VCard: VCard,
        VCardTitle: VCardTitle,
        VCardSubtitle: VCardSubtitle,
        VCardText: VCardText,
        VCardActions: VCardActions,
        VSnackbar: VSnackbar,
        VMain: VMain,
        VFooter: VFooter,
        VContainer: VContainer,
        VRow: VRow,
        VCol: VCol,
        VCarousel: VCarousel,
        VCarouselItem: VCarouselItem,
        VTextField: VTextField,
        VTextarea: VTextarea,
        VSelect: VSelect,
        VCheckbox: VCheckbox,
        VSwitch: VSwitch,
        VSlider: VSlider,
        VDataTable: VDataTable,
        VAvatar: VAvatar,
        VDialog: VDialog,
        VFileInput: VFileInput,
        VSheet: VSheet,
        VSkeletonLoader: VSkeletonLoader,
        VNavigationDrawer: VNavigationDrawer,
        VAppBarNavIcon: VAppBarNavIcon,
        VProgressCircular: VProgressCircular,
        VProgressLinear: VProgressLinear,
        VTimeline: VTimeline,
        VTimelineItem: VTimelineItem,
    },
    directives: {
        Ripple: Ripple,
        ClickOutside: ClickOutside
    }
});
export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#1E90FF",
                secondary: "#C8C8C8",
                accent: "#032040",
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
    lang: {
        // @ts-ignore
        t: (key, ...params) => i18n.t(key, params),
    }
});