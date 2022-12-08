<template lang="pug">
    .recruitment
        v-container
            v-row.mt-8(align="center" )
                v-col(cols="12" md="12")
                    h1.mb-4 {{$t('recruitment.title')}}
                    p.pb-1(v-for="text in $t('recruitment.description')" :key="text") {{text}}
                        br
            v-row
                v-col(cols="12" md="12")
                    v-btn(to="/about" color="accent") {{$t('recruitment.to_teams_button')}}
                    //ul.my-4
                        li
                            router-link(to="/about?tab=low-voltage") {{$t('about.team.titles.team-member')}} - {{$t('about.team.low-voltage.title')}}
                        li
                            router-link(to="/about?tab=administration") {{$t('about.team.titles.team-member')}} - {{$t('about.team.administration.title')}}
                    //span {{$t('recruitment.roll_description')}}
            //v-row.my-4(align="center" justify="center")
                iframe(src="https://docs.google.com/forms/d/e/1FAIpQLSc7WXpb9RrNIX4e_e2f2TV_7T8VUNPJU7F2hrdY7DaMAo5VoQ/viewform?embedded=false"
                    width='100%'
                    height='1590'
                    frameborder='0'
                    marginheight='0'
                    marginwidth='0') Läser in…
            v-row.my-4(align="center" justify="center")
                iframe(src="https://docs.google.com/forms/d/e/1FAIpQLScHji3n2mybxYtBiBKz0F7Kye3snOa91clqP0yjUpAJaW53Hg/viewform?embedded=true"
                    width="640"
                    height="920"
                    frameborder="0"
                    marginheight="0"
                    marginwidth="0") Läser in...
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class RecruitmentView extends Vue {}
</script>

<style lang="scss">

</style>
