export default defineNuxtRouteMiddleware(to => {
    const { $config, $pinia } = useNuxtApp();
    // setTimeout(() => {
    //     const state = store.state;
    //     const currentTool = state.currentTool;
    //     if (
    //         currentTool &&
    //         currentTool.vip &&
    //         !state.vip &&
    //         route.path !== '/'
    //     ) {
    //         redirect('/');
    //     }
    // }, 0);
    const store = useGlobalStore()
    console.log(store.dark)
    console.log(
        'Heading to',
        to.path,
    );
    // return '/secret';
});
