declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import "pinia";

declare module "pinia" {
  import type Router from "vue-router"; // is it correct ?
  export interface PiniaCustomProperties {
    router: Router;
  }
}

import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
