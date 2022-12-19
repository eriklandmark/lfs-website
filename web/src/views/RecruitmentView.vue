<template lang="pug">
    .recruitment
        v-container
            v-row.mt-8
                v-col(cols="12" md="6")
                    h1.mb-4 {{$t('recruitment.title')}}
                    p.pb-1(v-for="text in $t('recruitment.description')" :key="text") {{text}}
                        br
                    .items-center
                            v-btn.mt-6(to="/about" color="accent") {{$t('recruitment.to_teams_button')}}
                v-col.pb-6(cols="12" md="6" align="center" align-self="center")
                    iframe(src="https://docs.google.com/forms/d/e/1FAIpQLScHji3n2mybxYtBiBKz0F7Kye3snOa91clqP0yjUpAJaW53Hg/viewform?embedded=true"
                        width="100%"
                        height="920"
                        frameborder="0"
                        marginheight="0"
                        marginwidth="0")

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
