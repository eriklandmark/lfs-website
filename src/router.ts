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

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        if (to.meta && to.meta.title) {
            document.title = to.meta.title + " - Luleå Formula Student (LFS)"
        }
    });
});

export default router
