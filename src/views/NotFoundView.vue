<template lang="pug">
    .privacy-policy
        v-container
            v-row.my-16(align="center" )
                v-col(cols="12" md="12")
                    h1.mt-4.mb-2 404

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class NotFoundView extends Vue {}
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
