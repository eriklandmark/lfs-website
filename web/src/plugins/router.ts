import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from "@/views/about/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RecruitmentView from "@/views/RecruitmentView.vue";
import SearchView from "@/views/SearchView.vue";
import {search_store} from "@/stores/search_store";
import HistoryView from "@/views/about/HistoryView.vue";
import NotAuthView from "@/views/NotAuthView.vue";
import TeamView from "@/views/about/TeamView.vue";
import BoardView from "@/views/about/BoardView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import {account_store} from "@/stores/account_store";
import {getAuth} from "firebase/auth";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:
        [
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
                path: '/admin',
                name: 'admin',
                redirect: '/admin/home',
            },
            {
                path: '/admin/:page',
                name: 'admin_page',
                component: AdminView,
                meta: {
                    title: 'Admin',
                    auth: true,
                    admin: true
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
        ] as RouteConfig[]
})

function wait_for_auth(account_store: any, need_admin: boolean) {
    return new Promise((resolve) => {
        getAuth().onAuthStateChanged(async (user) => {
            if (user && await account_store.is_authorized(await user.getIdToken(true), need_admin)) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

router.beforeEach(async (to, from, next) => {
    window.scrollTo(0, 0)

    if (to.meta && to.meta.title) {
        document.title = to.meta.title + " - Luleå Formula Student"
    }

    if (to.name !== 'search') {
        search_store().show_search = false
    }

    if (to.meta && to.meta.hasOwnProperty("auth") && to.meta.auth) {
        const accountStore = account_store()
        const need_admin = to.meta.hasOwnProperty("admin") && to.meta.admin
        if (accountStore.auth_initialized) {
            if (!await accountStore.is_authorized("", need_admin)) next("/403")
        } else {
            if (!await wait_for_auth(accountStore, need_admin)) next("/403")
        }
    }

    next()
})
export default router
