import { useGlobalStore } from '../stores/index'
export default defineNuxtPlugin(( nuxtApp ) => {
    return {
        provide: {
            // store: useGlobalStore
        }
    }
})