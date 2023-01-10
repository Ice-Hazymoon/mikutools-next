export default defineNuxtRouteMiddleware(to => {
    const store = useGlobalStore();
    // get options
    const app = useNuxtApp();
    const route = useRoute()
    // console.log(route)
    // console.log(store.current_tools, to.path, )
    // return '/secret';
});
