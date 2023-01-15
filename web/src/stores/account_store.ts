import {defineStore} from 'pinia'
import {
    browserLocalPersistence,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInWithPopup,
    signOut,
    User
} from "firebase/auth";
import {useInfoBarStore} from "@/stores/infobar_store";

export const account_store = defineStore('accountStore', {
    state: () => ({
        id_token: '',
        account: null as User | null,
        onAuthStateChangedCallbacks: [] as (() => void)[],
        auth_initialized: false,
        is_admin: false,
        uid: ""
    }),
    getters: {
        is_logged_in: (state) => {
            return state.account != null
        },
        account_api_href: (_) => {
            return process.env.NODE_ENV === 'production' ? '/api/v1/google-services/' : 'http://localhost:3001/'
        }
    },
    actions: {
        async init() {
            getAuth().onAuthStateChanged(async user => {
                if (user) {
                    const id_token = await user.getIdToken(true)
                    if (!this.auth_initialized) {
                        if (await this.is_authorized(id_token)) {
                            this.account = user
                            this.id_token = id_token
                            useInfoBarStore().show("success", "Welcome back " + user.displayName + "!")
                        } else {
                            this.account = null
                            this.id_token = ""
                            this.uid = ""
                            this.is_admin = false
                            await signOut(getAuth())
                        }
                    } else {
                        this.account = user
                        this.id_token = id_token
                    }
                } else {
                    this.account = null
                    this.id_token = ""
                    this.uid = ""
                    this.is_admin = false
                    await signOut(getAuth())
                }
                this.auth_initialized = true
                this.onAuthStateChangedCallbacks.forEach(callback => callback())
            });
        },

        async login() {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            getAuth().useDeviceLanguage();

            setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    return signInWithPopup(auth, provider)
                })
                .then((result) => {
                    this.id_token = GoogleAuthProvider.credentialFromResult(result)!.idToken!
                    useInfoBarStore().show("success", "Welcome " + result.user.displayName)
                    console.log(result.user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    useInfoBarStore().show("error", `Error: ${errorCode} ${errorMessage}`)
                });
        },

        onAuthStateChanged(callback: () => void) {
            if (!this.onAuthStateChangedCallbacks.includes(callback)) {
                this.onAuthStateChangedCallbacks.push(callback)
            }
        },

        async logout() {
            await signOut(getAuth())
            await useInfoBarStore().show("success", "You successfully logged out")
        },

        async is_authorized(id_token: string = "", need_admin: boolean = false) {
            if (!id_token)
                id_token = this.id_token
            if (!id_token)
                return false

            return fetch(this.account_api_href + "is-authorized", {headers: {'Authorization': id_token}})
                .then(response => response.json())
                .then((data) => {
                    if (data.error) {
                        return Promise.reject(data)
                    } else if (data.authorized) {
                        this.uid = data.uid
                        this.is_admin = data.is_admin
                        return data.is_admin || !need_admin
                    }
                    return false
                }).catch((error) => {
                    console.error(error)
                    if (error.error && error.error.code === "auth/id-token-expired") {
                        useInfoBarStore().show("error", "Your session has expired. Please login again")
                        this.router.push("/")
                    } else {
                        useInfoBarStore().show("error", "Something went wrong when authorizing...")
                    }
                })
        },

        request(resource: string, method: string = "GET", body: any = {}): Promise<any> {
            return fetch(this.account_api_href + resource, {
                method,
                headers: {
                    'Authorization': this.id_token
                }
            }).then(response => response.json())
        }
    },
})
