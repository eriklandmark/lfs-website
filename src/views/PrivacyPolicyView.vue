<template lang="pug">
    .privacy-policy
        v-container
            v-row.my-16(align="center" )
                v-col(cols="12" md="12")
                    h1.mt-4.mb-2 Privacy Policy
                    span Luleå Forumula Student, Luleå is committed to protecting the privacy and accuracy of confidential information to the extent possible, subject to provisions of state and federal law. Other than as required by laws that guarantee public access to certain types of information, or in response to subpoenas or other legal instruments that authorize access, personal information is not actively shared. In particular, we do not re-distribute or sell personal information collected on our web servers.
                    h2.mt-4.mb-2 Information Collected
                    span Luleå Formula Student collects information about you when you visit our website. This information is used to improve the content of our website and to notify you about updates to our website. We do not collect personally identifiable information about you when you visit our website, unless you choose to provide such information to us, nor do we share this information with any third parties.
                    h3.mt-4.mb-2 Luleå Formula Student servers collect the following analytics:
                    ul.my-2
                        li The Internet Protocol (IP) address of the computer you are using
                        li The type of browser and operating system you are using
                        li The date and time you access our site
                        li The pages you visit
                        li If you linked to our website from another website, the address of that website
                        li The address of the website you visit after leaving our website
                    span Luleå Formula Student does not associate this data to individual user identities.
                    h2.mt-4.mb-2 Cookies
                    span A cookie is a small text file that is stored on a user's computer for record-keeping purposes. We use cookies on this site. We do not link the information we store in cookies to any personally identifiable information you submit while on our site. We use both session ID cookies and persistent cookies. A session ID cookie expires when you close your browser. A persistent cookie remains on your hard drive for an extended period of time. You can remove persistent cookies by following directions provided in your Internet browser's "help" file. If you reject cookies, you may still use our site, but your ability to use some areas of our site, such as contests or surveys, will be limited.
                    h2.mt-4.mb-2 Webforms
                    span Luleå Formula Student may use webforms to collect information from users. These forms require users to give contact information for us to respond. Contact information from the form is used only to the possibility to respond and will not be sold to another party.
                    h2.mt-4.mb-2 Responsibility for External Sites:
                    span This website may contain links to other web sites. Some of those web sites may be operated by third parties. We provide the links for your convenience, but we do not review, control, or monitor the privacy practices of web sites operated by others.
                    br
                    span We are not responsible for the performance of web sites operated by third parties or for your business dealings with them. Therefore, whenever you leave this web site we recommend that you review each web site's privacy practices and make your own conclusions regarding the adequacy of these practices.
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class PrivacyPolicyView extends Vue {
    carousel_model = 0;
}
</script>

<style lang="scss">
.carousel-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 4rem;
}
</style>
