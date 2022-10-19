<template lang="pug">
    .home
        v-container
            v-row.my-16(align="center" )
                v-col(cols="12" md="12")
                    h1 {{$t('recruitment.title')}}
                    span {{$t('recruitment.description')}}
                    ul.my-4
                        li
                            router-link(to="/about?tab=low-voltage") {{$t('about.team.titles.team-leader')}} - {{$t('about.team.low-voltage.title')}}
                        li
                            router-link(to="/about?tab=low-voltage") {{$t('about.team.titles.team-member')}} - {{$t('about.team.low-voltage.title')}}
                    span {{$t('recruitment.roll_description')}}
            v-row.my-4(align="center" justify="center")
                iframe(src='https://docs.google.com/forms/d/e/1FAIpQLSc7WXpb9RrNIX4e_e2f2TV_7T8VUNPJU7F2hrdY7DaMAo5VoQ/viewform?embedded=true'
                    width='100%'
                    height='1590'
                    frameborder='0'
                    marginheight='0'
                    marginwidth='0') Läser in…
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class RecruitmentView extends Vue {
}
</script>

<style lang="scss">

</style>
