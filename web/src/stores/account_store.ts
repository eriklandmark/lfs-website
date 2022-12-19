import {defineStore} from 'pinia'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {infobar_store} from "@/stores/infobar_store";

export const account_store = defineStore('accountStore', {
    state: () => ({
        account: null as null | any,
    }),
    getters: {
        is_logged_in: (state) => {
            return state.account !== null
        }
    },
    actions: {
        async login() {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            auth.languageCode = 'en';
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //const credential = GoogleAuthProvider.credentialFromResult(result)!;
                    //const token = credential.accessToken;
                    // The signed-in user info.
                    this.account = result.user;
                    console.log(this.account)
                    infobar_store().show("success", "Welcome " + this.account.displayName)
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    // The email of the user's account used.
                    //const email = error.customData.email;
                    // ...
                });

        },
        async logout() {
            this.account = null
            infobar_store().show("success", "You successfully logged out")
        }
    },
})
