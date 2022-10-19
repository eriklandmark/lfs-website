import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DevView from "@/views/Dev.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RecruitmentView from "@/views/RecruitmentView.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactView
    },
    {
        path: '/dev',
        name: 'dev',
        component: DevView
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: PrivacyPolicyView
    },
    {
        path: '/recruitment',
        name: 'recruitment',
        component: RecruitmentView
    },
    {
        path: '/*',
        name: 'not-found',
        component: NotFoundView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
