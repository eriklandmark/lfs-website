import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DevView from "@/views/Dev.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RecruitmentView from "@/views/RecruitmentView.vue";
import SearchView from "@/views/SearchView.vue";
import {search_store} from "@/stores/search_store";
import HistoryView from "@/views/HistoryView.vue";
import NotAuthView from "@/views/NotAuthView.vue";
import TeamView from "@/views/TeamView.vue";
import BoardView from "@/views/BoardView.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: {
            title: 'About'
        }
    },
    {
        path: '/about/board',
        name: 'board',
        component: BoardView,
        meta: {
            title: 'The Board'
        },
    },
    {
        path: '/about/:team',
        name: 'team',
        component: TeamView,
        meta: {
            title: 'Team'
        }
    },
    {
        path: '/history',
        name: 'history',
        component: HistoryView,
        meta: {
            title: 'History'
        }
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactView,
        meta: {
            title: 'Contact'
        }
    },
    {
        path: '/dev',
        name: 'dev',
        component: DevView,
        meta: {
            title: 'Dev'
        }
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: PrivacyPolicyView,
        meta: {
            title: 'Privacy Policy'
        }
    },
    {
        path: '/recruitment',
        name: 'recruitment',
        component: RecruitmentView,
        meta: {
            title: 'Recruitment'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: SearchView,
        meta: {
            title: 'Search'
        }
    },
    {
        path: '/403',
        name: 'not-auth',
        component: NotAuthView,
        meta: {
            title: '404 - Not Authorized'
        }
    },
    {
        path: '/*',
        name: 'not-found',
        component: NotFoundView,
        meta: {
            title: '404 - Not Found'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    try {
        if(to.name !== 'search') {
            search_store().show_search = false
        }
    } catch(e) {}

    next()
})

router.afterEach((to, _) => {
    Vue.nextTick(() => {
        if (to.meta && to.meta.title) {
            document.title = to.meta.title + " - Luleå Formula Student"
        }
    });

});

export default router
