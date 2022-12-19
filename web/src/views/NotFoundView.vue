<template lang="pug">
    .error-view
        v-container
            v-row.my-16(align="center" justify="center")
                v-col(cols="12" md="7" style="text-align: center")
                    v-icon(color="error" size="70") mdi-alert-circle
                    h1.mt-4.mb-2 {{$t('error_codes.404.title')}}
                    span {{$t('error_codes.404.description')}}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class NotFoundView extends Vue {}
</script>
